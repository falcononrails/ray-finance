import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";
import { homedir } from "os";

const CACHE_PATH = resolve(homedir(), ".ray", "models-cache.json");
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
const CATALOG_URL = "https://models.dev/api.json";

export interface ModelEntry {
  id: string;
  name: string;
  family?: string;
  tool_call?: boolean;
  reasoning?: boolean;
  cost?: { input?: number; output?: number };
  limit?: { context?: number; output?: number };
  release_date?: string;
  modalities?: { input?: string[]; output?: string[] };
}

interface ProviderEntry {
  id: string;
  name: string;
  api?: string;
  models: Record<string, ModelEntry>;
}

type Catalog = Record<string, ProviderEntry>;

interface CachedCatalog {
  fetchedAt: number;
  data: Catalog;
}

async function fetchCatalog(): Promise<Catalog> {
  const resp = await fetch(CATALOG_URL);
  if (!resp.ok) throw new Error(`Failed to fetch model catalog: ${resp.status}`);
  const data = await resp.json() as Catalog;

  const dir = resolve(homedir(), ".ray");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const cached: CachedCatalog = { fetchedAt: Date.now(), data };
  writeFileSync(CACHE_PATH, JSON.stringify(cached));

  return data;
}

function getCachedCatalog(): Catalog | null {
  if (!existsSync(CACHE_PATH)) return null;
  try {
    const cached = JSON.parse(readFileSync(CACHE_PATH, "utf-8")) as CachedCatalog;
    if (Date.now() - cached.fetchedAt > CACHE_TTL) return null;
    return cached.data;
  } catch {
    return null;
  }
}

export async function getCatalog(): Promise<Catalog> {
  const cached = getCachedCatalog();
  if (cached) return cached;
  try {
    return await fetchCatalog();
  } catch {
    return {};
  }
}

/** Get all models for a provider (e.g. "openai", "google", "mistral") */
export function getProviderModels(catalog: Catalog, providerId: string): ModelEntry[] {
  const provider = catalog[providerId];
  if (!provider) return [];
  return Object.values(provider.models);
}

/** Look up a specific model by ID across all providers */
export function lookupModel(catalog: Catalog, modelId: string): ModelEntry | undefined {
  for (const provider of Object.values(catalog)) {
    const model = provider.models[modelId];
    if (model) return model;
  }
  return undefined;
}
