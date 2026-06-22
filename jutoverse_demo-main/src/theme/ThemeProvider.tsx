import React, { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { DEFAULT_THEME_ID, getThemeById, normalizeThemeId, type ThemeDefinition, type ThemeId } from './themeCatalog';

const THEME_STORAGE_KEY = 'jutoverse.theme.current.v1';

type ThemeContextValue = {
  themeId: ThemeId;
  activeTheme: ThemeDefinition;
  setThemeId: (themeId: ThemeId) => void;
};

const fallbackTheme = getThemeById(DEFAULT_THEME_ID);

const ThemeContext = createContext<ThemeContextValue>({
  themeId: DEFAULT_THEME_ID,
  activeTheme: fallbackTheme,
  setThemeId: () => undefined,
});

function readSessionTheme(): ThemeId {
  try {
    return normalizeThemeId(window.sessionStorage.getItem(THEME_STORAGE_KEY)) ?? DEFAULT_THEME_ID;
  } catch {
    return DEFAULT_THEME_ID;
  }
}

function persistSessionTheme(themeId: ThemeId) {
  try {
    if (themeId === DEFAULT_THEME_ID) {
      window.sessionStorage.removeItem(THEME_STORAGE_KEY);
      return;
    }
    window.sessionStorage.setItem(THEME_STORAGE_KEY, themeId);
  } catch {
    // Session storage is an enhancement only.
  }
}

function applyThemeToDocument(theme: ThemeDefinition) {
  document.documentElement.dataset.theme = theme.id;
  document.documentElement.dataset.themeTone = theme.tone;
  document.documentElement.style.colorScheme = theme.tone;
  document.body.dataset.theme = theme.id;
  document.body.dataset.themeTone = theme.tone;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>(readSessionTheme);
  const activeTheme = getThemeById(themeId);

  useLayoutEffect(() => {
    applyThemeToDocument(activeTheme);
  }, [activeTheme]);

  const setThemeId = useCallback((nextThemeId: ThemeId) => {
    const normalized = normalizeThemeId(nextThemeId) ?? DEFAULT_THEME_ID;
    persistSessionTheme(normalized);
    setThemeIdState(normalized);
  }, []);

  const value = useMemo(
    () => ({
      themeId,
      activeTheme,
      setThemeId,
    }),
    [activeTheme, setThemeId, themeId]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
