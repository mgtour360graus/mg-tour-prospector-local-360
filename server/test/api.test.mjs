import assert from "node:assert/strict";
import http from "node:http";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { createApp } from "../src/app.mjs";
import { JsonStore } from "../src/store.mjs";

test("fluxo protegido do prospecto e bloqueio de contato", async t => {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "mg-tour-prospector-"));
  const store = new JsonStore(path.join(tempDir, "db.json"));
  await store.init();
  const config = {
    adminPassword: "senha-de-teste-segura",
    sessionSecret: "segredo-de-teste-com-mais-de-32-caracteres",
    allowedOrigin: "http://127.0.0.1",
    staticDir: path.resolve("../app")
  };
  const server = http.createServer(createApp({ config, store }));
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  t.after(async () => {
    await new Promise(resolve => server.close(resolve));
    await rm(tempDir, { recursive: true, force: true });
  });

  const health = await fetch(`${baseUrl}/health`).then(response => response.json());
  assert.equal(health.status, "ok");
  assert.equal(health.whatsapp, "disabled");

  const denied = await fetch(`${baseUrl}/api/prospects`);
  assert.equal(denied.status, 401);

  const sessionResponse = await fetch(`${baseUrl}/api/session`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ password: config.adminPassword })
  });
  assert.equal(sessionResponse.status, 200);
  const { token } = await sessionResponse.json();
  const headers = { authorization: `Bearer ${token}`, "content-type": "application/json" };

  const createdResponse = await fetch(`${baseUrl}/api/prospects`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name: "Empresa Fictícia de Teste", city: "Maringá, PR", phone: "44900001234" })
  });
  assert.equal(createdResponse.status, 201);
  const created = await createdResponse.json();

  const invalidAudit = await fetch(`${baseUrl}/api/prospects/${created.id}/audit`, {
    method: "POST",
    headers,
    body: JSON.stringify({ fact: "", messageSuggested: "" })
  });
  assert.equal(invalidAudit.status, 400);

  const auditedResponse = await fetch(`${baseUrl}/api/prospects/${created.id}/audit`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      fact: "Fato fictício confirmado para o teste.",
      messageSuggested: "Mensagem fictícia para revisão manual.",
      scores: { space: 3, profile: 3, view360: 3, commercial: 2 }
    })
  });
  assert.equal(auditedResponse.status, 200);

  const noConsent = await fetch(`${baseUrl}/api/prospects/${created.id}/approve`, {
    method: "POST",
    headers,
    body: JSON.stringify({ consentStatus: "SIM" })
  });
  assert.equal(noConsent.status, 400);

  const approvedResponse = await fetch(`${baseUrl}/api/prospects/${created.id}/approve`, {
    method: "POST",
    headers,
    body: JSON.stringify({ consentStatus: "SIM", consentSource: "Teste manual", consentDate: "2026-11-10" })
  });
  assert.equal(approvedResponse.status, 200);

  const blockedResponse = await fetch(`${baseUrl}/api/prospects/${created.id}/no-contact`, {
    method: "POST",
    headers,
    body: JSON.stringify({ reason: "Cenário fictício" })
  });
  assert.equal(blockedResponse.status, 200);
  const blocked = await blockedResponse.json();
  assert.equal(blocked.noContact, true);
  assert.equal(blocked.stage, "NAO_CONTATAR");
});

