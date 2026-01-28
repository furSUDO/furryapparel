-- Create apparel_stores table
CREATE TABLE IF NOT EXISTS apparel_stores (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  countryCode TEXT NOT NULL,
  isEU INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT NOT NULL,
  socialPlatform TEXT,
  socialUrl TEXT
);

-- Create index for faster searches
CREATE INDEX idx_name ON apparel_stores(name);
CREATE INDEX idx_countryCode ON apparel_stores(countryCode);
CREATE INDEX idx_category ON apparel_stores(category);
CREATE INDEX idx_isEU ON apparel_stores(isEU);
