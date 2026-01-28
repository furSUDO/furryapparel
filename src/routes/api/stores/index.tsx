import { type RequestHandler } from "@builder.io/qwik-city";

export interface ApparelStore {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  isEU: boolean;
  category: string;
  url: string;
  social?: {
    platform: string;
    url: string;
  };
  description: string;
}

export const onGet: RequestHandler = async ({ json, platform }) => {
  // Get D1 database binding from Cloudflare
  const db = platform?.env?.DB;


  if (!db) {
    json(
      500,
      { error: "Database not available" }
    );
    return;
  }

  // Query all apparel stores from the database
  const { results } = await db
    .prepare("SELECT * FROM apparel_stores ORDER BY name ASC")
    .all();

  // Transform database results to match ApparelStore interface
  const stores: ApparelStore[] = (results as any[]).map((row) => ({
    id: row.id,
    name: row.name,
    country: row.country,
    countryCode: row.countryCode,
    isEU: row.isEU === 1,
    category: row.category,
    url: row.url,
    description: row.description,
    ...(row.socialPlatform && row.socialUrl
      ? {
        social: {
          platform: row.socialPlatform,
          url: row.socialUrl,
        },
      }
      : {}),
  }));
  
  console.log(stores)
  json(100, stores);
};
