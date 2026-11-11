"use client";

import { useSyncExternalStore } from "react";

// Shared price-first draft. Both placements on one page read and write the same
// service, ZIP and home answers, so nobody is asked twice.
export type QuoteDraft = {
  service: string;
  zip: string;
  bedrooms: string;
  bathrooms: string;
  size: string;
};

const INITIAL: QuoteDraft = {
  service: "Standard recurring cleaning",
  zip: "",
  bedrooms: "3",
  bathrooms: "2",
  size: "1500-1999",
};

let draft: QuoteDraft = INITIAL;
let draftPath: string | null = null;
let formStartClaimed = false;
const listeners = new Set<() => void>();
const emittedPrices = new Set<string>();

function emit() {
  for (const listener of listeners) listener();
}

export function subscribeQuoteDraft(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function readQuoteDraft(pathname: string): QuoteDraft {
  return draftPath === pathname ? draft : INITIAL;
}

export function serverQuoteDraft(): QuoteDraft {
  return INITIAL;
}

/** First caller wins; page-level defaults (pinned service, ?zip=) apply once per page. */
export function ensureQuoteDraft(pathname: string, init: Partial<QuoteDraft>) {
  if (draftPath === pathname) return;
  draftPath = pathname;
  formStartClaimed = false;
  emittedPrices.clear();
  const next = { ...INITIAL };
  for (const key of Object.keys(init) as Array<keyof QuoteDraft>) {
    if (init[key]) next[key] = init[key] as string;
  }
  draft = next;
  emit();
}

export function updateQuoteDraft(patch: Partial<QuoteDraft>) {
  draft = { ...draft, ...patch };
  emit();
}

/** One price_view per distinct price per page load, across both placements. */
export function claimPriceView(key: string): boolean {
  if (!key || emittedPrices.has(key)) return false;
  emittedPrices.add(key);
  return true;
}

/** quote_form_start fires once per page load across both placements. */
export function claimFormStart(): boolean {
  if (formStartClaimed) return false;
  formStartClaimed = true;
  return true;
}

export function useQuoteDraft(pathname: string): QuoteDraft {
  return useSyncExternalStore(subscribeQuoteDraft, () => readQuoteDraft(pathname), serverQuoteDraft);
}
