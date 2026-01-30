import { siX, siBluesky, siInstagram } from "simple-icons";

export interface ApparelStore {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  isEU: boolean;
  tags: string[];
  url: string;
  description: string;
  socials?: Array<{ platform: string; url: string }>;
  nsfw?: boolean;
  logoUrl?: string;
  foundedYear?: number;
}

export const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" },
  { code: "AU", name: "Australia" },
  { code: "GB", name: "United Kingdom" },
  { code: "FI", name: "Finland" },
  { code: "DE", name: "Germany" },
  { code: "EU", name: "Other EU" },
];

export const ICON_MAP: Record<string, any> = {
  x: siX,
  twitter: siX,
  bluesky: siBluesky,
  instagram: siInstagram,
  insta: siInstagram,
};
