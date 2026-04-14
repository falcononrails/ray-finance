import type { Provider } from "../provider.js";
import { config, useManaged, RAY_PROXY_BASE } from "../../config.js";
import { createAnthropicProvider } from "./anthropic.js";
import { createOpenAICompatibleProvider } from "./openai-compat.js";

export function createProvider(): Provider {
  if (useManaged()) {
    return createAnthropicProvider({
      apiKey: config.rayApiKey,
      baseURL: `${RAY_PROXY_BASE}/ai`,
    });
  }

  if (config.providerType === "openai-compatible") {
    return createOpenAICompatibleProvider({
      apiKey: config.openaiCompatibleKey,
      baseURL: config.openaiCompatibleBaseURL,
    });
  }

  return createAnthropicProvider({
    apiKey: config.anthropicKey,
  });
}
