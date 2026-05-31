import { createServer } from "node:http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import express from "express";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { createBareServer } from "@tomphttp/bare-server-node";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = join(__dirname, "static");

const app = express();
const bareServer = createBareServer("/bare/");

app.use("/uv/", express.static(uvPath));
app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(join(publicPath, "index.html"));
});

const httpServer = createServer();

httpServer.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

httpServer.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

const port = parseInt(process.env.PORT || "8080");
httpServer.listen(port, "0.0.0.0", () => {
  console.log(`\n🚀 NexProxy is running with Ultraviolet & Bare Server!`);
  console.log(`   → http://localhost:${port}\n`);
});
