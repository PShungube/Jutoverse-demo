import type { AppLang } from './language';

export type LocaleOption = {
  lang: AppLang;
  locale: 'en-US' | 'he-IL';
  countryCode: 'US' | 'IL';
  displayName: string;
  nativeName: string;
  shortLabel: string;
  switchLabel: string;
};

export const LOCALE_OPTIONS: Record<AppLang, LocaleOption> = {
  en: {
    lang: 'en',
    locale: 'en-US',
    countryCode: 'US',
    displayName: 'English',
    nativeName: 'English',
    shortLabel: 'EN',
    switchLabel: 'English',
  },
  he: {
    lang: 'he',
    locale: 'he-IL',
    countryCode: 'IL',
    displayName: 'Hebrew',
    nativeName: 'עברית',
    shortLabel: 'HE',
    switchLabel: 'עברית',
  },
};

export const LANGUAGE_SWITCH_ORDER: AppLang[] = ['he', 'en'];
