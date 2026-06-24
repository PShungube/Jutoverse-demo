import { startTransition, useDeferredValue, useMemo, useState } from 'react';
import { demoAdapter } from '../../api/adapters/demoAdapter';
import { lt } from '../../api/contracts';
import { LoadingDeck } from '../../components/common/LoadingDeck';
import { MetricCard } from '../../components/common/MetricCard';
import { StatusPill } from '../../components/common/StatusPill';
import { WindowPanel } from '../../components/common/WindowPanel';
import { useMockResource } from '../../hooks/useMockResource';
import { useI18n } from '../../i18n/I18nProvider';
import { AnalyticsDashboard } from '../../components/AnalyticsDashboard';

export function ServiceOperationsPage() {
  const { data, loading } = useMockResource(demoAdapter.getServiceOperationsSnapshot);
  const { text } = useI18n();
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('INT-4021');
  const deferredQuery = useDeferredValue(query);

  const filteredInteractions = useMemo(() => {
    if (!data) return [];
    const term = deferredQuery.trim().toLowerCase();
    if (!term) return data.interactions;
    return data.interactions.filter((interaction) => {
      const haystack = `${interaction.id} ${interaction.citizen} ${interaction.channel} ${interaction.topic.en} ${interaction.topic.he}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [data, deferredQuery]);

  const selectedInteraction = filteredInteractions.find((interaction) => interaction.id === selectedId) ?? filteredInteractions[0];

  if (loading || !data || !selectedInteraction) return <LoadingDeck />;

  return (
    <div className="page-stack">
      <div className="metric-grid">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="page-grid page-grid--operations">
        <WindowPanel
          className="page-grid__span-2"
          title={lt('Interaction monitor', 'מוניטור אינטראקציות')}
          subtitle={lt('Search, review, and route active interactions across channels.', 'חיפוש, סקירה וניתוב אינטראקציות פעילות בין ערוצים.')}
          eyebrow={lt('Live Queue', 'תור חי')}
          accent="accent"
        >
          <div className="toolbar-row">
            <input
              className="glass-input"
              type="search"
              value={query}
              onChange={(event) => {
                const next = event.target.value;
                startTransition(() => setQuery(next));
              }}
              placeholder={text(lt('Search by interaction, citizen, or topic', 'חפש לפי אינטראקציה, אזרח או נושא'))}
            />
            <StatusPill tone="info" label={text(lt('Semantic filters mocked', 'פילטרים סמנטיים במוקאפ'))} />
          </div>
          <div className="record-list">
            {filteredInteractions.map((interaction) => (
              <button
                key={interaction.id}
                type="button"
                className={['record-row', interaction.id === selectedInteraction.id ? 'record-row--active' : ''].join(' ')}
                onClick={() => setSelectedId(interaction.id)}
              >
                <div className="record-row__top">
                  <strong>{interaction.id}</strong>
                  <StatusPill tone={interaction.status} label={interaction.channel} />
                </div>
                <strong className="record-row__title">{text(interaction.topic)}</strong>
                <p>{text(interaction.summary)}</p>
                <div className="tag-row">
                  {interaction.flags.map((flag) => (
                    <span key={flag} className="tag-chip">
                      {flag}
                    </span>
                  ))}
                  <span className="tag-chip tag-chip--muted">{interaction.queueTime}</span>
                </div>
              </button>
            ))}
          </div>
        </WindowPanel>

        <WindowPanel
          title={lt('Selected interaction', 'אינטראקציה נבחרת')}
          subtitle={lt('The detail window is intentionally resizable, collapsible, and expandable.', 'חלון הפרטים בכוונה ניתן לשינוי גודל, כיווץ והרחבה.')}
          eyebrow={lt('Detail Surface', 'משטח פרטים')}
          accent={selectedInteraction.status}
          summary={<p>{selectedInteraction.id}</p>}
        >
          <div className="detail-card">
            <div className="detail-card__hero">
              <div>
                <span className="eyebrow">{selectedInteraction.citizen}</span>
                <h3>{text(selectedInteraction.topic)}</h3>
              </div>
              <StatusPill tone={selectedInteraction.status} label={`${selectedInteraction.sentiment}%`} />
            </div>
            <p>{text(selectedInteraction.summary)}</p>
            <div className="detail-stat">
              <div className="detail-stat__topline">
                <span>{text(lt('Sentiment recovery potential', 'פוטנציאל התאוששות סנטימנט'))}</span>
                <strong>{selectedInteraction.sentiment}%</strong>
              </div>
              <div className="progress-bar progress-bar--wide">
                <span style={{ width: `${selectedInteraction.sentiment}%` }} />
              </div>
            </div>
            <dl className="property-grid">
              <div>
                <dt>{text(lt('Channel', 'ערוץ'))}</dt>
                <dd>{selectedInteraction.channel}</dd>
              </div>
              <div>
                <dt>{text(lt('Queue time', 'זמן המתנה'))}</dt>
                <dd>{selectedInteraction.queueTime}</dd>
              </div>
              <div>
                <dt>{text(lt('Next step', 'שלב הבא'))}</dt>
                <dd>{text(selectedInteraction.nextStep)}</dd>
              </div>
              <div>
                <dt>{text(lt('Flags', 'דגלים'))}</dt>
                <dd>{selectedInteraction.flags.join(', ')}</dd>
              </div>
            </dl>
            <div className="callout-box">
              <span className="eyebrow">{text(lt('Recommended action', 'פעולה מומלצת'))}</span>
              <p>{text(selectedInteraction.nextStep)}</p>
            </div>
          </div>
        </WindowPanel>

        <WindowPanel title={lt('Anomaly radar', 'מכ״ם חריגות')} subtitle={lt('High-signal items surfaced for supervisors.', 'פריטים בעלי אות גבוה שמוצגים למפקחים.')} eyebrow={lt('Quality Control', 'בקרת איכות')} accent="warning">
          <div className="stack-list">
            {data.anomalies.map((anomaly) => (
              <article key={anomaly.id} className="signal-row">
                <div>
                  <div className="signal-row__topline">
                    <strong>{text(anomaly.title)}</strong>
                    <StatusPill tone={anomaly.severity} label={anomaly.source} />
                  </div>
                  <p>{text(anomaly.summary)}</p>
                </div>
                <span className="signal-age">{anomaly.age}</span>
              </article>
            ))}
          </div>
        </WindowPanel>

        <WindowPanel title={lt('Demand forecast', 'תחזית ביקוש')} subtitle={lt('Simple planning bands demonstrate workforce prediction intent.', 'רצועות תכנון פשוטות מדגימות את כוונת חיזוי כוח האדם.')} eyebrow={lt('Staffing Insights', 'תובנות כוח אדם')} accent="info">
          <div className="forecast-chart">
            {data.forecast.map((point) => (
              <div key={point.label} className="forecast-chart__bar">
                <div className="forecast-chart__track">
                  <span style={{ height: `${point.value}%` }} />
                </div>
                <strong>{point.label}</strong>
              </div>
            ))}
          </div>
        </WindowPanel>

        <WindowPanel title={lt('Inquiry taxonomy', 'טקסונומיית פניות')} subtitle={lt('Semantic categorization replaces brittle legacy buckets.', 'קטלוג סמנטי מחליף קטגוריות מורשת שבריריות.')} eyebrow={lt('Classification Mix', 'תמהיל סיווג')} accent="success">
          <div className="stack-list">
            {data.taxonomy.map((bucket) => (
              <article key={bucket.id} className="progress-card progress-card--tight">
                <div className="progress-card__header">
                  <strong>{text(bucket.label)}</strong>
                  <span className="progress-card__value">{bucket.share}%</span>
                </div>
                <div className="progress-bar">
                  <span style={{ width: `${bucket.share}%` }} />
                </div>
                <div className="progress-card__footer">{bucket.change}</div>
              </article>
            ))}
          </div>
        </WindowPanel>

        <WindowPanel
  className="page-grid__span-2"
  title={lt('AI Analytics Dashboard', 'לוח ניתוח AI')}
  subtitle={lt('Advanced operational intelligence layer', 'שכבת מודיעין תפעולי מתקדם')}
  eyebrow={lt('Analytics Layer', 'שכבת אנליטיקה')}
  accent="info"
>
  <AnalyticsDashboard data={data} />
</WindowPanel>
      </div>
    </div>
  );
}
