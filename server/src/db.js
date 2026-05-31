import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import {
  services,
  packages,
  reviews,
  bookings,
} from "./seed-data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { Pool } = pg;

export const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://mengzhao:mengzhao123@localhost:5432/pet_grooming",
});

export async function waitForDb(maxAttempts = 30) {
  for (let i = 1; i <= maxAttempts; i++) {
    try {
      await pool.query("SELECT 1");
      return;
    } catch {
      if (i === maxAttempts) throw new Error("Database not ready");
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}

export async function initSchema() {
  const sql = fs.readFileSync(
    path.join(__dirname, "schema.sql"),
    "utf8"
  );
  await pool.query(sql);
  await pool.query(
    "ALTER TABLE services ADD COLUMN IF NOT EXISTS image_url VARCHAR(255)"
  );
}

export async function syncServiceImages() {
  for (const s of services) {
    if (!s.image_url) continue;
    await pool.query(
      `UPDATE services SET image_url = $1 WHERE slug = $2`,
      [s.image_url, s.slug]
    );
  }
}

export async function seedDatabase({ force = false } = {}) {
  const { rows } = await pool.query("SELECT COUNT(*)::int AS n FROM services");
  if (rows[0].n > 0 && !force) {
    return { seeded: false, message: "Database already has data" };
  }

  if (force) {
    await pool.query(
      "TRUNCATE services, packages, reviews, bookings RESTART IDENTITY CASCADE"
    );
  }

  for (const s of services) {
    await pool.query(
      `INSERT INTO services (slug, name, icon, image_url, description, price_from, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (slug) DO UPDATE SET
         name = EXCLUDED.name,
         icon = EXCLUDED.icon,
         image_url = EXCLUDED.image_url,
         description = EXCLUDED.description,
         price_from = EXCLUDED.price_from,
         sort_order = EXCLUDED.sort_order`,
      [
        s.slug,
        s.name,
        s.icon,
        s.image_url || null,
        s.description,
        s.price_from,
        s.sort_order,
      ]
    );
  }

  for (const p of packages) {
    await pool.query(
      `INSERT INTO packages (slug, name, pet_type, price, features, featured, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (slug) DO UPDATE SET
         name = EXCLUDED.name,
         pet_type = EXCLUDED.pet_type,
         price = EXCLUDED.price,
         features = EXCLUDED.features,
         featured = EXCLUDED.featured,
         sort_order = EXCLUDED.sort_order`,
      [
        p.slug,
        p.name,
        p.pet_type,
        p.price,
        JSON.stringify(p.features),
        p.featured,
        p.sort_order,
      ]
    );
  }

  for (const r of reviews) {
    await pool.query(
      `INSERT INTO reviews (author_name, pet_info, content, stars, avatar_emoji)
       VALUES ($1, $2, $3, $4, $5)`,
      [r.author_name, r.pet_info, r.content, r.stars, r.avatar_emoji]
    );
  }

  for (const b of bookings) {
    await pool.query(
      `INSERT INTO bookings (customer_name, phone, pet_type, service_slug, note, status)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        b.customer_name,
        b.phone,
        b.pet_type,
        b.service_slug,
        b.note,
        b.status,
      ]
    );
  }

  return {
    seeded: true,
    counts: {
      services: services.length,
      packages: packages.length,
      reviews: reviews.length,
      bookings: bookings.length,
    },
  };
}
