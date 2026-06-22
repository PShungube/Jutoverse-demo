export type AppLang = 'en' | 'he';
export type AppDir = 'ltr' | 'rtl';

export const DASHBOARD_LANG_STORAGE_KEY = 'jutoverse.dashboard.lang';

export function normalizeAppLang(raw: unknown): AppLang | null {
  const value = String(raw ?? '').trim().toLowerCase();
  if (value === 'he' || value === 'iw') return 'he';
  if (value === 'en') return 'en';
  return null;
}

export function getLanguageDirection(lang: AppLang): AppDir {
  return lang === 'he' ? 'rtl' : 'ltr';
}

export function getBrowserDashboardLang(): AppLang {
  const browserLang = String(typeof navigator !== 'undefined' ? navigator.language : '').toLowerCase();
  return browserLang.startsWith('he') || browserLang.startsWith('iw') ? 'he' : 'en';
}

export function getStoredDashboardLang(): AppLang {
  try {
    const stored = normalizeAppLang(window.localStorage.getItem(DASHBOARD_LANG_STORAGE_KEY));
    if (stored) return stored;
  } catch {
    // ignore
  }
  return getBrowserDashboardLang();
}

export function persistDashboardLang(lang: AppLang) {
  try {
    window.localStorage.setItem(DASHBOARD_LANG_STORAGE_KEY, lang);
  } catch {
    // ignore
  }
}

export function applyDocumentLanguage(lang: AppLang, title?: string): AppDir {
  const dir = getLanguageDirection(lang);

  try {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;

    if (document.body) {
      document.body.lang = lang;
      document.body.dir = dir;
    }

    if (title) document.title = title;
  } catch {
    // ignore
  }

  return dir;
}
