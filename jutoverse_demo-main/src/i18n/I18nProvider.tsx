import type { ReactNode } from 'react';
import { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react';
import type { LocalizedText } from '../api/contracts';
import { applyDocumentLanguage, getLanguageDirection, getStoredDashboardLang, persistDashboardLang, type AppDir, type AppLang } from './language';

type I18nContextValue = {
  lang: AppLang;
  dir: AppDir;
  setLang: (lang: AppLang) => void;
  text: (value: LocalizedText | string) => string;
};

const I18nContext = createContext<I18nContextValue>({
  lang: 'en',
  dir: 'ltr',
  setLang: () => undefined,
  text: (value) => (typeof value === 'string' ? value : value.en),
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<AppLang>(getStoredDashboardLang);
  const dir = getLanguageDirection(lang);

  useLayoutEffect(() => {
    applyDocumentLanguage(lang, 'Jutoverse Demo');
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      dir,
      setLang: (nextLang: AppLang) => {
        persistDashboardLang(nextLang);
        setLangState(nextLang);
      },
      text: (input: LocalizedText | string) => {
        if (typeof input === 'string') return input;
        return input[lang] ?? input.en;
      },
    }),
    [dir, lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
