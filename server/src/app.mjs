import { createHmac, timingSafeEqual } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const TYPES = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"]
]);

export function createApp({ config, store }) {
  return async function app(request, response) {
    secureHeaders(response);
    applyCors(request, response, config.allowedOrigin);
    if (request.method === "OPTIONS") return empty(response, 204);

    try {
      const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
      if (request.method === "GET" && url.pathname === "/health") {
        return json(response, 200, { status: "ok", service: "mg-tour-prospector", mode: "homologacao", whatsapp: "disabled" });
      }

      if (request.method === "POST" && url.pathname === "/api/session") {
        const body = await readJson(request);
        if (!safeEqual(body.password, config.adminPassword)) return json(response, 401, { error: "Credenciais inválidas" });
        return json(response, 200, { token: signToken(config.sessionSecret), expiresIn: 28800 });
      }

      if (url.pathname.startsWith("/api/")) {
        requireAuth(request, config.sessionSecret);
        if (request.method === "GET" && url.pathname === "/api/prospects") {
          return json(response, 200, { prospects: await store.listProspects() });
        }
        if (request.method === "POST" && url.pathname === "/api/prospects") {
          return json(response, 201, await store.createProspect(await readJson(request)));
        }

        const match = url.pathname.match(/^\/api\/prospects\/([^/]+)(?:\/(audit|approve|no-contact))?$/);
        if (match) {
          const id = decodeURIComponent(match[1]);
          const action = match[2];
          const body = await readJson(request);
          if (request.method === "PUT" && !action) return json(response, 200, await store.updateProspect(id, body));
          if (request.method === "POST" && action === "audit") return json(response, 200, await store.auditProspect(id, body));
          if (request.method === "POST" && action === "approve") return json(response, 200, await store.approveProspect(id, body));
          if (request.method === "POST" && action === "no-contact") return json(response, 200, await store.blockContact(id, body.reason));
        }
        return json(response, 404, { error: "Rota não encontrada" });
      }

      if (request.method === "GET" || request.method === "HEAD") {
        return serveStatic(url.pathname, request.method, response, config.staticDir);
      }
      return json(response, 405, { error: "Método não permitido" });
    } catch (error) {
      const statusCode = Number(error.statusCode) || 500;
      return json(response, statusCode, { error: statusCode === 500 ? "Erro interno" : error.message });
    }
  };
}

function secureHeaders(response) {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Referrer-Policy", "no-referrer");
  response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self' data:; connect-src 'self'");
  response.setHeader("Cache-Control", "no-store");
}

function applyCors(request, response, allowedOrigin) {
  const origin = request.headers.origin;
  if (allowedOrigin && origin === allowedOrigin) {
    response.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    response.setHeader("Vary", "Origin");
    response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  }
}

async function readJson(request) {
  let raw = "";
  for await (const chunk of request) {
    raw += chunk;
    if (Buffer.byteLength(raw) > 262144) {
      const error = new Error("Corpo da requisição muito grande");
      error.statusCode = 413;
      throw error;
    }
  }
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    const error = new Error("JSON inválido");
    error.statusCode = 400;
    throw error;
  }
}

function safeEqual(left, right) {
  const a = Buffer.from(String(left || ""));
  const b = Buffer.from(String(right || ""));
  return a.length === b.length && timingSafeEqual(a, b);
}

function signToken(secret) {
  const payload = Buffer.from(JSON.stringify({ sub: "admin", exp: Date.now() + 28800000 })).toString("base64url");
  return `${payload}.${createHmac("sha256", secret).update(payload).digest("base64url")}`;
}

function requireAuth(request, secret) {
  const token = String(request.headers.authorization || "").replace(/^Bearer\s+/i, "");
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return unauthorized();
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  if (!safeEqual(signature, expected)) return unauthorized();
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (data.sub !== "admin" || Number(data.exp) < Date.now()) return unauthorized();
  } catch {
    return unauthorized();
  }
}

function unauthorized() {
  const error = new Error("Sessão inválida ou expirada");
  error.statusCode = 401;
  throw error;
}

async function serveStatic(pathname, method, response, staticDir) {
  const relative = pathname === "/" ? "index.html" : decodeURIComponent(pathname).replace(/^\/+/, "");
  const resolved = path.resolve(staticDir, relative);
  const root = `${path.resolve(staticDir)}${path.sep}`;
  if (resolved !== path.resolve(staticDir, "index.html") && !resolved.startsWith(root)) return json(response, 404, { error: "Arquivo não encontrado" });
  try {
    const fileStat = await stat(resolved);
    if (!fileStat.isFile()) throw new Error("not-file");
    const content = await readFile(resolved);
    response.statusCode = 200;
    response.setHeader("Content-Type", TYPES.get(path.extname(resolved).toLowerCase()) || "application/octet-stream");
    response.setHeader("Content-Length", content.length);
    if (method === "HEAD") return response.end();
    return response.end(content);
  } catch {
    return json(response, 404, { error: "Arquivo não encontrado" });
  }
}

function json(response, statusCode, body) {
  const data = Buffer.from(JSON.stringify(body));
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Content-Length", data.length);
  response.end(data);
}

function empty(response, statusCode) {
  response.statusCode = statusCode;
  response.end();
}

