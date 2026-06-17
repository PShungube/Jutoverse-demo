import { useI18n } from '../../i18n/I18nProvider';
import { useTheme } from '../../theme/ThemeProvider';
import { THEMES } from '../../theme/themeCatalog';

export function ThemeSwitcher() {
  const { text } = useI18n();
  const { themeId, setThemeId } = useTheme();

  return (
    <div className="theme-switcher" role="group" aria-label={text({ en: 'Theme switcher', he: 'מחליף ערכות נושא' })}>
      {THEMES.map((theme) => {
        const active = theme.id === themeId;
        return (
          <button
            key={theme.id}
            type="button"
            className={['theme-chip', active ? 'theme-chip--active' : ''].join(' ')}
            onClick={() => setThemeId(theme.id)}
            aria-pressed={active}
            title={text(theme.tagline)}
          >
            <span className="theme-chip__swatch" style={{ background: theme.preview.primary, boxShadow: `0 0 0 1px ${theme.preview.surface}` }} />
            <span className="theme-chip__label">{theme.shortName}</span>
          </button>
        );
      })}
    </div>
  );
}
