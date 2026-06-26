import { useState } from 'react';

import { CloudIcon } from '../../components/common/CloudIcon';
import { LoadingDeck } from '../../components/common/LoadingDeck';
import { MetricCard } from '../../components/common/MetricCard';
import { StatusPill } from '../../components/common/StatusPill';
import { WindowPanel } from '../../components/common/WindowPanel';
import { useMockResource } from '../../hooks/useMockResource';
import { demoAdapter } from '../../api/adapters/demoAdapter';
import { lt } from '../../api/contracts';
import { useI18n } from '../../i18n/I18nProvider';

export function OverviewPage() {
  const { data, loading } = useMockResource(demoAdapter.getOverviewSnapshot);
  const { text } = useI18n();

  const [selectedAlert, setSelectedAlert] = useState<any | null>(null);

  if (loading || !data) return <LoadingDeck />;

  return (
    <div className="page-stack">
      <section className="feature-banner">
        <div>
          <span className="eyebrow">{text(lt('Program Narrative', 'נרטיב התוכנית'))}</span>
          <h2>{text(data.missionTitle)}</h2>
          <p>{text(data.missionNarrative)}</p>
        </div>

        <div className="feature-banner__chips">
          <StatusPill tone="accent" label={text(lt('GCP-first', 'GCP-first'))} />
          <StatusPill tone="success" label={text(lt('React + TypeScript', 'React + TypeScript'))} />
          <StatusPill tone="warning" label={text(lt('Human oversight on', 'פיקוח אנושי פעיל'))} />
        </div>
      </section>

      <div className="metric-grid">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="page-grid page-grid--overview">

        {/* ACTIVE SIGNALS */}
        <WindowPanel
          title={lt('Active signals', 'אותות פעילים')}
          subtitle={lt('Program-level alerts across all four workstreams.', 'התראות ברמת התוכנית בכל ארבעת זרמי העבודה.')}
          eyebrow={lt('Operations Pulse', 'דופק תפעולי')}
          accent="warning"
        >
          <div className="stack-list">
            {data.alerts.map((alert) => (
              <article
                key={alert.id}
                className="signal-row"
                onClick={() => setSelectedAlert(alert)}
                style={{ cursor: 'pointer' }}
              >
                <div>
                  <div className="signal-row__topline">
                    <strong>{text(alert.title)}</strong>
                    <StatusPill tone={alert.severity} label={alert.source} />
                  </div>
                  <p>{text(alert.summary)}</p>
                </div>
                <span className="signal-age">{alert.age}</span>
              </article>
            ))}
          </div>
        </WindowPanel>

        {/* AI REASONING PANEL (CLICK-DRIVEN) */}
        {selectedAlert && (
          <WindowPanel
            title={lt('AI Reasoning Panel', 'פאנל הסבר AI')}
            subtitle={lt('Explainability trace for selected system signal', 'מעקב הסבר לאות מערכת שנבחר')}
            eyebrow={lt('Audit & Explainability', 'ביקורת והסבריות')}
            accent="info"
          >
            <div className="stack-list">

              <div>
                <strong>{text(selectedAlert.title)}</strong>
                <p>{text(selectedAlert.summary)}</p>
              </div>

              <div>
                <StatusPill tone={selectedAlert.severity} label="Severity" />
                <StatusPill tone="accent" label={selectedAlert.source} />
              </div>

              <div className="reasoning-box">
                <h4>Why this was triggered</h4>
                <p>
                  This alert was generated from multi-channel telemetry detecting a pattern
                  deviation in service interaction flow across voice, digital, and messaging channels.
                </p>
              </div>

              <div className="reasoning-box">
  <h4>AI Confidence</h4>

  <div className="confidence-panel">
    <div className="confidence-header">
      <span>Confidence Score</span>
      <strong>82%</strong>
    </div>

    <div className="confidence-bar">
      <span style={{ width: '82%' }} />
    </div>

    <p>
      Signal confidence exceeds operational review threshold and
      is recommended for analyst validation.
    </p>
  </div>
</div>

              <div className="reasoning-box">
                <h4>Key Signals</h4>
                <ul>
                  <li>Channel anomaly detected</li>
                  <li>Sentiment deviation spike</li>
                  <li>Workflow delay threshold exceeded</li>
                </ul>
              </div>

              <button
                onClick={() => setSelectedAlert(null)}
                style={{
                  marginTop: '10px',
                  padding: '6px 12px',
                  cursor: 'pointer'
                }}
              >
                Close Panel
              </button>

            </div>
          </WindowPanel>
        )}

        {/* WORKSTREAMS */}
        <WindowPanel
          title={lt('Workstream readiness', 'מוכנות זרמי העבודה')}
          subtitle={lt('Each RFI work area represented as a live UI surface.', 'כל אזור RFI מיוצג כמשטח UI חי.')}
          eyebrow={lt('Feature Coverage', 'כיסוי יכולות')}
          accent="accent"
        >
          <div className="stack-list">
            {data.workstreams.map((stream) => (
              <article key={stream.id} className="progress-card">
                <div className="progress-card__header">
                  <div>
                    <strong>{text(stream.title)}</strong>
                    <p>{text(stream.narrative)}</p>
                  </div>
                  <span className="progress-card__value">{stream.progress}%</span>
                </div>
                <div className="progress-bar">
                  <span style={{ width: `${stream.progress}%` }} />
                </div>
                <div className="progress-card__footer">
                  {text(stream.progressLabel)}
                </div>
              </article>
            ))}
          </div>
        </WindowPanel>

        {/* CLOUD CAPABILITIES */}
        <WindowPanel
          title={lt('Cloud capability map', 'מפת יכולות ענן')}
          subtitle={lt('Visual language aligned to the GCP-native delivery contract.', 'שפה ויזואלית המיושרת לחוזה המסירה ה-GCP-native.')}
          eyebrow={lt('Platform Story', 'סיפור פלטפורמה')}
          accent="info"
        >
          <div className="capability-grid">
            {data.cloudCapabilities.map((capability) => (
              <article key={capability.id} className="capability-card">
                <CloudIcon name={capability.icon} label={text(capability.title)} />
                <div>
                  <strong>{text(capability.title)}</strong>
                  <p>{text(capability.detail)}</p>
                </div>
              </article>
            ))}
          </div>
        </WindowPanel>

        {/* MILESTONES */}
        <WindowPanel
          title={lt('Execution milestones', 'אבני דרך לביצוע')}
          subtitle={lt('A clear line from assumptions to live UI outcomes.', 'קו ברור מהנחות עבודה אל תוצרי UI חיים.')}
          eyebrow={lt('Delivery Thread', 'חוט אספקה')}
          accent="success"
        >
          <div className="timeline-list">
            {data.milestones.map((milestone) => (
              <article key={milestone.id} className="timeline-item">
                <StatusPill tone={milestone.status} label={text(milestone.label)} />
                <p>{text(milestone.detail)}</p>
              </article>
            ))}
          </div>
        </WindowPanel>

      </div>
    </div>
  );

}

