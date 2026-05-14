import { defineRouting } from "next-intl/routing";
import { locales } from "./localization";

export const SUPPORTED_LOCALES = locales.map((i) => i.code);

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: SUPPORTED_LOCALES,
  defaultLocale: "uk",
  localeDetection: true,
  localePrefix: "as-needed",
  alternateLinks: false,
});
