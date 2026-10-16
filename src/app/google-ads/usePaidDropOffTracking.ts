"use client";

import { useEffect, useRef } from "react";
import { isPaidFormField, trackFunnelEvent, type FunnelEventName } from "@/lib/conversionTracking";

// sessionStorage keeps focus/completion/view counts unique across reloads and
// intent changes in the same tab. Memory is the fallback for blocked storage.
const seenEvents = new Set<string>();

function firstInSession(key: string): boolean {
  if (seenEvents.has(key)) return false;
  try {
    if (window.sessionStorage.getItem(`nsc_paid_dropoff:${key}`) === "1") return false;
    window.sessionStorage.setItem(`nsc_paid_dropoff:${key}`, "1");
  } catch {
    // Telemetry still works for this document without browser storage.
  }
  seenEvents.add(key);
  return true;
}

type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type Visit = { startedAt: number; lastField: string; maxScrollPct: number; exited: boolean };
type PaidPageContext = { service: string; city: string; intent: string };

function trackedControl(target: EventTarget | null): FormControl | undefined {
  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
  if (target.disabled || target.closest("[hidden], .hidden") || !target.closest("#booking-form form") || !isPaidFormField(target.name)) return;
  if (target instanceof HTMLInputElement && target.type === "hidden") return;
  return target;
}

function hasValidValue(control: FormControl): boolean {
  if (!control.validity.valid) return false;
  if (control instanceof HTMLInputElement && (control.type === "radio" || control.type === "checkbox")) return control.checked;
  return Boolean(control.value.trim());
}

export function usePaidDropOffTracking({ service, city, intent }: PaidPageContext) {
  const visitRef = useRef<Visit | null>(null);

  useEffect(() => {
    const visit = visitRef.current ||= { startedAt: performance.now(), lastField: "none", maxScrollPct: 0, exited: false };
    const context = { source: "google-ads", page: "/google-ads", service, city, intent };
    const emit = (name: FunnelEventName, details: { field?: string; section?: string; lastField?: string; maxScrollPct?: number; secondsOnPage?: number }) => {
      try {
        trackFunnelEvent(name, { ...context, ...details });
      } catch {
        // A broken tag must never affect focus, validation or submission.
      }
    };
    const onFocus = (event: FocusEvent) => {
      const control = trackedControl(event.target);
      if (!control) return;
      visit.lastField = control.name;
      if (firstInSession(`field_focus:${control.name}`)) emit("field_focus", { field: control.name });
    };
    const onBlur = (event: FocusEvent) => {
      const control = trackedControl(event.target);
      if (control && hasValidValue(control) && firstInSession(`field_complete:${control.name}`)) {
        emit("field_complete", { field: control.name });
      }
    };
    const updateScroll = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const percent = range > 0 ? Math.min(100, Math.max(0, window.scrollY / range * 100)) : 100;
      visit.maxScrollPct = Math.max(visit.maxScrollPct, percent);
    };
    const onExit = () => {
      const elapsed = performance.now() - visit.startedAt;
      if (visit.exited || elapsed < 3000) return;
      visit.exited = true;
      updateScroll();
      emit("page_exit", {
        lastField: visit.lastField,
        maxScrollPct: Math.round(visit.maxScrollPct / 10) * 10,
        secondsOnPage: Math.min(600, Math.floor(elapsed / 1000)),
      });
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") onExit();
    };

    // Reuse the current landing-page anchors. The paid page deliberately has
    // no global footer: its closing quote/call block is the footer region.
    const sections: Array<readonly [string, Element | null]> = [
      ["hero", document.getElementById("paid-title")],
      ["form", document.getElementById("booking-form")],

      ["proof", document.getElementById("paid-proof-title")],
      ["reviews", document.getElementById("paid-reviews-title")],
      ["faq", document.getElementById("paid-faq-trigger-0")?.closest("section")?.querySelector("h2") || null],
      ["footer", document.getElementById("paid-footer")],
    ];
    const sectionNames = new Map(sections.flatMap(([name, element]) => element ? [[element, name] as const] : []));
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const section = sectionNames.get(entry.target);
        if (section && firstInSession(`section_view:${section}`)) emit("section_view", { section });
        observer?.unobserve(entry.target);
      }
    });
    for (const element of sectionNames.keys()) observer?.observe(element);

    updateScroll();
    document.addEventListener("focus", onFocus, true);
    document.addEventListener("blur", onBlur, true);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    window.addEventListener("pagehide", onExit);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer?.disconnect();
      document.removeEventListener("focus", onFocus, true);
      document.removeEventListener("blur", onBlur, true);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      window.removeEventListener("pagehide", onExit);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [service, city, intent]);
}
