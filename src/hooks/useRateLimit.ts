// ai-chat-next/src/hooks/useRateLimit.ts
import { useCallback } from "react";

const STORAGE_KEY = "rate_limit";
const PERIOD_MS = 24 * 3600_000; // 24 часа
const LIMITS = {
  text: 3,
  code: 2,
  image: 1,
} as const;

type ModelType = keyof typeof LIMITS;

interface RateState {
  start: string;
  counts: Record<ModelType, number>;
}

function loadState(): RateState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed: RateState = JSON.parse(raw);
      const since = Date.now() - new Date(parsed.start).getTime();
      if (since < PERIOD_MS) {
        return parsed;
      }
    } catch {}
  }
  return { start: new Date().toISOString(), counts: { text: 0, code: 0, image: 0 } };
}

function saveState(state: RateState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useRateLimit() {
  const isAllowed = useCallback((type: ModelType) => {
    const state = loadState();
    const startTime = new Date(state.start).getTime();
    const retryAfter = new Date(startTime + PERIOD_MS);

    if (state.counts[type] < LIMITS[type]) {
      return { ok: true as const };
    } else {
      return { ok: false as const, retryAfter };
    }
  }, []);

  const mark = useCallback((type: ModelType) => {
    const state = loadState();
    state.counts[type] = (state.counts[type] || 0) + 1;
    saveState(state);
  }, []);

  const reset = useCallback(() => {
    saveState({ start: new Date().toISOString(), counts: { text: 0, code: 0, image: 0 } });
  }, []);

  return { isAllowed, mark, reset, limits: LIMITS };
}