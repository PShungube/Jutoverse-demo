import { useState } from 'react';
import { demoAdapter } from '../../api/adapters/demoAdapter';
import { lt } from '../../api/contracts';
import { LoadingDeck } from '../../components/common/LoadingDeck';
import { MetricCard } from '../../components/common/MetricCard';
import { StatusPill } from '../../components/common/StatusPill';
import { WindowPanel } from '../../components/common/WindowPanel';
import { useMockResource } from '../../hooks/useMockResource';
import { useI18n } from '../../i18n/I18nProvider';

export function CitizenServicesPage() {
  const { data, loading } = useMockResource(demoAdapter.getCitizenServicesSnapshot);
  const { text } = useI18n();
  const [selectedCaseId, setSelectedCaseId] = useState('CS-1284');

  if (loading || !data) return <LoadingDeck />;

  const selectedCase = data.cases.find((item) => item.id === selectedCaseId) ?? data.cases[0];

  return (
    <div className="page-stack">
      <div className="metric-grid">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="page-grid page-grid--citizen">
        <WindowPanel className="page-grid__span-2" title={lt('Citizen request queue', 'תור בקשות אזרחים')} subtitle={lt('Request intake, portal status, and assisted service paths converge here.', 'קליטת בקשות, סטטוס פורטל ומסלולי שירות מסייע מתכנסים כאן.')} eyebrow={lt('Request Flow', 'זרימת בקשות')} accent="accent">
          <div className="record-list record-list--compact">
            {data.cases.map((item) => (
              <button key={item.id} type="button" className={['record-row', item.id === selectedCase.id ? 'record-row--active' : ''].join(' ')} onClick={() => setSelectedCaseId(item.id)}>
                <div className="record-row__top">
                  <strong>{item.id}</strong>
                  <StatusPill tone={item.progress > 80 ? 'success' : item.progress > 60 ? 'accent' : 'warning'} label={`${item.progress}%`} />
                </div>
                <strong className="record-row__title">{text(item.service)}</strong>
                <p>{text(item.statusLabel)}</p>
                <div className="tag-row">
                  <span className="tag-chip">{text(item.citizenTier)}</span>
                  <span className="tag-chip tag-chip--muted">{item.lastTouchpoint}</span>
                </div>
              </button>
            ))}
          </div>
        </WindowPanel>

        <WindowPanel title={lt('Selected case workspace', 'מרחב עבודה לתיק נבחר')} subtitle={lt('Demonstrates a secure, reviewable citizen-service flow without a backend.', 'מדגים זרימת שירות לאזרח מאובטחת וברת ביקורת ללא בקאנד.')} eyebrow={lt('Case Detail', 'פרטי תיק')} accent="info">
          <div className="detail-card">
            <div className="detail-card__hero">
              <div>
                <span className="eyebrow">{selectedCase.id}</span>
                <h3>{text(selectedCase.service)}</h3>
              </div>
              <StatusPill tone="info" label={`${selectedCase.progress}%`} />
            </div>
            <p>{text(selectedCase.waitingOn)}</p>
            <div className="progress-bar progress-bar--wide">
              <span style={{ width: `${selectedCase.progress}%` }} />
            </div>
          </div>
        </WindowPanel>

        <WindowPanel title={lt('Extracted document fields', 'שדות מסמכים שחולצו')} subtitle={lt('Field confidence is visible before any sensitive action proceeds.', 'ביטחון השדות גלוי לפני כל פעולה רגישה.')} eyebrow={lt('Document AI Mock', 'מוקאפ Document AI')} accent="warning">
          <div className="stack-list">
            {data.extractedFields.map((field) => (
              <article key={field.id} className="field-row">
                <div className="field-row__meta">
                  <strong>{text(field.label)}</strong>
                  <span>{field.value}</span>
                </div>
                <div className="progress-bar">
                  <span style={{ width: `${field.confidence}%` }} />
                </div>
              </article>
            ))}
          </div>
        </WindowPanel>

        <WindowPanel title={lt('Identity-assist ladder', 'סולם סיוע בזיהוי')} subtitle={lt('Human-safe fallback remains explicit at every stage.', 'גיבוי בטוח לאדם נשאר מפורש בכל שלב.')} eyebrow={lt('Verification', 'אימות')} accent="success">
          <div className="timeline-list">
            {data.verificationStages.map((stage) => (
              <article key={stage.id} className="timeline-item">
                <StatusPill tone={stage.status} label={text(stage.label)} />
                <p>{text(stage.detail)}</p>
              </article>
            ))}
          </div>
        </WindowPanel>

        <WindowPanel title={lt('After-hours self-service path', 'מסלול שירות עצמי מחוץ לשעות הפעילות')} subtitle={lt('A clear citizen-safe journey from upload to response.', 'מסע ברור ובטוח לאזרח מהעלאה ועד תגובה.')} eyebrow={lt('Portal Flow', 'זרימת פורטל')} accent="accent">
          <div className="timeline-list">
            {data.selfServiceTimeline.map((item) => (
              <article key={item.id} className="timeline-item">
                <StatusPill tone={item.status} label={text(item.label)} />
                <p>{text(item.detail)}</p>
              </article>
            ))}
          </div>
        </WindowPanel>
      </div>
    </div>
  );
}
