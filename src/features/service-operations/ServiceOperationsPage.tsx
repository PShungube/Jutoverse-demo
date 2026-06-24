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
  const [selectedInteraction, setSelectedInteraction] = useState<any | null>(null);

  const deferredQuery = useDeferredValue(query);

  const filteredInteractions = useMemo(() => {
    if (!data) return [];
    const term = deferredQuery.trim().toLowerCase();

    if (!term) return data.interactions;

    return data.interactions.filter((interaction) => {
      const haystack =
        `${interaction.id} ${interaction.citizen} ${interaction.channel} ${interaction.topic.en} ${interaction.topic.he}`.toLowerCase();

      return haystack.includes(term);
    });
  }, [data, deferredQuery]);

  const activeInteraction =
    selectedInteraction ??
    filteredInteractions.find((i) => i.id === selectedId) ??
    filteredInteractions[0];

  if (loading || !data || !activeInteraction) return <LoadingDeck />;

  return (
    <div className="page-stack">
      <div className="metric-grid">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="page-grid page-grid--operations">

        {/* LEFT: INTERACTIONS */}
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
                className={[
                  'record-row',
                  interaction.id === activeInteraction.id ? 'record-row--active' : ''
                ].join(' ')}
                onClick={() => {
                  setSelectedId(interaction.id);
                  setSelectedInteraction(null);
                }}
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

        {/* RIGHT: AI REASONING PANEL */}
        <WindowPanel
          title={lt('AI Reasoning Panel', 'פאנל הסבר AI')}
          subtitle={lt('Explainability trace for selected interaction', 'מעקב הסבר לאינטראקציה שנבחרה')}
          eyebrow={lt('Audit & Explainability', 'ביקורת והסבריות')}
          accent="info"
          summary={<p>{activeInteraction.id}</p>}
        >
          <div className="stack-list">

            <div>
              <strong>{activeInteraction.id}</strong>
              <p>{text(activeInteraction.summary)}</p>
            </div>

            <div>
              <StatusPill tone={activeInteraction.status} label="Status" />
              <StatusPill tone="accent" label={activeInteraction.channel} />
            </div>

            {/* CONFIDENCE */}
            <div className="reasoning-box">
              <h4>AI Confidence</h4>

              <div className="confidence-panel">
                <div className="confidence-header">
                  <span>Confidence Score</span>
                  <strong>{activeInteraction.sentiment}%</strong>
                </div>

                <div className="confidence-bar">
                  <span style={{ width: `${activeInteraction.sentiment}%` }} />
                </div>

                <p>
                  Model confidence derived from sentiment trajectory, channel consistency,
                  and historical resolution patterns.
                </p>
              </div>
            </div>

            {/* WHY TRIGGERED */}
            <div className="reasoning-box">
              <h4>Why this was triggered</h4>
              <p>
                Multi-channel anomaly detection flagged deviation in response timing,
                sentiment shift, and queue delay thresholds.
              </p>
            </div>

            {/* KEY SIGNALS */}
            <div className="reasoning-box">
              <h4>Key Signals</h4>
              <ul>
                <li>Sentiment drop detected</li>
                <li>Queue delay exceeded baseline</li>
                <li>Channel response inconsistency</li>
              </ul>
            </div>

            {/* RECOMMENDATION */}
            <div className="reasoning-box">
              <h4>Recommended Action</h4>
              <p>{text(activeInteraction.nextStep)}</p>
            </div>

            <button
              onClick={() => setSelectedInteraction(null)}
              style={{
                marginTop: '10px',
                padding: '8px 12px',
                cursor: 'pointer'
              }}
            >
              Clear Selection
            </button>

          </div>
        </WindowPanel>

        {/* OTHER PANELS (UNCHANGED) */}

        <WindowPanel
          title={lt('Anomaly radar', 'מכ״ם חריגות')}
          subtitle={lt('High-signal items surfaced for supervisors.', 'פריטים בעלי אות גבוה שמוצגים למפקחים.')}
          eyebrow={lt('Quality Control', 'בקרת איכות')}
          accent="warning"
        >
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

        <WindowPanel
          title={lt('Demand forecast', 'תחזית ביקוש')}
          subtitle={lt('Simple planning bands demonstrate workforce prediction intent.', 'רצועות תכנון פשוטות מדגימות את כוונת חיזוי כוח האדם.')}
          eyebrow={lt('Staffing Insights', 'תובנות כוח אדם')}
          accent="info"
        >
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

        <WindowPanel
          title={lt('Inquiry taxonomy', 'טקסונומיית פניות')}
          subtitle={lt('Semantic categorization replaces brittle legacy buckets.', 'קטלוג סמנטי מחליף קטגוריות מורשת שבריריות.')}
          eyebrow={lt('Classification Mix', 'תמהיל סיווג')}
          accent="success"
        >
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