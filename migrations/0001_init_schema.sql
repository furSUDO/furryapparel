PRAGMA defer_foreign_keys=TRUE;

-- Drop if exists (for clean initial setup; comment out if migrating)
DROP TABLE IF EXISTS apparel_stores;
DROP TABLE IF EXISTS d1_migrations;

CREATE TABLE d1_migrations(
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT UNIQUE,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO "d1_migrations" (id, name, applied_at) 
VALUES (1, '0001_initial_schema_and_init_data.sql', CURRENT_TIMESTAMP);

CREATE TABLE apparel_stores (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    country     TEXT NOT NULL,
    countryCode TEXT NOT NULL,
    isEU        INTEGER NOT NULL DEFAULT 0,
    tags        TEXT NOT NULL,
    url         TEXT NOT NULL,
    description TEXT NOT NULL,
    social_links TEXT,
    logo_url    TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at  TIMESTAMP,
    active      INTEGER NOT NULL DEFAULT 1,
    founded_year INTEGER,
    nsfw        INTEGER NOT NULL DEFAULT 0
);

-- Insert all stores with updated schema
INSERT INTO "apparel_stores" (
    id, name, country, countryCode, isEU, tags, url, description, 
    social_links, logo_url, active, founded_year, nsfw
) VALUES
('1',  'ivycomb',              'Canada', 'CA', 0, 'Merch,Music,Furry,Content-Creator', 'https://ivycomb.store/', 'Official merchandise for musician and content creator ivycomb', '[{"platform":"x","url":"https://x.com/Ivycomb"}]', NULL, 1, NULL, 0),
('2',  'Howl Out',             'United States', 'US', 0, 'Apparel,Streetwear,Technical,Wolf,Conventions', 'https://howl-out.com/', 'Technical streetwear and social communication bands for conventions', '[{"platform":"x","url":"https://x.com/howl_out"}]', NULL, 1, NULL, 0),
('3',  '0 Fox Shop',           'United States', 'US', 0, 'Apparel,Fox,Anthro,Accessories,Home-Goods', 'https://0foxshop.com/', 'Fox-inspired clothing, accessories and home goods', '[{"platform":"x","url":"https://x.com/0foxShop"}]', "https://0foxshop.com/cdn/shop/files/logo_white_smaller.png?v=1674770901&width=500", 1, NULL, 0),
('4',  'Hyena Agenda',         'United States', 'US', 0, 'Apparel,Tie-dye,Custom,Illustrated,Hyena', 'https://hyena-agenda.com/', 'Hand-illustrated vibrant tie-dye and custom apparel', '[{"platform":"x","url":"https://x.com/HyenaAgenda"}]', NULL, 1, NULL, 0),
('5',  'CAMP HOWL',            'United States', 'US', 0, 'Apparel,All-Over-Print,Fantasy,Creature', 'https://www.camphowl.com/', 'Colorful all-over print apparel with fantasy creature patterns', '[{"platform":"x","url":"https://x.com/camphowl"}]', NULL, 1, NULL, 0),
('6',  'Wolf Moon Apparel',    'United States', 'US', 0, 'Apparel,Wolf,Werewolf,Screen-Printed,Illustrated', 'https://wolfmoonapparel.storenvy.com/', 'Hand-illustrated wolf and werewolf apparel, locally screen-printed', '[{"platform":"x","url":"https://x.com/WolfMoonApparel"}]', NULL, 1, NULL, 0),
('7',  'YaffYoff!',            'United States', 'US', 0, 'Apparel,Community,Merchandise', 'https://yaffyoff.com/', 'Community-focused apparel and merchandise', '[{"platform":"x","url":"https://x.com/yaffyoff"}]', NULL, 1, NULL, 0),
('8',  'Yuka Designs',         'United States', 'US', 0, 'Design,Custom,Commissions,Merchandise', 'https://yuka.design/', 'Custom character design commissions and merchandise services', '[{"platform":"x","url":"https://x.com/yukadesigns"}]', NULL, 1, NULL, 0),
('9',  'Waffle Wishes',        'Canada', 'CA', 0, 'Apparel,Accessories,Whimsical,Designer', 'https://wafflewishes.com/shop', 'Cozy, whimsical designer-oriented apparel and accessories', '[{"platform":"x","url":"https://x.com/wisheswaffle"}]', NULL, 1, NULL, 0),
('10', 'Nomad Complex',        'Canada', 'CA', 0, 'Premium,Apparel,No-Dropshipping,High-Quality', 'https://nomadcomplex.com/', 'Premium apparel with zero dropshipping or print-on-demand', '[{"platform":"x","url":"https://x.com/NomadComplex"}]', NULL, 1, NULL, 0),
('11', 'The Fox Nest',         'France', 'FR', 1, 'Apparel,Designer,Artist-Support,Fox', 'https://thefoxnest.store/', 'Designer apparel supporting independent artists', '[{"platform":"x","url":"https://x.com/TheFoxNestStore"}]', NULL, 1, NULL, 0),
('12', 'JustCats',             'Finland', 'FI', 1, 'Apparel,Streetwear,Cat,Edgy', 'https://justcats.fi/', 'Edgy streetwear with cat-inspired designs', '[{"platform":"x","url":"https://x.com/JustCatsWear"}]', NULL, 1, NULL, 0),
('13', 'Awruff Gear',          'Germany', 'DE', 1, 'Apparel,Techwear,LED,Tactical,Gear', 'https://awruffgear.com/', 'Techwear, LED accessories, and tactical gear', '[{"platform":"x","url":"https://x.com/AwruffGear"},{"platform":"bluesky","url":"https://bsky.app/profile/awruffgear.com"}]', NULL, 1, NULL, 1),
('14', 'NovCraft',             'Germany', 'DE', 1, 'Apparel,Oversized,Logo,Artist-Designed', 'https://novcraft-shop.de/', 'Oversized apparel with artist-designed logos', '[{"platform":"x","url":"https://x.com/nov_craft"}]', NULL, 1, NULL, 0),
('15', 'V-ART',                'United Kingdom', 'GB', 0, 'Apparel,Werewolf,Supernatural,Custom-Footwear', 'https://werewolvesrule.com/', 'Werewolf and supernatural themed apparel with custom footwear', '[{"platform":"x","url":"https://x.com/Werewolf_V"}]', NULL, 1, NULL, 0),
('16', 'Dogz Crew',            'United Kingdom', 'GB', 0, 'Apparel,Pup,Party,Wear', 'https://www.dogzcrew.com/furry', 'Fun pup-focused clothing and party wear', '[{"platform":"x","url":"https://x.com/thedogzcrew"}]', NULL, 1, NULL, 0),
('17', 'Rudderbutts',          'Mexico', 'MX', 0, 'Apparel,Swimwear,Otter,LGBTQIA+', 'https://rudderbutts.shop/', 'Otter-focused apparel and swimwear celebrating LGBTQIA+ community', '[{"platform":"x","url":"https://x.com/rudderbutts"}]', NULL, 1, NULL, 0),
('18', 'ArtyChikle',           'Mexico', 'MX', 0, 'Design,Street-Art,Custom,Apparel', 'https://artychikle.com/', 'Street art duo offering custom design and apparel services', '[{"platform":"x","url":"https://x.com/ArtyandChikle"}]', NULL, 1, NULL, 0),
('19', 'Burubado',             'Australia', 'AU', 0, 'Apparel,Tees,Stickers,Humour,Pride', 'https://burubado.com/', 'Custom tees and stickers with humorous and pride designs', '[{"platform":"x","url":"https://x.com/burubado_furry"}]', NULL, 1, NULL, 0),
('20', 'Angy Paws',            'Australia', 'AU', 0, 'Apparel,Socks,Arm-Warmers,Premium', 'https://www.angypaws.com/', 'Premium socks and arm warmers specialist', '[{"platform":"x","url":"https://x.com/AngyPaws"}]', NULL, 1, NULL, 0),
('21', 'YIPP YAPP',            'United States', 'US', 0, 'Apparel,Artist-Collab,Comfort,Craftsmanship', 'https://yippyapp.co/', 'Original artist-collaborated apparel with emphasis on comfort and craftsmanship', '[{"platform":"x","url":"https://x.com/YippYappWear"}]', NULL, 1, NULL, 0),
('22', 'THAT''S RUFF',         'Australia', 'AU', 0, 'Apparel,Streetwear,Sustainable,Skate,Vintage', 'https://www.thatsruff.com/', 'Sustainable streetwear blending skate, street, and vintage comic aesthetics', '[{"platform":"x","url":"https://x.com/thatsruffau"}]', NULL, 1, NULL, 0),
('23', 'WoofAndWagClub',       'United Kingdom', 'GB', 1, 'Apparel,LGBTQIA+,Puppy,Community,Playful', 'https://woofandwag.club/', 'LGBTQIA+ puppy community apparel with proud, playful designs', '[{"platform":"x","url":"https://x.com/WoofAndWagClub"}]', NULL, 1, NULL, 0),
('24', 'Purrint',              'Spain', 'ES', 1, 'Printing,Stickers,Merch,Custom,No-Minimum', 'https://purrint.es/', 'Custom sticker and merchandise printing with no minimum orders', '[{"platform":"x","url":"https://x.com/Purrint_es"}]', NULL, 1, NULL, 0),
('25', 'KOSSE.DOG',            'France', 'FR', 1, 'Apparel,Eco-Friendly,Hand-Drawn,Artist', 'https://kosse.dog/', 'Hand-drawn artist shop with eco-friendly apparel', '[{"platform":"bluesky","url":"https://bsky.app/profile/kosse.dog"}]', NULL, 1, NULL, 0);

-- Indexes for common queries
CREATE INDEX idx_name        ON apparel_stores(name);
CREATE INDEX idx_countryCode ON apparel_stores(countryCode);
CREATE INDEX idx_tags        ON apparel_stores(tags);
CREATE INDEX idx_isEU        ON apparel_stores(isEU);
CREATE INDEX idx_active      ON apparel_stores(active);
CREATE INDEX idx_nsfw        ON apparel_stores(nsfw);

-- Reset sequence if needed
DELETE FROM sqlite_sequence;
INSERT INTO "sqlite_sequence" (name, seq) VALUES ('d1_migrations', 1);