import { createServer } from "node:http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";
import express from "express";
import { scramjetPath } from "@mercuryworkshop/scramjet/path";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = join(__dirname, "static");

// Get the libcurl static path manually (browser-only module, can't import it)
const libcurlPath = join(
  __dirname,
  "node_modules",
  "@mercuryworkshop",
  "libcurl-transport",
  "dist"
);

const app = express();

// Set required headers for SharedArrayBuffer (required by Scramjet)
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// Serve Scramjet engine files at /scram/
app.use("/scram/", express.static(scramjetPath));

// Serve bare-mux transport at /baremux/
app.use("/baremux/", express.static(baremuxPath));

// Serve libcurl transport at /libcurl/
app.use("/libcurl/", express.static(libcurlPath));

// Serve our frontend
app.use(express.static(publicPath));

// Fallback
app.get("*", (req, res) => {
  res.sendFile(join(publicPath, "index.html"));
});

const httpServer = createServer(app);

// Route WebSocket upgrades to Wisp
httpServer.on("upgrade", (req, socket, head) => {
  if (req.url.endsWith("/wisp/")) {
    wisp.routeRequest(req, socket, head);
  } else {
    socket.end();
  }
});

const port = parseInt(process.env.PORT || "8080");
httpServer.listen(port, "0.0.0.0", () => {
  console.log(`\n🚀 NexProxy is running!`);
  console.log(`   → http://localhost:${port}\n`);
});
