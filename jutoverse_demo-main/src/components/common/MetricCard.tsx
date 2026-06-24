import type { Metric } from '../../api/contracts';
import { useI18n } from '../../i18n/I18nProvider';
import { Sparkline } from './Sparkline';
import { StatusPill } from './StatusPill';

type MetricCardProps = {
  metric: Metric;
};

export function MetricCard({ metric }: MetricCardProps) {
  const { text } = useI18n();

  return (
    <article className={['metric-card', `metric-card--${metric.tone}`].join(' ')}>
      <div className="metric-card__header">
        <p className="metric-card__label">{text(metric.label)}</p>
        <StatusPill tone={metric.tone} label={metric.delta} />
      </div>
      <div className="metric-card__value-row">
        <strong className="metric-card__value">{metric.value}</strong>
        <div className="metric-card__spark">
          <Sparkline points={metric.points} />
        </div>
      </div>
      <p className="metric-card__narrative">{text(metric.narrative)}</p>
    </article>
  );
}
