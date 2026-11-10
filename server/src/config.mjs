import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function projectPath(value, fallback) {
  const selected = value || fallback;
  return path.isAbsolute(selected) ? selected : path.resolve(projectRoot, selected);
}

export function loadConfig(env = process.env) {
  const port = Number(env.PORT || 3000);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error("PORT inválida");
  }

  const config = {
    nodeEnv: env.NODE_ENV || "development",
    host: env.HOST || "127.0.0.1",
    port,
    adminPassword: env.ADMIN_PASSWORD || "",
    sessionSecret: env.SESSION_SECRET || "",
    allowedOrigin: env.ALLOWED_ORIGIN || "",
    dataFile: projectPath(env.DATA_FILE, "./server/data/prospector-test.json"),
    staticDir: projectPath(env.STATIC_DIR, "./server/public")
  };

  if (config.nodeEnv === "production") {
    if (config.adminPassword.length < 12) throw new Error("ADMIN_PASSWORD deve ter pelo menos 12 caracteres");
    if (config.sessionSecret.length < 32) throw new Error("SESSION_SECRET deve ter pelo menos 32 caracteres");
    if (!config.allowedOrigin.startsWith("https://")) throw new Error("ALLOWED_ORIGIN deve usar HTTPS em produção");
  }

  return config;
}

