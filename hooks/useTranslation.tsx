import { useRouter } from "next/router";
import { get } from 'lodash'
import en from "../public/static/locales/en.json";

const fromJson = (json:any) => JSON.parse(JSON.stringify(json));

const TRANSLATIONS = { en: fromJson(en) };

type Translation = 'en';

export function useTranslation() {
  const router = useRouter();
  const { locale, asPath } = router;
  const loc = locale ?? 'en';
  const setLocale = (locale:string) => router.push(asPath, asPath, { locale });
  const t = (keyString:string) => get(TRANSLATIONS[loc as Translation], keyString, '');
  return { t, locale, setLocale };
}