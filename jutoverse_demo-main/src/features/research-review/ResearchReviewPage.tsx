import { startTransition, useDeferredValue, useMemo, useState } from 'react';
import { demoAdapter } from '../../api/adapters/demoAdapter';
import { lt } from '../../api/contracts';
import { LoadingDeck } from '../../components/common/LoadingDeck';
import { MetricCard } from '../../components/common/MetricCard';
import { StatusPill } from '../../components/common/StatusPill';
import { WindowPanel } from '../../components/common/WindowPanel';
import { useMockResource } from '../../hooks/useMockResource';
import { useI18n } from '../../i18n/I18nProvider';

export function ResearchReviewPage() {
  const { data, loading } = useMockResource(demoAdapter.getResearchReviewSnapshot);
  const { text } = useI18n();
  const [query, setQuery] = useState('');
  const [selectedProposalId, setSelectedProposalId] = useState('PR-203');
  const deferredQuery = useDeferredValue(query);

  const filteredProposals = useMemo(() => {
    if (!data) return [];
    const term = deferredQuery.trim().toLowerCase();
    if (!term) return data.proposals;
    return data.proposals.filter((proposal) => `${proposal.id} ${proposal.title.en} ${proposal.title.he}`.toLowerCase().includes(term));
  }, [data, deferredQuery]);

  if (loading || !data) return <LoadingDeck />;

  const selectedProposal = filteredProposals.find((item) => item.id === selectedProposalId) ?? filteredProposals[0];

  if (!selectedProposal) return <LoadingDeck />;

  return (
    <div className="page-stack">
      <div className="metric-grid">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="page-grid page-grid--research">
        <WindowPanel className="page-grid__span-2" title={lt('Proposal queue', 'תור הצעות')} subtitle={lt('Queue, shortlist, and discussion candidates stay visible together.', 'התור, הרשימה הקצרה ומועמדי הדיון נשארים גלויים יחד.')} eyebrow={lt('Committee Intake', 'קליטת ועדה')} accent="accent">
          <div className="toolbar-row">
            <input
              className="glass-input"
              type="search"
              value={query}
              onChange={(event) => startTransition(() => setQuery(event.target.value))}
              placeholder={text(lt('Search proposals by title or ID', 'חפש הצעות לפי כותרת או מזהה'))}
            />
            <StatusPill tone="warning" label={text(lt('Advisory only', 'ייעוצי בלבד'))} />
          </div>
          <div className="record-list">
            {filteredProposals.map((proposal) => (
              <button key={proposal.id} type="button" className={['record-row', proposal.id === selectedProposal.id ? 'record-row--active' : ''].join(' ')} onClick={() => setSelectedProposalId(proposal.id)}>
                <div className="record-row__top">
                  <strong>{proposal.id}</strong>
                  <StatusPill tone={proposal.score >= 88 ? 'success' : proposal.score >= 80 ? 'accent' : 'warning'} label={`${proposal.score}`} />
                </div>
                <strong className="record-row__title">{text(proposal.title)}</strong>
                <p>{text(proposal.domain)}</p>
                <div className="tag-row">
                  <span className="tag-chip">{text(proposal.statusLabel)}</span>
                  <span className="tag-chip tag-chip--muted">{proposal.readiness}</span>
                </div>
              </button>
            ))}
          </div>
        </WindowPanel>

        <WindowPanel title={lt('Recommendation frame', 'מסגרת המלצה')} subtitle={lt('Recommendations remain preliminary and committee-owned.', 'ההמלצות נשארות ראשוניות ובבעלות הוועדה.')} eyebrow={lt('Selected Proposal', 'הצעה נבחרת')} accent="success">
          <div className="detail-card">
            <div className="detail-card__hero">
              <div>
                <span className="eyebrow">{selectedProposal.id}</span>
                <h3>{text(selectedProposal.title)}</h3>
              </div>
              <StatusPill tone="success" label={`${selectedProposal.score}`} />
            </div>
            <div className="tag-row">
              <span className="tag-chip">{text(selectedProposal.domain)}</span>
              <span className="tag-chip tag-chip--muted">{text(selectedProposal.statusLabel)}</span>
              <span className="tag-chip tag-chip--muted">{selectedProposal.readiness}</span>
            </div>
            <p>{text(selectedProposal.recommendation ?? data.recommendation)}</p>
            <div className="callout-box">
              <span className="eyebrow">{text(lt('Committee prompts', 'שאלות לוועדה'))}</span>
              <ul className="rail-list">
                <li>{text(lt('Confirm external data dependency readiness.', 'לאשר את מוכנות התלות בנתונים חיצוניים.'))}</li>
                <li>{text(lt('Validate pilot sequencing against ethics review windows.', 'לאמת את תזמון הפיילוט מול חלונות סקירה אתית.'))}</li>
              </ul>
            </div>
          </div>
        </WindowPanel>

        <WindowPanel title={lt('Criteria scores', 'ציוני קריטריונים')} subtitle={lt('The review surface shows explicit rationale, not opaque scoring.', 'משטח הסקירה מציג נימוקים מפורשים ולא דירוג אטום.')} eyebrow={lt('Evaluation', 'הערכה')} accent="info">
          <div className="stack-list">
            {(selectedProposal.criteria ?? data.criteria).map((criterion) => (
              <article key={criterion.id} className="progress-card progress-card--tight">
                <div className="progress-card__header">
                  <strong>{text(criterion.label)}</strong>
                  <span className="progress-card__value">{criterion.score}</span>
                </div>
                <div className="progress-bar">
                  <span style={{ width: `${criterion.score}%` }} />
                </div>
                <div className="progress-card__footer">{text(criterion.rationale)}</div>
              </article>
            ))}
          </div>
        </WindowPanel>

        <WindowPanel title={lt('Strengths and risks', 'חוזקות וסיכונים')} subtitle={lt('The committee gets a readable brief, not raw document dump.', 'הוועדה מקבלת תדריך קריא ולא הצפת מסמכים גולמיים.')} eyebrow={lt('Review Notes', 'הערות סקירה')} accent="warning">
          <div className="dual-list">
            <div>
              <h3>{text(lt('Strengths', 'חוזקות'))}</h3>
              <ul className="rail-list">
                {(selectedProposal.strengths ?? data.strengths).map((item, index) => (
                  <li key={index}>{text(item)}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{text(lt('Risks', 'סיכונים'))}</h3>
              <ul className="rail-list">
                {(selectedProposal.risks ?? data.risks).map((item, index) => (
                  <li key={index}>{text(item)}</li>
                ))}
              </ul>
            </div>
          </div>
        </WindowPanel>

        <WindowPanel title={lt('Audit trail', 'שביל ביקורת')} subtitle={lt('Every recommendation remains explainable and review-safe.', 'כל המלצה נשארת ברת הסבר ובטוחה לסקירה.')} eyebrow={lt('Traceability', 'עקיבות')} accent="accent">
          <div className="timeline-list">
            {(selectedProposal.auditTrail ?? data.auditTrail).map((item) => (
              <article key={item.id} className="timeline-item">
                <StatusPill tone={item.status} label={text(item.label)} />
                <p>{text(item.detail)}</p>
              </article>
            ))}
          </div>
        </WindowPanel>

      <WindowPanel
  title={lt('Analysis Pipeline', 'צינור ניתוח')}
  subtitle={lt(
    'Shows how the AI processed the proposal.',
    'מציג כיצד הבינה המלאכותית עיבדה את ההצעה.'
  )}
  eyebrow={lt('AI Processing', 'עיבוד AI')}
  accent="info"
>
  <div className="stack-list">
    <article className="progress-card progress-card--tight">
      <div className="progress-card__header">
        <strong>{text(lt('Document Uploaded', 'מסמך הועלה'))}</strong>
        <StatusPill tone="success" label={text(lt('Complete', 'הושלם'))} />
      </div>
    </article>

    <article className="progress-card progress-card--tight">
      <div className="progress-card__header">
        <strong>{text(lt('Sections Extracted', 'חלקים חולצו'))}</strong>
        <StatusPill tone="success" label={text(lt('Complete', 'הושלם'))} />
      </div>
    </article>

    <article className="progress-card progress-card--tight">
      <div className="progress-card__header">
        <strong>{text(lt('Criteria Evaluated', 'קריטריונים הוערכו'))}</strong>
        <StatusPill tone="success" label={text(lt('Complete', 'הושלם'))} />
      </div>
    </article>

    <article className="progress-card progress-card--tight">
      <div className="progress-card__header">
        <strong>{text(lt('Recommendation Generated', 'המלצה הופקה'))}</strong>
        <StatusPill tone="success" label={text(lt('Complete', 'הושלם'))} />
      </div>
    </article>
  </div>
</WindowPanel>
      </div>
    </div>
  );
}
