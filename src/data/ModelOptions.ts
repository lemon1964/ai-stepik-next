// src/data/ModelOptions.ts

export const MODEL_OPTIONS: Record<ModelType, { id: string; name: string }[]> = {
  text: [
    { id: "deepseek_qwen3", name: "DeepSeek Qwen3 8B" },
    { id: "mistral_devstral", name: "Mistral Devstral" },
    { id: "deephermes", name: "DeepHermes 24B" },
  ],
  code: [
    { id: "llama3_coder", name: "Llama 3 Coder" },
    { id: "deepseek_prover", name: "DeepSeek Prover" },
    { id: "qwen3_coder", name: "Qwen3" },
  ],
  image: [
    { id: "flux_schnell_free", name: "Flux.1 [schnell] (free)" },
  ],
};