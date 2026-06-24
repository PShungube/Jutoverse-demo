export type ThemeId = 'jutoverse' | 'command-center' | 'clinical-calm' | 'gov-trust';

export type ThemeTone = 'light' | 'dark';

export type LocalizedThemeText = {
  en: string;
  he: string;
};

export type ThemeDefinition = {
  id: ThemeId;
  name: string;
  shortName: string;
  tone: ThemeTone;
  tagline: LocalizedThemeText;
  description: LocalizedThemeText;
  preview: {
    background: string;
    surface: string;
    primary: string;
    accent: string;
    text: string;
  };
};

export const DEFAULT_THEME_ID: ThemeId = 'jutoverse';

export const THEMES: ThemeDefinition[] = [
  {
    id: 'jutoverse',
    name: 'Jutoverse',
    shortName: 'Jutoverse',
    tone: 'dark',
    tagline: {
      en: 'Neon cloud-data universe',
      he: 'יקום ענן ודאטה נאוני',
    },
    description: {
      en: 'Immersive navy surfaces, luminous cyan grids, cinematic depth, and premium telemetry glow.',
      he: 'משטחים כהים, רשתות ציאן זוהרות, עומק קולנועי ונראות טלמטריה פרימיום.',
    },
    preview: {
      background: '#020617',
      surface: '#061a33',
      primary: '#00d5ff',
      accent: '#7dd3fc',
      text: '#e0f7ff',
    },
  },
  {
    id: 'command-center',
    name: 'Command Center',
    shortName: 'Command',
    tone: 'dark',
    tagline: {
      en: 'Operational control room',
      he: 'חדר שליטה תפעולי',
    },
    description: {
      en: 'Dense monitoring surfaces with green health signals and disciplined contrast.',
      he: 'משטחי ניטור צפופים עם אותות בריאות ירוקים וניגודיות ממושמעת.',
    },
    preview: {
      background: '#06130d',
      surface: '#0c1f17',
      primary: '#22c55e',
      accent: '#f59e0b',
      text: '#ecfdf5',
    },
  },
  {
    id: 'clinical-calm',
    name: 'Clinical Calm',
    shortName: 'Clinical',
    tone: 'light',
    tagline: {
      en: 'Readable service clarity',
      he: 'בהירות שירותית קריאה',
    },
    description: {
      en: 'Soft healthcare-safe surfaces for documentation-heavy and accessibility-sensitive flows.',
      he: 'משטחים רכים לזרימות עתירות מסמכים ורגישות לנגישות.',
    },
    preview: {
      background: '#eefaf8',
      surface: '#ffffff',
      primary: '#0f766e',
      accent: '#14b8a6',
      text: '#12333f',
    },
  },
  {
    id: 'gov-trust',
    name: 'Gov Trust',
    shortName: 'Gov',
    tone: 'light',
    tagline: {
      en: 'Accessible civic trust mode',
      he: 'מצב אמון אזרחי נגיש',
    },
    description: {
      en: 'Conservative civic blues, strong focus states, and restrained decoration.',
      he: 'כחולים ציבוריים, מצבי פוקוס חזקים ודקורציה מאופקת.',
    },
    preview: {
      background: '#f5f7fb',
      surface: '#ffffff',
      primary: '#003f88',
      accent: '#f59e0b',
      text: '#001f2c',
    },
  },
];

export function normalizeThemeId(raw: unknown): ThemeId | null {
  const value = String(raw ?? '').trim().toLowerCase();
  return THEMES.find((theme) => theme.id === value)?.id ?? null;
}

export function getThemeById(themeId: ThemeId): ThemeDefinition {
  return THEMES.find((theme) => theme.id === themeId) ?? THEMES[0];
}
