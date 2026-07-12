"use client";

import { useEffect } from "react";
import { trackWebsitePhoneClick } from "@/lib/conversionTracking";

const googleTagManagerConfigured = Boolean(process.env.NEXT_PUBLIC_GTM_ID);
const googleAdsConversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
const googleAdsPhoneConversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION_LABEL;
const businessPhoneDisplay =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_DISPLAY_NUMBER || "(559) 785-2822";
const businessPhoneDigits = businessPhoneDisplay.replace(/\D/g, "").slice(-10);

let phoneSnippetInstalled = false;

function updateWebsitePhoneLinks(formattedNumber: string, mobileNumber: string) {
  if (!formattedNumber || !mobileNumber) return;

  document.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]').forEach((link) => {
    const hrefDigits = (link.getAttribute("href") || "").replace(/\D/g, "").slice(-10);
    if (hrefDigits !== businessPhoneDigits) return;

    link.href = `tel:${mobileNumber}`;
    if (link.textContent?.includes(businessPhoneDisplay)) {
      link.textContent = link.textContent.replace(businessPhoneDisplay, formattedNumber);
    }
    const ariaLabel = link.getAttribute("aria-label");
    if (ariaLabel?.includes(businessPhoneDisplay)) {
      link.setAttribute("aria-label", ariaLabel.replace(businessPhoneDisplay, formattedNumber));
    }
  });
}

function installDirectWebsiteCallSnippet(): boolean {
  if (
    phoneSnippetInstalled ||
    googleTagManagerConfigured ||
    !googleAdsConversionId ||
    !googleAdsPhoneConversionLabel ||
    typeof window.gtag !== "function"
  ) {
    return phoneSnippetInstalled;
  }

  window.gtag("config", `${googleAdsConversionId}/${googleAdsPhoneConversionLabel}`, {
    phone_conversion_number: businessPhoneDisplay,
    phone_conversion_callback: updateWebsitePhoneLinks,
  });
  phoneSnippetInstalled = true;
  return true;
}

export default function WebsiteCallTracker() {
  useEffect(() => {
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;

    const installWithRetry = () => {
      if (installDirectWebsiteCallSnippet() || googleTagManagerConfigured || attempts >= 20) return;
      attempts += 1;
      retryTimer = setTimeout(installWithRetry, 250);
    };

    installWithRetry();

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const phoneLink = event.target.closest<HTMLAnchorElement>('a[href^="tel:"]');
      if (!phoneLink) return;

      trackWebsitePhoneClick({
        source: window.location.pathname === "/google-ads" ? "google-ads" : "website",
        page: window.location.pathname,
        phoneLocation: phoneLink.dataset.phoneLocation || "website_link",
      });
    };

    document.addEventListener("click", handleClick);
    return () => {
      if (retryTimer) clearTimeout(retryTimer);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
