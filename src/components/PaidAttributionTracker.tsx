"use client";

import { useEffect } from "react";

import { captureFirstPaidTouch } from "@/lib/attribution";

export default function PaidAttributionTracker() {
  useEffect(() => {
    captureFirstPaidTouch();
  }, []);

  return null;
}
