import { useI18n } from '../../i18n/I18nProvider';
import type { Tone } from '../../api/contracts';

type StatusPillProps = {
  tone: Tone;
  label: string;
};

export function StatusPill({ tone, label }: StatusPillProps) {
  const { text } = useI18n();

  return (
    <span className={['status-pill', `status-pill--${tone}`].join(' ')}>
      <span className="status-pill__dot" />
      <span>{label}</span>
      <span className="visually-hidden">{text({ en: 'Status indicator', he: 'מחוון סטטוס' })}</span>
    </span>
  );
}
