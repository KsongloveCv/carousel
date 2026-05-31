import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import {
  pool,
  waitForDb,
  initSchema,
  seedDatabase,
  syncServiceImages,
} from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../..");
const PORT = Number(process.env.PORT) || 3000;
const APP_DOMAIN = process.env.APP_DOMAIN || "mengzhao.pet";

const app = express();

app.use(
  cors({
    origin: [
      `http://${APP_DOMAIN}`,
      `http://www.${APP_DOMAIN}`,
      "http://localhost",
      "http://127.0.0.1",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, database: "connected" });
  } catch (err) {
    res.status(503).json({ ok: false, error: err.message });
  }
});

app.get("/api/stats", async (_req, res) => {
  const [bookings, reviews, services] = await Promise.all([
    pool.query("SELECT COUNT(*)::int AS n FROM bookings"),
    pool.query("SELECT COUNT(*)::int AS n FROM reviews"),
    pool.query("SELECT COUNT(*)::int AS n FROM services"),
  ]);
  res.json({
    bookings_count: bookings.rows[0].n,
    reviews_count: reviews.rows[0].n,
    services_count: services.rows[0].n,
    pets_served: 5000 + bookings.rows[0].n,
  });
});

app.get("/api/services", async (_req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM services ORDER BY sort_order"
  );
  res.json(rows);
});

app.get("/api/packages", async (_req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM packages ORDER BY sort_order"
  );
  res.json(rows);
});

app.get("/api/reviews", async (_req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM reviews ORDER BY created_at DESC"
  );
  res.json(rows);
});

app.get("/api/bookings", async (_req, res) => {
  const { rows } = await pool.query(
    `SELECT b.*, p.name AS service_name
     FROM bookings b
     LEFT JOIN packages p ON p.slug = b.service_slug
     ORDER BY b.created_at DESC
     LIMIT 50`
  );
  res.json(rows);
});

app.post("/api/bookings", async (req, res) => {
  const { name, phone, pet, service, note } = req.body;
  if (!name || !phone || !pet || !service) {
    return res.status(400).json({ error: "请填写必填项" });
  }

  const { rows } = await pool.query(
    `INSERT INTO bookings (customer_name, phone, pet_type, service_slug, note)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name.trim(), phone.trim(), pet, service, note?.trim() || null]
  );

  res.status(201).json(rows[0]);
});

app.post("/api/admin/seed", async (req, res) => {
  const secret = process.env.SEED_SECRET || "mengzhao-seed";
  if (req.body?.secret !== secret && req.query?.secret !== secret) {
    return res.status(403).json({ error: "Invalid seed secret" });
  }
  const force = req.body?.force === true || req.query?.force === "true";
  const result = await seedDatabase({ force });
  res.json(result);
});

app.use(express.static(rootDir));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(rootDir, "index.html"));
});

async function start() {
  await waitForDb();
  await initSchema();
  if (process.env.SEED_ON_START === "true") {
    const result = await seedDatabase();
    console.log("Seed on start:", result);
  }
  await syncServiceImages();

  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
    console.log(`Site domain: http://${APP_DOMAIN}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
