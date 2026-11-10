import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const emptyDatabase = () => ({ version: 1, prospects: [], events: [] });

export class JsonStore {
  constructor(filePath) {
    this.filePath = filePath;
    this.queue = Promise.resolve();
  }

  async init() {
    await mkdir(path.dirname(this.filePath), { recursive: true });
    try {
      await readFile(this.filePath, "utf8");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      await this.#write(emptyDatabase());
    }
  }

  async listProspects() {
    const data = await this.#read();
    return structuredClone(data.prospects);
  }

  async createProspect(input, actor = "admin") {
    return this.#mutate(data => {
      const timestamp = new Date().toISOString();
      const prospect = {
        id: randomUUID(),
        name: clean(input.name),
        category: clean(input.category),
        city: clean(input.city),
        phone: clean(input.phone),
        googleUrl: clean(input.googleUrl),
        website: clean(input.website),
        notes: clean(input.notes),
        whatsappValid: oneOf(input.whatsappValid, ["SIM", "NAO", "NAO_VERIFICADO"], "NAO_VERIFICADO"),
        scores: { space: 0, profile: 0, view360: 0, commercial: 0 },
        auditStatus: "PENDENTE",
        fact: "",
        auditNotes: "",
        messageSuggested: "",
        messageApproved: "",
        approvalStatus: "PENDENTE",
        consent: { status: "PENDENTE", source: "", date: "" },
        noContact: false,
        stage: "NOVO",
        createdAt: timestamp,
        updatedAt: timestamp
      };
      if (!prospect.name) throw validationError("Nome da empresa é obrigatório");
      data.prospects.push(prospect);
      event(data, prospect.id, actor, "PROSPECT_CREATED");
      return structuredClone(prospect);
    });
  }

  async updateProspect(id, patch, actor = "admin") {
    return this.#mutate(data => {
      const prospect = requireProspect(data, id);
      for (const field of ["name", "category", "city", "phone", "googleUrl", "website", "notes"]) {
        if (field in patch) prospect[field] = clean(patch[field]);
      }
      if ("whatsappValid" in patch) {
        prospect.whatsappValid = oneOf(patch.whatsappValid, ["SIM", "NAO", "NAO_VERIFICADO"], prospect.whatsappValid);
      }
      if (!prospect.name) throw validationError("Nome da empresa é obrigatório");
      prospect.updatedAt = new Date().toISOString();
      event(data, prospect.id, actor, "PROSPECT_UPDATED");
      return structuredClone(prospect);
    });
  }

  async auditProspect(id, input, actor = "admin") {
    return this.#mutate(data => {
      const prospect = requireProspect(data, id);
      const fact = clean(input.fact);
      const messageSuggested = clean(input.messageSuggested);
      if (!fact) throw validationError("Informe um fato confirmado");
      if (!messageSuggested) throw validationError("Prepare uma sugestão comercial");
      prospect.scores = normalizeScores(input.scores);
      prospect.fact = fact;
      prospect.auditNotes = clean(input.auditNotes);
      prospect.messageSuggested = messageSuggested;
      prospect.auditStatus = "CONCLUIDA";
      prospect.stage = "PRONTO_PARA_REVISAO";
      prospect.updatedAt = new Date().toISOString();
      event(data, prospect.id, actor, "AUDIT_COMPLETED");
      return structuredClone(prospect);
    });
  }

  async approveProspect(id, input, actor = "admin") {
    return this.#mutate(data => {
      const prospect = requireProspect(data, id);
      if (prospect.noContact) throw validationError("Contato bloqueado para este prospecto");
      if (prospect.auditStatus !== "CONCLUIDA") throw validationError("Conclua a auditoria antes da aprovação");
      if (input.consentStatus !== "SIM" || !clean(input.consentSource) || !clean(input.consentDate)) {
        throw validationError("Consentimento, fonte e data são obrigatórios");
      }
      prospect.messageApproved = clean(input.messageApproved || prospect.messageSuggested);
      if (!prospect.messageApproved) throw validationError("Mensagem aprovada é obrigatória");
      prospect.consent = { status: "SIM", source: clean(input.consentSource), date: clean(input.consentDate) };
      prospect.approvalStatus = "APROVADO";
      prospect.stage = "PRONTO_PARA_CONTATO_MANUAL";
      prospect.updatedAt = new Date().toISOString();
      event(data, prospect.id, actor, "CONTACT_APPROVED");
      return structuredClone(prospect);
    });
  }

  async blockContact(id, reason = "", actor = "admin") {
    return this.#mutate(data => {
      const prospect = requireProspect(data, id);
      prospect.noContact = true;
      prospect.approvalStatus = "BLOQUEADO";
      prospect.stage = "NAO_CONTATAR";
      prospect.updatedAt = new Date().toISOString();
      event(data, prospect.id, actor, "CONTACT_BLOCKED", clean(reason));
      return structuredClone(prospect);
    });
  }

  async #read() {
    const raw = await readFile(this.filePath, "utf8");
    const data = JSON.parse(raw);
    if (!Array.isArray(data.prospects) || !Array.isArray(data.events)) throw new Error("Base de dados inválida");
    return data;
  }

  async #write(data) {
    const temporary = `${this.filePath}.tmp`;
    await writeFile(temporary, `${JSON.stringify(data, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
    await rename(temporary, this.filePath);
  }

  #mutate(operation) {
    const task = this.queue.then(async () => {
      const data = await this.#read();
      const result = operation(data);
      await this.#write(data);
      return result;
    });
    this.queue = task.catch(() => undefined);
    return task;
  }
}

function clean(value) {
  return String(value ?? "").trim().slice(0, 4000);
}

function oneOf(value, options, fallback) {
  return options.includes(value) ? value : fallback;
}

function normalizeScores(scores = {}) {
  const normalized = {};
  for (const key of ["space", "profile", "view360", "commercial"]) {
    const value = Number(scores[key] || 0);
    normalized[key] = Number.isInteger(value) && value >= 0 && value <= 3 ? value : 0;
  }
  return normalized;
}

function requireProspect(data, id) {
  const prospect = data.prospects.find(item => item.id === id);
  if (!prospect) {
    const error = new Error("Prospecto não encontrado");
    error.statusCode = 404;
    throw error;
  }
  return prospect;
}

function validationError(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function event(data, prospectId, actor, action, details = "") {
  data.events.push({ id: randomUUID(), prospectId, actor, action, details, createdAt: new Date().toISOString() });
}

