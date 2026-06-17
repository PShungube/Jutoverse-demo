import { Expand, Minimize2, PanelTopClose, PanelTopOpen } from 'lucide-react';
import { useEffect, useEffectEvent, useId, useRef, useState, type ReactNode } from 'react';
import { lt, type LocalizedText, type Tone } from '../../api/contracts';
import { useI18n } from '../../i18n/I18nProvider';

type WindowPanelProps = {
  title: LocalizedText;
  eyebrow?: LocalizedText;
  subtitle?: LocalizedText;
  accent?: Tone;
  summary?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  defaultCollapsed?: boolean;
  className?: string;
};

export function WindowPanel({
  title,
  eyebrow,
  subtitle,
  accent = 'accent',
  summary,
  children,
  footer,
  defaultCollapsed = false,
  className = '',
}: WindowPanelProps) {
  const { text } = useI18n();
  const panelId = useId();
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleKeydown = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === 'Escape') setExpanded(false);
  });

  useEffect(() => {
    if (!expanded) return undefined;

    ref.current?.focus();
    const handler = (event: KeyboardEvent) => handleKeydown(event);
    window.addEventListener('keydown', handler);
    document.body.classList.add('panel-expanded-open');

    return () => {
      window.removeEventListener('keydown', handler);
      document.body.classList.remove('panel-expanded-open');
    };
  }, [expanded]);

  return (
    <>
      {expanded && <div className="window-panel__overlay" onClick={() => setExpanded(false)} aria-hidden="true" />}
      <section
        ref={ref}
        className={['window-panel', `window-panel--${accent}`, expanded ? 'window-panel--expanded' : '', collapsed ? 'window-panel--collapsed' : '', className].join(' ')}
        aria-labelledby={`${panelId}-title`}
        tabIndex={expanded ? -1 : undefined}
      >
        <header className="window-panel__header">
          <div className="window-panel__title-block">
            {eyebrow ? <span className="window-panel__eyebrow">{text(eyebrow)}</span> : null}
            <h2 id={`${panelId}-title`} className="window-panel__title">
              {text(title)}
            </h2>
            {subtitle ? <p className="window-panel__subtitle">{text(subtitle)}</p> : null}
          </div>
          <div className="window-panel__actions">
            <button
              type="button"
              className="icon-button"
              onClick={() => setCollapsed((current) => !current)}
              aria-expanded={!collapsed}
              aria-controls={`${panelId}-body`}
              title={text(collapsed ? lt('Open panel', 'פתח חלון') : lt('Collapse panel', 'כווץ חלון'))}
            >
              {collapsed ? <PanelTopOpen size={16} /> : <PanelTopClose size={16} />}
            </button>
            <button
              type="button"
              className="icon-button"
              onClick={() => setExpanded((current) => !current)}
              aria-pressed={expanded}
              title={text(expanded ? lt('Shrink panel', 'צמצם חלון') : lt('Expand panel', 'הרחב חלון'))}
            >
              {expanded ? <Minimize2 size={16} /> : <Expand size={16} />}
            </button>
          </div>
        </header>
        {summary && collapsed ? <div className="window-panel__summary">{summary}</div> : null}
        {!collapsed ? (
          <div id={`${panelId}-body`} className="window-panel__body">
            {children}
          </div>
        ) : null}
        {!collapsed && footer ? <footer className="window-panel__footer">{footer}</footer> : null}
      </section>
    </>
  );
}
