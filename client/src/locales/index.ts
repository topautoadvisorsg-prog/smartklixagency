import { en } from "./en";
import { es } from "./es";
import { Language } from "@/lib/LanguageContext";

export const translations = {
  en,
  es
};

export function useTranslation(lang: Language) {
  return translations[lang];
}
