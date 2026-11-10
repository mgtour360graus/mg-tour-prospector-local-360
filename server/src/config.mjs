import path from "node:path";

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
    dataFile: path.resolve(env.DATA_FILE || "./data/prospector-test.json"),
    staticDir: path.resolve(env.STATIC_DIR || "../app")
  };

  if (config.nodeEnv === "production") {
    if (config.adminPassword.length < 12) throw new Error("ADMIN_PASSWORD deve ter pelo menos 12 caracteres");
    if (config.sessionSecret.length < 32) throw new Error("SESSION_SECRET deve ter pelo menos 32 caracteres");
    if (!config.allowedOrigin.startsWith("https://")) throw new Error("ALLOWED_ORIGIN deve usar HTTPS em produção");
  }

  return config;
}

