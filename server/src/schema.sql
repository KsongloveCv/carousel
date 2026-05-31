CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(16),
  description TEXT,
  price_from NUMERIC(10, 2) NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS packages (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  pet_type VARCHAR(120),
  price NUMERIC(10, 2) NOT NULL,
  features JSONB NOT NULL DEFAULT '[]',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  author_name VARCHAR(100) NOT NULL,
  pet_info VARCHAR(120),
  content TEXT NOT NULL,
  stars INT NOT NULL DEFAULT 5 CHECK (stars >= 1 AND stars <= 5),
  avatar_emoji VARCHAR(16) DEFAULT '🐾',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  pet_type VARCHAR(50) NOT NULL,
  service_slug VARCHAR(50) NOT NULL,
  note TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews (created_at DESC);
