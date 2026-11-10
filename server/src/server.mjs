import http from "node:http";
import { access } from "node:fs/promises";
import path from "node:path";
import { loadConfig } from "./config.mjs";
import { JsonStore } from "./store.mjs";
import { createApp } from "./app.mjs";

const config = loadConfig();
const store = new JsonStore(config.dataFile);
await store.init();

try {
  await access(path.join(config.staticDir, "index.html"));
  console.log("Interface web encontrada para publicação.");
} catch {
  console.error("Interface web não encontrada no caminho configurado.");
}

const server = http.createServer(createApp({ config, store }));
server.listen(config.port, config.host, () => {
  const address = server.address();
  console.log(`Prospector de homologação disponível em http://${config.host}:${address.port}`);
});

function shutdown() {
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 5000).unref();
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);


