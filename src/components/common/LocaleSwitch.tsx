import { LANGUAGE_SWITCH_ORDER, LOCALE_OPTIONS } from '../../i18n/locales';
import type { AppLang } from '../../i18n/language';
import FlagIcon from './FlagIcon';

type LocaleSwitchProps = {
  lang: AppLang;
  onChange: (lang: AppLang) => void;
  groupLabel: string;
  className?: string;
};

export function LocaleSwitch({ lang, onChange, groupLabel, className = '' }: LocaleSwitchProps) {
  return (
    <div className={['toggle-group', 'locale-switch', className].filter(Boolean).join(' ')} role="group" aria-label={groupLabel}>
      {LANGUAGE_SWITCH_ORDER.map((optionLang) => {
        const option = LOCALE_OPTIONS[optionLang];
        const isActive = lang === optionLang;
        return (
          <button
            key={option.lang}
            type="button"
            className={['bi-btn', 'bi-btn--toggle', 'locale-switch-button', isActive ? 'bi-btn--active' : ''].join(' ')}
            onClick={() => onChange(option.lang)}
            aria-pressed={isActive}
            title={option.switchLabel}
          >
            <FlagIcon countryCode={option.countryCode} label={option.switchLabel} decorative size="md" />
            <span>{option.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
