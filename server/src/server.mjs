import http from "node:http";
import { loadConfig } from "./config.mjs";
import { JsonStore } from "./store.mjs";
import { createApp } from "./app.mjs";

const config = loadConfig();
const store = new JsonStore(config.dataFile);
await store.init();

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

