import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { WebSocketServer, WebSocket } from "ws";
import { createServer } from "http";

// Import Modular Routes
import productRoutes from "./backend/modules/product/routes.ts";
import workflowRoutes from "./backend/modules/workflow/routes.ts";
import productionRoutes from "./backend/modules/production/routes.ts";
import qcRoutes from "./backend/modules/qc/routes.ts";
import inventoryRoutes from "./backend/modules/inventory/routes.ts";
import aiEngineRoutes from "./backend/modules/ai-engine/routes.ts";

dotenv.config();

// --- Database Configuration ---
let supabase: any = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
  supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
}

let mysqlPool: any = null;
if (process.env.MYSQL_HOST) {
  mysqlPool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);
  const PORT = 3000;

  // --- WebSocket Setup (App Sync) ---
  const wss = new WebSocketServer({ server });
  const clients = new Set<WebSocket>();

  wss.on("connection", (ws) => {
    clients.add(ws);
    console.log("New client connected to real-time engine");

    ws.on("close", () => {
      clients.delete(ws);
    });
  });

  const broadcast = (data: any) => {
    const message = JSON.stringify(data);
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  };

  app.use(express.json());

  // --- Modular API Routes ---
  app.use("/api/products", productRoutes);
  app.use("/api/workflow", workflowRoutes);
  app.use("/api/production", productionRoutes);
  app.use("/api/qc", qcRoutes);
  app.use("/api/inventory", inventoryRoutes);
  app.use("/api/ai-engine", aiEngineRoutes);

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`FactoryFlow AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
