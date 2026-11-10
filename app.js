(() => {
  "use strict";

  const STORAGE_KEY = "mg-tour-prospector-v2";
  const nowIso = () => new Date().toISOString();
  const today = () => new Date().toISOString().slice(0, 10);
  const uid = () => `mg-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const demoProspects = [
    {
      id: "demo-aurora",
      name: "Clínica Aurora",
      category: "Clínica odontológica",
      city: "Maringá, PR",
      phone: "(44) 99999-0101",
      whatsappValid: "SIM",
      googleUrl: "https://www.google.com/maps",
      website: "",
      rating: "4,8",
      reviews: 126,
      notes: "Empresa fictícia criada somente para testes.",
      scores: { space: 3, profile: 2, view360: 3, commercial: 2 },
      auditStatus: "CONCLUIDA",
      fact: "A clínica apresenta fotos internas, mas não possui uma experiência 360° identificada na auditoria de demonstração.",
      auditNotes: "Validar novamente antes de qualquer contato real.",
      messageSuggested: "Olá, tudo bem? Fizemos uma análise inicial da apresentação digital da Clínica Aurora e identificamos uma oportunidade de mostrar os ambientes de forma mais completa. Posso enviar um resumo breve pelo WhatsApp?",
      messageApproved: "Olá, tudo bem? Fizemos uma análise inicial da apresentação digital da Clínica Aurora e identificamos uma oportunidade de mostrar os ambientes de forma mais completa. Posso enviar um resumo breve pelo WhatsApp?",
      approvalStatus: "APROVADO",
      consent: { status: "SIM", source: "Ligação de demonstração", date: today() },
      contactStatus: "PRONTO_CONTATO_MANUAL",
      noContact: false,
      stage: "PRONTO_PARA_CONTATO",
      createdAt: nowIso(),
      updatedAt: nowIso(),
      history: [{ date: nowIso(), text: "Registro fictício carregado para demonstração." }]
    },
    {
      id: "demo-horizonte",
      name: "Colégio Horizonte",
      category: "Escola particular",
      city: "Paranavaí, PR",
      phone: "(44) 98888-0202",
      whatsappValid: "NAO_VERIFICADO",
      googleUrl: "https://www.google.com/maps",
      website: "",
      rating: "4,4",
      reviews: 73,
      notes: "Empresa fictícia criada somente para testes.",
      scores: { space: 3, profile: 1, view360: 2, commercial: 1 },
      auditStatus: "PENDENTE",
      fact: "",
      auditNotes: "",
      messageSuggested: "",
      messageApproved: "",
      approvalStatus: "PENDENTE",
      consent: { status: "PENDENTE", source: "", date: "" },
      contactStatus: "NAO_LIBERADO",
      noContact: false,
      stage: "AUDITORIA_PENDENTE",
      createdAt: nowIso(),
      updatedAt: nowIso(),
      history: [{ date: nowIso(), text: "Registro fictício carregado para demonstração." }]
    },
    {
      id: "demo-villa",
      name: "Hotel Villa Central",
      category: "Hotel",
      city: "Londrina, PR",
      phone: "(43) 97777-0303",
      whatsappValid: "SIM",
      googleUrl: "https://www.google.com/maps",
      website: "",
      rating: "4,2",
      reviews: 219,
      notes: "Empresa fictícia criada somente para testes.",
      scores: { space: 3, profile: 2, view360: 2, commercial: 2 },
      auditStatus: "CONCLUIDA",
      fact: "O espaço físico influencia diretamente a decisão de hospedagem; a apresentação 360° não foi confirmada nesta demonstração.",
      auditNotes: "Não iniciar contato pelo WhatsApp sem obter consentimento.",
      messageSuggested: "Olá! A MG Tour analisou a apresentação pública do Hotel Villa Central e preparou uma observação sobre como os ambientes podem ser apresentados de forma mais imersiva. Podemos enviar esse resumo pelo WhatsApp?",
      messageApproved: "",
      approvalStatus: "PENDENTE",
      consent: { status: "PENDENTE", source: "", date: "" },
      contactStatus: "NAO_LIBERADO",
      noContact: false,
      stage: "PRONTO_PARA_REVISAO",
      createdAt: nowIso(),
      updatedAt: nowIso(),
      history: [{ date: nowIso(), text: "Registro fictício carregado para demonstração." }]
    },
    {
      id: "demo-atelier",
      name: "Atelier Casa & Luz",
      category: "Loja de decoração",
      city: "Campo Mourão, PR",
      phone: "(44) 96666-0404",
      whatsappValid: "SIM",
      googleUrl: "https://www.google.com/maps",
      website: "",
      rating: "4,7",
      reviews: 48,
      notes: "Empresa fictícia criada somente para testes.",
      scores: { space: 2, profile: 2, view360: 1, commercial: 1 },
      auditStatus: "CONCLUIDA",
      fact: "A loja apresenta produtos em fotos, mas a experiência completa do ambiente ainda pode ser explorada.",
      auditNotes: "Aguardar autorização antes de encaminhar qualquer conteúdo.",
      messageSuggested: "Olá! Preparamos uma observação breve sobre a apresentação digital do Atelier Casa & Luz. Posso enviar pelo WhatsApp?",
      messageApproved: "Olá! Preparamos uma observação breve sobre a apresentação digital do Atelier Casa & Luz. Posso enviar pelo WhatsApp?",
      approvalStatus: "APROVADO",
      consent: { status: "NAO", source: "Resposta de demonstração", date: today() },
      contactStatus: "BLOQUEADO",
      noContact: true,
      stage: "NAO_CONTATAR",
      createdAt: nowIso(),
      updatedAt: nowIso(),
      history: [{ date: nowIso(), text: "Marcado como não contatar no cenário fictício." }]
    },
    {
      id: "demo-bistro",
      name: "Bistrô Estação 27",
      category: "Restaurante",
      city: "Cianorte, PR",
      phone: "(44) 95555-0505",
      whatsappValid: "NAO_VERIFICADO",
      googleUrl: "https://www.google.com/maps",
      website: "",
      rating: "4,5",
      reviews: 91,
      notes: "Empresa fictícia criada somente para testes.",
      scores: { space: 0, profile: 0, view360: 0, commercial: 0 },
      auditStatus: "PENDENTE",
      fact: "",
      auditNotes: "",
      messageSuggested: "",
      messageApproved: "",
      approvalStatus: "PENDENTE",
      consent: { status: "PENDENTE", source: "", date: "" },
      contactStatus: "NAO_LIBERADO",
      noContact: false,
      stage: "NOVO",
      createdAt: nowIso(),
      updatedAt: nowIso(),
      history: [{ date: nowIso(), text: "Registro fictício carregado para demonstração." }]
    }
  ];

  let state = loadState();
  let currentView = "dashboard";
  let selectedAuditId = state.prospects[0]?.id || null;
  let selectedApprovalId = state.prospects.find(item => item.auditStatus === "CONCLUIDA")?.id || state.prospects[0]?.id || null;
  let filters = { search: "", priority: "TODAS", stage: "TODAS" };

  const root = document.getElementById("viewRoot");
  const modal = document.getElementById("prospectModal");
  const form = document.getElementById("prospectForm");
  const pageTitle = document.getElementById("pageTitle");
  const pageEyebrow = document.getElementById("pageEyebrow");
  const importFile = document.getElementById("importFile");

  const viewMeta = {
    dashboard: ["Visão geral", "PAINEL OPERACIONAL"],
    prospects: ["Prospectos", "BASE DE EMPRESAS"],
    audit: ["Auditoria", "DIAGNÓSTICO HUMANO"],
    approval: ["Aprovação e consentimento", "CONTROLE DE CONTATO"],
    settings: ["Configurações", "AMBIENTE DE TESTES"]
  };

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return { version: 2, prospects: structuredClone(demoProspects) };
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed.prospects)) throw new Error("Formato inválido");
      return parsed;
    } catch (error) {
      console.warn("Não foi possível ler a base local; dados de demonstração restaurados.", error);
      return { version: 2, prospects: structuredClone(demoProspects) };
    }
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function escapeHtml(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function safeUrl(value) {
    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol) ? url.href : "";
    } catch {
      return "";
    }
  }

  function scoreOf(item) {
    const scores = item.scores || {};
    return Number(scores.space || 0) + Number(scores.profile || 0) + Number(scores.view360 || 0) + Number(scores.commercial || 0);
  }

  function priorityOf(item) {
    const score = scoreOf(item);
    if (score >= 9) return "A";
    if (score >= 6) return "B";
    if (score >= 3) return "C";
    return "D";
  }

  function canSimulateContact(item) {
    return item.auditStatus === "CONCLUIDA"
      && item.approvalStatus === "APROVADO"
      && item.consent?.status === "SIM"
      && item.whatsappValid === "SIM"
      && !item.noContact
      && Boolean(item.messageApproved?.trim());
  }

  function stageLabel(stage) {
    const labels = {
      NOVO: "Novo",
      AUDITORIA_PENDENTE: "Auditoria pendente",
      PRONTO_PARA_REVISAO: "Pronto para revisão",
      PRONTO_PARA_CONTATO: "Contato liberado",
      CONTATO_SIMULADO: "Contato simulado",
      NAO_CONTATAR: "Não contatar"
    };
    return labels[stage] || stage || "Novo";
  }

  function stageChip(item) {
    if (item.noContact || item.stage === "NAO_CONTATAR") return '<span class="chip chip-blocked">Não contatar</span>';
    if (item.stage === "CONTATO_SIMULADO") return '<span class="chip chip-complete">Simulado</span>';
    if (canSimulateContact(item)) return '<span class="chip chip-approved">Liberado</span>';
    if (item.auditStatus === "CONCLUIDA") return '<span class="chip chip-review">Em revisão</span>';
    return '<span class="chip chip-pending">Auditoria</span>';
  }

  function priorityChip(item) {
    const p = priorityOf(item);
    return `<span class="chip chip-${p.toLowerCase()}">Prioridade ${p}</span>`;
  }

  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast${type === "error" ? " is-error" : ""}`;
    toast.textContent = message;
    document.getElementById("toastRegion").append(toast);
    setTimeout(() => toast.remove(), 3400);
  }

  function addHistory(item, text) {
    item.history ||= [];
    item.history.unshift({ date: nowIso(), text });
    item.updatedAt = nowIso();
  }

  function render() {
    const [title, eyebrow] = viewMeta[currentView];
    pageTitle.textContent = title;
    pageEyebrow.textContent = eyebrow;
    document.querySelectorAll(".nav-item").forEach(button => {
      button.classList.toggle("is-active", button.dataset.view === currentView);
    });
    if (currentView === "dashboard") renderDashboard();
    if (currentView === "prospects") renderProspects();
    if (currentView === "audit") renderAudit();
    if (currentView === "approval") renderApproval();
    if (currentView === "settings") renderSettings();
  }

  function stats() {
    return {
      total: state.prospects.length,
      auditPending: state.prospects.filter(item => item.auditStatus !== "CONCLUIDA" && !item.noContact).length,
      highPriority: state.prospects.filter(item => ["A", "B"].includes(priorityOf(item)) && !item.noContact).length,
      consented: state.prospects.filter(item => item.consent?.status === "SIM" && !item.noContact).length,
      ready: state.prospects.filter(canSimulateContact).length,
      blocked: state.prospects.filter(item => item.noContact).length
    };
  }

  function statsMarkup(values) {
    return `
      <section class="stats-grid" aria-label="Resumo da base">
        <article class="stat-card is-blue"><span>Prospectos cadastrados</span><strong>${values.total}</strong><small>Salvos neste navegador</small></article>
        <article class="stat-card is-amber"><span>Aguardando auditoria</span><strong>${values.auditPending}</strong><small>Revisão humana necessária</small></article>
        <article class="stat-card"><span>Prioridade A ou B</span><strong>${values.highPriority}</strong><small>Com base na pontuação</small></article>
        <article class="stat-card is-green"><span>Consentimento registrado</span><strong>${values.consented}</strong><small>Autorização para WhatsApp</small></article>
      </section>`;
  }

  function pipelineMarkup(values) {
    return `
      <section class="pipeline" aria-label="Etapas da operação">
        <div class="pipeline-step is-current"><strong>1. Cadastro</strong><span>${values.total} empresas na base</span></div>
        <div class="pipeline-step"><strong>2. Auditoria</strong><span>${values.auditPending} aguardando análise</span></div>
        <div class="pipeline-step"><strong>3. Consentimento</strong><span>${values.consented} autorizações</span></div>
        <div class="pipeline-step"><strong>4. Aprovação</strong><span>${values.ready} contatos liberados</span></div>
        <div class="pipeline-step"><strong>5. Atendimento</strong><span>Somente simulação local</span></div>
      </section>`;
  }

  function renderDashboard() {
    const values = stats();
    const ordered = [...state.prospects].sort((a, b) => scoreOf(b) - scoreOf(a)).slice(0, 6);
    root.innerHTML = `
      ${statsMarkup(values)}
      ${pipelineMarkup(values)}
      <div class="dashboard-grid">
        <section class="panel">
          <header class="panel-header"><div><h2>Oportunidades em destaque</h2><p>Empresas fictícias ou cadastradas para teste</p></div><button class="button button-ghost button-small" data-nav="prospects" type="button">Ver toda a base</button></header>
          ${ordered.length ? `<div class="table-scroll"><table class="data-table"><thead><tr><th>Empresa</th><th>Pontuação</th><th>Prioridade</th><th>Etapa</th><th></th></tr></thead><tbody>${ordered.map(item => `
            <tr><td class="company-cell"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.category)} · ${escapeHtml(item.city)}</span></td><td>${scoreOf(item)}/11</td><td>${priorityChip(item)}</td><td>${stageChip(item)}</td><td><button class="link-button" data-action="open-audit" data-id="${item.id}" type="button">Analisar</button></td></tr>`).join("")}</tbody></table></div>` : emptyMarkup("Nenhum prospecto", "Cadastre a primeira empresa para começar.")}
        </section>
        <div>
          <section class="panel">
            <header class="panel-header"><div><h2>Próximas ações</h2><p>Sequência recomendada para o teste</p></div></header>
            <div class="panel-body task-list">
              ${taskItem(1, "Cadastre ou selecione uma empresa", "Use apenas dados de teste nesta primeira etapa.")}
              ${taskItem(2, "Faça a auditoria visual", "Registre pontuações e um fato realmente confirmado.")}
              ${taskItem(3, "Registre o consentimento", "A autorização deve existir antes do WhatsApp.")}
              ${taskItem(4, "Revise a mensagem", "Aprovação humana é sempre obrigatória.")}
              ${taskItem(5, "Simule o contato", "A plataforma registra o teste, mas não envia nada.")}
            </div>
          </section>
          <section class="panel">
            <header class="panel-header"><div><h2>Proteções ativas</h2><p>Barreiras desta versão</p></div></header>
            <div class="panel-body gate-list">
              ${gateRow("Integração com WhatsApp", false, "Desconectada")}
              ${gateRow("Disparo automático", false, "Bloqueado")}
              ${gateRow("Base local", true, "Ativa")}
              ${gateRow("Revisão humana", true, "Obrigatória")}
            </div>
          </section>
        </div>
      </div>`;
  }

  function taskItem(number, title, description) {
    return `<div class="task-item"><span class="task-number">${number}</span><div><strong>${title}</strong><p>${description}</p></div></div>`;
  }

  function emptyMarkup(title, description) {
    return `<div class="empty-state"><strong>${title}</strong><span>${description}</span></div>`;
  }

  function filteredProspects() {
    const query = filters.search.trim().toLocaleLowerCase("pt-BR");
    return state.prospects.filter(item => {
      const text = `${item.name} ${item.category} ${item.city} ${item.phone}`.toLocaleLowerCase("pt-BR");
      const searchOk = !query || text.includes(query);
      const priorityOk = filters.priority === "TODAS" || priorityOf(item) === filters.priority;
      const stageOk = filters.stage === "TODAS"
        || (filters.stage === "PENDENTE" && item.auditStatus !== "CONCLUIDA" && !item.noContact)
        || (filters.stage === "REVISAO" && item.auditStatus === "CONCLUIDA" && !canSimulateContact(item) && !item.noContact)
        || (filters.stage === "LIBERADO" && canSimulateContact(item))
        || (filters.stage === "BLOQUEADO" && item.noContact);
      return searchOk && priorityOk && stageOk;
    });
  }

  function renderProspects() {
    const list = filteredProspects();
    root.innerHTML = `
      <div class="toolbar">
        <input class="search-input" id="prospectSearch" value="${escapeHtml(filters.search)}" placeholder="Buscar por empresa, cidade ou telefone" aria-label="Buscar prospectos">
        <select class="select-input" id="priorityFilter" aria-label="Filtrar prioridade"><option value="TODAS">Todas as prioridades</option>${["A","B","C","D"].map(value => `<option value="${value}"${filters.priority === value ? " selected" : ""}>Prioridade ${value}</option>`).join("")}</select>
        <select class="select-input" id="stageFilter" aria-label="Filtrar etapa"><option value="TODAS">Todas as etapas</option><option value="PENDENTE"${filters.stage === "PENDENTE" ? " selected" : ""}>Auditoria pendente</option><option value="REVISAO"${filters.stage === "REVISAO" ? " selected" : ""}>Em revisão</option><option value="LIBERADO"${filters.stage === "LIBERADO" ? " selected" : ""}>Contato liberado</option><option value="BLOQUEADO"${filters.stage === "BLOQUEADO" ? " selected" : ""}>Não contatar</option></select>
        <button class="button button-secondary" data-action="export-json" type="button">Exportar base</button>
      </div>
      <section class="panel">
        <header class="panel-header"><div><h2>Base de prospectos</h2><p>${list.length} de ${state.prospects.length} registros exibidos</p></div><div class="panel-actions"><button class="button button-ghost button-small" data-action="import-json" type="button">Importar cópia</button></div></header>
        ${list.length ? `<div class="table-scroll"><table class="data-table"><thead><tr><th>Empresa</th><th>Telefone</th><th>WhatsApp</th><th>Pontos</th><th>Prioridade</th><th>Etapa</th><th></th></tr></thead><tbody>${list.map(item => `
          <tr><td class="company-cell"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.category)} · ${escapeHtml(item.city)}</span></td><td>${escapeHtml(item.phone || "—")}</td><td>${item.whatsappValid === "SIM" ? '<span class="chip chip-yes">Verificado</span>' : item.whatsappValid === "NAO" ? '<span class="chip chip-no">Não</span>' : '<span class="chip chip-pending">Pendente</span>'}</td><td>${scoreOf(item)}/11</td><td>${priorityChip(item)}</td><td>${stageChip(item)}</td><td><div class="row-actions"><button class="link-button" data-action="edit-prospect" data-id="${item.id}" type="button">Editar</button><button class="link-button" data-action="open-audit" data-id="${item.id}" type="button">Auditar</button></div></td></tr>`).join("")}</tbody></table></div>` : emptyMarkup("Nenhum resultado", "Altere os filtros ou cadastre uma nova empresa.")}
      </section>`;
  }

  function prospectListMarkup(items, selectedId, action) {
    if (!items.length) return emptyMarkup("Nenhum registro disponível", "Cadastre uma empresa ou conclua a etapa anterior.");
    return `<div class="prospect-list">${items.map(item => `
      <button class="prospect-card${item.id === selectedId ? " is-selected" : ""}" data-action="${action}" data-id="${item.id}" type="button">
        <div class="prospect-card-head"><strong>${escapeHtml(item.name)}</strong>${priorityChip(item)}</div>
        <small>${escapeHtml(item.category)} · ${escapeHtml(item.city)}</small>
        <div>${stageChip(item)}</div>
      </button>`).join("")}</div>`;
  }

  function scoreOptions(selected, max) {
    return Array.from({ length: max + 1 }, (_, value) => `<option value="${value}"${Number(selected) === value ? " selected" : ""}>${value}</option>`).join("");
  }

  function renderAudit() {
    const items = state.prospects.filter(item => !item.noContact);
    if (!items.some(item => item.id === selectedAuditId)) selectedAuditId = items[0]?.id || null;
    const item = items.find(entry => entry.id === selectedAuditId);
    root.innerHTML = `
      <div class="notice notice-warn"><div class="notice-icon">!</div><div><strong>A auditoria deve registrar apenas fatos verificados</strong><p>Não presuma ausência de Street View ou falhas no perfil sem abrir e conferir o material público da empresa.</p></div></div>
      <div class="work-grid">
        <section class="panel"><header class="panel-header"><div><h2>Fila de auditoria</h2><p>${items.filter(entry => entry.auditStatus !== "CONCLUIDA").length} pendentes</p></div></header>${prospectListMarkup(items, selectedAuditId, "select-audit")}</section>
        <section class="panel"><header class="panel-header"><div><h2>${item ? escapeHtml(item.name) : "Selecione uma empresa"}</h2><p>${item ? `${escapeHtml(item.category)} · ${escapeHtml(item.city)}` : ""}</p></div>${item ? priorityChip(item) : ""}</header>${item ? auditFormMarkup(item) : emptyMarkup("Nada selecionado", "Escolha um prospecto na lista.")}</section>
      </div>`;
  }

  function auditFormMarkup(item) {
    return `<form class="panel-body detail-stack" data-form="audit" data-id="${item.id}">
      <section class="detail-section">
        <div class="detail-section-title"><div><h3>Pontuação da oportunidade</h3><p>A pontuação organiza a prioridade; ela não autoriza contato.</p></div><span class="chip ${item.auditStatus === "CONCLUIDA" ? "chip-complete" : "chip-pending"}">${item.auditStatus === "CONCLUIDA" ? "Concluída" : "Pendente"}</span></div>
        <div class="score-grid">
          <label class="score-field"><span>Influência do espaço físico</span><select name="scoreSpace" data-score>${scoreOptions(item.scores?.space, 3)}</select></label>
          <label class="score-field"><span>Oportunidade no perfil</span><select name="scoreProfile" data-score>${scoreOptions(item.scores?.profile, 3)}</select></label>
          <label class="score-field"><span>Oportunidade em 360°</span><select name="score360" data-score>${scoreOptions(item.scores?.view360, 3)}</select></label>
          <label class="score-field"><span>Estrutura comercial</span><select name="scoreCommercial" data-score>${scoreOptions(item.scores?.commercial, 2)}</select></label>
        </div>
        <div class="score-total"><span>Pontuação calculada</span><strong id="liveScore">${scoreOf(item)}/11 · ${priorityOf(item)}</strong></div>
      </section>
      <section class="detail-section">
        <div class="detail-section-title"><div><h3>Evidências da auditoria</h3><p>Escreva o que foi realmente observado.</p></div></div>
        <label class="compact-field"><span>Fato confirmado *</span><textarea class="textarea-input" name="fact" placeholder="Ex.: O perfil possui fotos internas, mas nenhuma experiência 360° foi identificada na conferência.">${escapeHtml(item.fact)}</textarea></label>
        <label class="compact-field" style="margin-top:10px"><span>Observações internas</span><textarea class="textarea-input" name="auditNotes" placeholder="Detalhes para a equipe, sem promessas nem suposições.">${escapeHtml(item.auditNotes)}</textarea></label>
      </section>
      <section class="detail-section">
        <div class="detail-section-title"><div><h3>Sugestão de mensagem</h3><p>Esta mensagem ainda não está aprovada e não será enviada.</p></div></div>
        <textarea class="textarea-input" name="messageSuggested" placeholder="Crie uma abordagem curta, específica e baseada no fato confirmado.">${escapeHtml(item.messageSuggested)}</textarea>
        <div class="detail-actions"><button class="button button-ghost" name="intent" value="save" type="submit">Salvar rascunho</button><button class="button button-primary" name="intent" value="complete" type="submit">Concluir auditoria</button></div>
      </section>
    </form>`;
  }

  function renderApproval() {
    const items = state.prospects.filter(item => item.auditStatus === "CONCLUIDA");
    if (!items.some(item => item.id === selectedApprovalId)) selectedApprovalId = items[0]?.id || null;
    const item = items.find(entry => entry.id === selectedApprovalId);
    root.innerHTML = `
      <div class="notice notice-safe"><div class="notice-icon">✓</div><div><strong>Consentimento e aprovação são controles independentes</strong><p>Mesmo com a mensagem aprovada, a simulação só é liberada quando todos os requisitos estiverem atendidos.</p></div></div>
      <div class="work-grid">
        <section class="panel"><header class="panel-header"><div><h2>Fila de revisão</h2><p>${items.length} auditorias concluídas</p></div></header>${prospectListMarkup(items, selectedApprovalId, "select-approval")}</section>
        <section class="panel"><header class="panel-header"><div><h2>${item ? escapeHtml(item.name) : "Selecione uma empresa"}</h2><p>${item ? stageLabel(item.stage) : ""}</p></div>${item ? stageChip(item) : ""}</header>${item ? approvalFormMarkup(item) : emptyMarkup("Nenhuma auditoria concluída", "Conclua uma auditoria para revisar a mensagem.")}</section>
      </div>`;
  }

  function approvalFormMarkup(item) {
    const gates = [
      ["Auditoria concluída", item.auditStatus === "CONCLUIDA"],
      ["WhatsApp verificado", item.whatsappValid === "SIM"],
      ["Consentimento registrado", item.consent?.status === "SIM"],
      ["Mensagem aprovada", item.approvalStatus === "APROVADO" && Boolean(item.messageApproved?.trim())],
      ["Não está bloqueado", !item.noContact]
    ];
    return `<form class="panel-body detail-stack" data-form="approval" data-id="${item.id}">
      <section class="detail-section">
        <div class="detail-section-title"><div><h3>Consentimento para WhatsApp</h3><p>Registre como e quando a empresa autorizou o contato.</p></div></div>
        <div class="field-row">
          <label class="compact-field"><span>Status do consentimento</span><select class="select-input" name="consentStatus"><option value="PENDENTE"${item.consent?.status === "PENDENTE" ? " selected" : ""}>Pendente</option><option value="SIM"${item.consent?.status === "SIM" ? " selected" : ""}>Sim, autorizou</option><option value="NAO"${item.consent?.status === "NAO" ? " selected" : ""}>Não autorizou</option></select></label>
          <label class="compact-field"><span>WhatsApp verificado</span><select class="select-input" name="whatsappValid"><option value="NAO_VERIFICADO"${item.whatsappValid === "NAO_VERIFICADO" ? " selected" : ""}>Não verificado</option><option value="SIM"${item.whatsappValid === "SIM" ? " selected" : ""}>Sim</option><option value="NAO"${item.whatsappValid === "NAO" ? " selected" : ""}>Não</option></select></label>
        </div>
        <div class="field-row" style="margin-top:10px">
          <label class="compact-field"><span>Origem da autorização</span><input class="text-input" name="consentSource" value="${escapeHtml(item.consent?.source)}" placeholder="Ex.: ligação, formulário, e-mail"></label>
          <label class="compact-field"><span>Data da autorização</span><input class="text-input" name="consentDate" type="date" value="${escapeHtml(item.consent?.date)}"></label>
        </div>
      </section>
      <section class="detail-section">
        <div class="detail-section-title"><div><h3>Mensagem final</h3><p>Edite e revise antes de aprovar.</p></div><span class="chip ${item.approvalStatus === "APROVADO" ? "chip-approved" : "chip-pending"}">${item.approvalStatus === "APROVADO" ? "Aprovada" : "Pendente"}</span></div>
        <div class="message-box"><p><strong>Fato confirmado:</strong> ${escapeHtml(item.fact || "Não informado")}</p></div>
        <label class="compact-field" style="margin-top:10px"><span>Texto revisado</span><textarea class="textarea-input" name="messageApproved" placeholder="Mensagem final revisada pela equipe.">${escapeHtml(item.messageApproved || item.messageSuggested)}</textarea></label>
      </section>
      <section class="detail-section">
        <div class="detail-section-title"><div><h3>Travas para contato</h3><p>Todos os itens devem ficar verdes.</p></div></div>
        <div class="gate-list">${gates.map(([label, ok]) => gateRow(label, ok, ok ? "OK" : "Bloqueado")).join("")}</div>
        <div class="detail-actions">
          <button class="button button-ghost" name="intent" value="save" type="submit">Salvar revisão</button>
          <button class="button button-secondary" name="intent" value="approve" type="submit">Aprovar mensagem</button>
          <button class="button button-primary" data-action="simulate-contact" data-id="${item.id}" type="button"${canSimulateContact(item) ? "" : " disabled"}>Simular contato</button>
          <button class="button button-danger" data-action="mark-no-contact" data-id="${item.id}" type="button">Não contatar</button>
        </div>
        <p style="margin:10px 0 0;color:var(--ink-500);font-size:10px">“Simular contato” registra apenas um evento local. Nenhuma conversa será aberta e nenhum dado será enviado para fora deste navegador.</p>
      </section>
    </form>`;
  }

  function gateRow(label, ok, value) {
    return `<div class="gate ${ok ? "is-ok" : "is-blocked"}"><span>${label}</span><span>${ok ? "✓" : "×"} ${value}</span></div>`;
  }

  function renderSettings() {
    const values = stats();
    root.innerHTML = `
      <div class="settings-grid">
        <section class="panel"><header class="panel-header"><div><h2>Integrações</h2><p>Estado atual do ambiente local</p></div></header><div class="panel-body">
          ${integrationCard("Google Sheets", "Planilha preparada, ainda sem sincronização automática", "Preparada", "chip-review")}
          ${integrationCard("WhatsApp principal", "Mantido fora da plataforma por segurança", "Desconectado", "chip-complete")}
          ${integrationCard("Evolution API", "Não configurada neste ambiente", "Desativada", "chip-pending")}
          ${integrationCard("OpenAI", "Mensagens são editadas manualmente nesta versão", "Desativada", "chip-pending")}
        </div></section>
        <section class="panel"><header class="panel-header"><div><h2>Base local</h2><p>Gerencie a cópia usada nos testes</p></div></header><div class="panel-body">
          <div class="gate-list">${gateRow("Registros salvos", true, String(values.total))}${gateRow("Contatos liberados", values.ready > 0, String(values.ready))}${gateRow("Empresas bloqueadas", true, String(values.blocked))}</div>
          <div class="detail-actions"><button class="button button-secondary" data-action="export-json" type="button">Baixar cópia JSON</button><button class="button button-ghost" data-action="export-csv" type="button">Baixar CSV</button><button class="button button-ghost" data-action="import-json" type="button">Restaurar cópia</button></div>
        </div></section>
        <section class="panel"><header class="panel-header"><div><h2>Regras de segurança</h2><p>Proteções que devem permanecer na produção</p></div></header><div class="panel-body task-list">
          ${taskItem(1, "Sem prospecção fria automática", "A plataforma não inicia conversas em massa.")}
          ${taskItem(2, "Consentimento registrado", "Autorização clara antes do contato no WhatsApp.")}
          ${taskItem(3, "Aprovação humana", "Toda mensagem passa por revisão antes do contato.")}
          ${taskItem(4, "Bloqueio imediato", "Pedidos de não contato são respeitados e impedem novas ações.")}
        </div></section>
        <section class="panel"><header class="panel-header"><div><h2>Reiniciar demonstração</h2><p>Remove somente os dados locais deste navegador</p></div></header><div class="panel-body"><p style="color:var(--ink-700);font-size:12px;line-height:1.55">Use esta opção para voltar aos cinco exemplos fictícios. A planilha do Google e os arquivos do projeto não são alterados.</p><button class="button button-danger" data-action="reset-demo" type="button">Restaurar dados de demonstração</button></div></section>
      </div>`;
  }

  function integrationCard(title, description, status, chipClass) {
    return `<div class="integration-card"><div><strong>${title}</strong><p>${description}</p></div><span class="chip ${chipClass}">${status}</span></div>`;
  }

  function openModal(item = null) {
    form.reset();
    form.elements.id.value = item?.id || "";
    form.elements.name.value = item?.name || "";
    form.elements.category.value = item?.category || "";
    form.elements.city.value = item?.city || "";
    form.elements.phone.value = item?.phone || "";
    form.elements.whatsappValid.value = item?.whatsappValid || "NAO_VERIFICADO";
    form.elements.googleUrl.value = item?.googleUrl || "";
    form.elements.website.value = item?.website || "";
    form.elements.notes.value = item?.notes || "";
    document.getElementById("modalTitle").textContent = item ? "Editar prospecto" : "Novo prospecto";
    modal.hidden = false;
    setTimeout(() => form.elements.name.focus(), 0);
  }

  function closeModal() {
    modal.hidden = true;
  }

  function saveProspect(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const existing = state.prospects.find(item => item.id === data.id);
    if (existing) {
      Object.assign(existing, {
        name: data.name.trim(), category: data.category.trim(), city: data.city.trim(), phone: data.phone.trim(),
        whatsappValid: data.whatsappValid, googleUrl: safeUrl(data.googleUrl), website: safeUrl(data.website), notes: data.notes.trim()
      });
      addHistory(existing, "Cadastro atualizado no ambiente local.");
      showToast("Prospecto atualizado.");
    } else {
      const item = {
        id: uid(), name: data.name.trim(), category: data.category.trim(), city: data.city.trim(), phone: data.phone.trim(),
        whatsappValid: data.whatsappValid, googleUrl: safeUrl(data.googleUrl), website: safeUrl(data.website), rating: "", reviews: 0,
        notes: data.notes.trim(), scores: { space: 0, profile: 0, view360: 0, commercial: 0 }, auditStatus: "PENDENTE",
        fact: "", auditNotes: "", messageSuggested: "", messageApproved: "", approvalStatus: "PENDENTE",
        consent: { status: "PENDENTE", source: "", date: "" }, contactStatus: "NAO_LIBERADO", noContact: false,
        stage: "NOVO", createdAt: nowIso(), updatedAt: nowIso(), history: [{ date: nowIso(), text: "Prospecto cadastrado manualmente." }]
      };
      state.prospects.unshift(item);
      selectedAuditId = item.id;
      showToast("Prospecto cadastrado. Faça a auditoria antes de avançar.");
    }
    persist();
    closeModal();
    render();
  }

  function saveAudit(event) {
    event.preventDefault();
    const auditForm = event.target;
    const item = state.prospects.find(entry => entry.id === auditForm.dataset.id);
    if (!item) return;
    const data = Object.fromEntries(new FormData(auditForm));
    const intent = event.submitter?.value || "save";
    item.scores = { space: Number(data.scoreSpace), profile: Number(data.scoreProfile), view360: Number(data.score360), commercial: Number(data.scoreCommercial) };
    item.fact = data.fact.trim();
    item.auditNotes = data.auditNotes.trim();
    item.messageSuggested = data.messageSuggested.trim();
    if (intent === "complete") {
      if (!item.fact) return showToast("Informe um fato confirmado antes de concluir.", "error");
      if (!item.messageSuggested) return showToast("Prepare uma sugestão de mensagem antes de concluir.", "error");
      item.auditStatus = "CONCLUIDA";
      item.stage = "PRONTO_PARA_REVISAO";
      item.approvalStatus = "PENDENTE";
      addHistory(item, "Auditoria concluída e enviada para revisão humana.");
      selectedApprovalId = item.id;
      showToast("Auditoria concluída. A mensagem aguarda revisão.");
    } else {
      addHistory(item, "Rascunho da auditoria atualizado.");
      showToast("Rascunho salvo.");
    }
    persist();
    render();
  }

  function saveApproval(event) {
    event.preventDefault();
    const approvalForm = event.target;
    const item = state.prospects.find(entry => entry.id === approvalForm.dataset.id);
    if (!item) return;
    const data = Object.fromEntries(new FormData(approvalForm));
    const intent = event.submitter?.value || "save";
    const consentStatus = data.consentStatus;
    if (consentStatus === "SIM" && (!data.consentSource.trim() || !data.consentDate)) {
      return showToast("Informe a origem e a data do consentimento.", "error");
    }
    item.consent = { status: consentStatus, source: data.consentSource.trim(), date: data.consentDate };
    item.whatsappValid = data.whatsappValid;
    item.messageApproved = data.messageApproved.trim();
    if (consentStatus === "NAO") {
      item.noContact = true;
      item.stage = "NAO_CONTATAR";
      item.contactStatus = "BLOQUEADO";
      addHistory(item, "Consentimento recusado; contato bloqueado.");
    }
    if (intent === "approve") {
      if (!item.messageApproved) return showToast("Revise e informe a mensagem final.", "error");
      item.approvalStatus = "APROVADO";
      addHistory(item, "Mensagem aprovada manualmente.");
      showToast("Mensagem aprovada. O contato ainda depende das demais travas.");
    } else {
      addHistory(item, "Revisão e consentimento atualizados.");
      showToast("Revisão salva.");
    }
    item.stage = item.noContact ? "NAO_CONTATAR" : (canSimulateContact(item) ? "PRONTO_PARA_CONTATO" : "PRONTO_PARA_REVISAO");
    persist();
    render();
  }

  function simulateContact(id) {
    const item = state.prospects.find(entry => entry.id === id);
    if (!item || !canSimulateContact(item)) return showToast("O contato continua bloqueado por uma ou mais travas.", "error");
    item.contactStatus = "SIMULADO";
    item.stage = "CONTATO_SIMULADO";
    addHistory(item, "Contato simulado localmente. Nenhuma mensagem real foi enviada.");
    persist();
    render();
    showToast("Simulação registrada. Nenhuma mensagem foi enviada.");
  }

  function markNoContact(id) {
    const item = state.prospects.find(entry => entry.id === id);
    if (!item) return;
    if (!window.confirm(`Bloquear qualquer contato com ${item.name}?`)) return;
    item.noContact = true;
    item.consent = { status: "NAO", source: item.consent?.source || "Bloqueio manual", date: item.consent?.date || today() };
    item.contactStatus = "BLOQUEADO";
    item.stage = "NAO_CONTATAR";
    addHistory(item, "Empresa marcada como não contatar.");
    persist();
    render();
    showToast("Empresa bloqueada para contato.");
  }

  function download(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function exportJson() {
    download(`mg-tour-prospector-backup-${today()}.json`, JSON.stringify(state, null, 2), "application/json");
    showToast("Cópia JSON preparada para download.");
  }

  function csvCell(value) {
    return `"${String(value ?? "").replaceAll('"', '""')}"`;
  }

  function exportCsv() {
    const headers = ["nome_empresa","categoria","cidade","telefone","whatsapp_valido","pontuacao","prioridade","auditoria","consentimento","aprovacao","etapa","nao_contatar"];
    const rows = state.prospects.map(item => [item.name,item.category,item.city,item.phone,item.whatsappValid,scoreOf(item),priorityOf(item),item.auditStatus,item.consent?.status,item.approvalStatus,item.stage,item.noContact ? "SIM" : "NAO"]);
    const csv = `\ufeff${[headers, ...rows].map(row => row.map(csvCell).join(";")).join("\r\n")}`;
    download(`mg-tour-prospectos-${today()}.csv`, csv, "text/csv;charset=utf-8");
    showToast("Planilha CSV preparada para download.");
  }

  async function importJson(file) {
    try {
      const parsed = JSON.parse(await file.text());
      if (!parsed || !Array.isArray(parsed.prospects)) throw new Error("Formato inválido");
      if (!window.confirm(`Restaurar ${parsed.prospects.length} registros e substituir a base local atual?`)) return;
      state = parsed;
      persist();
      selectedAuditId = state.prospects[0]?.id || null;
      selectedApprovalId = state.prospects.find(item => item.auditStatus === "CONCLUIDA")?.id || null;
      render();
      showToast("Cópia restaurada com sucesso.");
    } catch {
      showToast("Não foi possível importar esse arquivo JSON.", "error");
    } finally {
      importFile.value = "";
    }
  }

  function resetDemo() {
    if (!window.confirm("Apagar os testes locais e restaurar os cinco exemplos fictícios?")) return;
    state = { version: 2, prospects: structuredClone(demoProspects) };
    persist();
    selectedAuditId = state.prospects[0].id;
    selectedApprovalId = state.prospects[0].id;
    render();
    showToast("Demonstração restaurada.");
  }

  document.querySelectorAll(".nav-item").forEach(button => button.addEventListener("click", () => {
    currentView = button.dataset.view;
    render();
  }));
  document.getElementById("newProspectButton").addEventListener("click", () => openModal());
  document.getElementById("closeModalButton").addEventListener("click", closeModal);
  document.getElementById("cancelModalButton").addEventListener("click", closeModal);
  modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
  form.addEventListener("submit", saveProspect);
  importFile.addEventListener("change", event => { if (event.target.files[0]) importJson(event.target.files[0]); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && !modal.hidden) closeModal(); });

  root.addEventListener("click", event => {
    const nav = event.target.closest("[data-nav]");
    if (nav) { currentView = nav.dataset.nav; return render(); }
    const action = event.target.closest("[data-action]");
    if (!action) return;
    const id = action.dataset.id;
    if (action.dataset.action === "open-audit" || action.dataset.action === "select-audit") { selectedAuditId = id; currentView = "audit"; render(); }
    if (action.dataset.action === "select-approval") { selectedApprovalId = id; render(); }
    if (action.dataset.action === "edit-prospect") openModal(state.prospects.find(item => item.id === id));
    if (action.dataset.action === "simulate-contact") simulateContact(id);
    if (action.dataset.action === "mark-no-contact") markNoContact(id);
    if (action.dataset.action === "export-json") exportJson();
    if (action.dataset.action === "export-csv") exportCsv();
    if (action.dataset.action === "import-json") importFile.click();
    if (action.dataset.action === "reset-demo") resetDemo();
  });

  root.addEventListener("input", event => {
    if (event.target.id === "prospectSearch") {
      filters.search = event.target.value;
      const cursor = event.target.selectionStart;
      renderProspects();
      const input = document.getElementById("prospectSearch");
      input.focus();
      input.setSelectionRange(cursor, cursor);
    }
    if (event.target.matches("[data-score]")) {
      const auditForm = event.target.closest('[data-form="audit"]');
      const data = Object.fromEntries(new FormData(auditForm));
      const total = Number(data.scoreSpace) + Number(data.scoreProfile) + Number(data.score360) + Number(data.scoreCommercial);
      const priority = total >= 9 ? "A" : total >= 6 ? "B" : total >= 3 ? "C" : "D";
      auditForm.querySelector("#liveScore").textContent = `${total}/11 · ${priority}`;
    }
  });

  root.addEventListener("change", event => {
    if (event.target.id === "priorityFilter") { filters.priority = event.target.value; renderProspects(); }
    if (event.target.id === "stageFilter") { filters.stage = event.target.value; renderProspects(); }
  });

  root.addEventListener("submit", event => {
    if (event.target.dataset.form === "audit") saveAudit(event);
    if (event.target.dataset.form === "approval") saveApproval(event);
  });

  persist();
  render();
})();

