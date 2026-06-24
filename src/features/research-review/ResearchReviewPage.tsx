import {
  startTransition,
  useDeferredValue,
  useMemo,
  useState,
  useEffect,
} from 'react';
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
  const [showAiReview, setShowAiReview] = useState(false);
  const [committeeDecision, setCommitteeDecision] = useState<
  'approved' | 'changes' | 'rejected' | null
>(null);
const [language, setLanguage] = useState<
  'en' | 'he' | 'ar' | 'ru'
>('en');
const translations = {
  en: {
    aiSummary: 'AI Generated Summary',
    approve: 'Approve',
    reject: 'Reject',
    requestChanges: 'Request Changes',
    reviewStatistics: "Review Statistics",
    liveOverview: "Live committee overview.",
    dashboard: "Dashboard",
  },

  he: {
    aiSummary: 'סיכום שנוצר על ידי AI',
    approve: 'אשר',
    reject: 'דחה',
    requestChanges: 'בקש שינויים',
    reviewStatistics: "סטטיסטיקות סקירה",
    liveOverview: "סקירת נתוני הוועדה בזמן אמת.",
    dashboard: "לוח מחוונים",
  },

  ar: {
    aiSummary: 'ملخص تم إنشاؤه بواسطة الذكاء الاصطناعي',
    approve: 'موافقة',
    reject: 'رفض',
    requestChanges: 'طلب تعديلات',
    reviewStatistics: "إحصائيات المراجعة",
    liveOverview: "نظرة عامة مباشرة للجنة",
    dashboard: "لوحة التحكم",
  },

  ru: {
    aiSummary: 'Сводка, созданная ИИ',
    approve: 'Одобрить',
    reject: 'Отклонить',
    requestChanges: 'Запросить изменения',
    reviewStatistics: "Статистика проверки",
    liveOverview: "Обзор работы комиссии в реальном времени",
    dashboard: "Панель управления",
  },
};
const [selectedHistoryEvent, setSelectedHistoryEvent] = useState<
  string | null
>(null);
const [comparisonProposal, setComparisonProposal] = useState<
  string | null
>(null);
const [aiQuestion, setAiQuestion] = useState('');
const [aiResponse, setAiResponse] = useState('');
useEffect(() => {
  setCommitteeDecision(null);
  setShowAiReview(false);
  setSelectedHistoryEvent(null);
}, [selectedProposalId]);
  const deferredQuery = useDeferredValue(query);

  const filteredProposals = useMemo(() => {
    if (!data) return [];
    const term = deferredQuery.trim().toLowerCase();
    if (!term) return data.proposals;
    return data.proposals.filter((proposal) => `${proposal.id} ${proposal.title.en} ${proposal.title.he}`.toLowerCase().includes(term));
  }, [data, deferredQuery]);

  if (loading || !data) return <LoadingDeck />;

  const selectedProposal = filteredProposals.find((item) => item.id === selectedProposalId) ?? filteredProposals[0];
  const askAI = () => {
  const question = aiQuestion.toLowerCase();

  if (question.includes('score')) {
    setAiResponse(
      `Proposal ${selectedProposal.id} received ${selectedProposal.score}/100 because it scored highly on evaluation criteria, implementation readiness and projected public impact.`
    );
  }

  else if (
    question.includes('risk') ||
    question.includes('risks')
  ) {
    setAiResponse(
      `Primary risks include implementation complexity, external data dependencies and committee validation requirements.`
    );
  }

  else if (
    question.includes('summary') ||
    question.includes('summarize')
  ) {
    setAiResponse(
      `This proposal demonstrates strong readiness, excellent evaluation scores and high expected public impact, making it a leading recommendation for committee approval.`
    );
  }

  else if (
    question.includes('recommendation')
  ) {
    setAiResponse(
      text(selectedProposal.recommendation ?? data.recommendation)
    );
  }

  else {
    setAiResponse(
      `AI Assistant: Based on the available research data, this proposal is suitable for further committee review and aligns with the highest ranked submissions.`
    );
  }
};
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
            <div style={{ marginTop: '1rem' }}>
  <span className="eyebrow">Language</span>

 <div
  style={{
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.5rem',
    flexWrap: 'wrap',
  }}
>
  <button
    className="tag-chip"
    onClick={() => setLanguage('en')}
  >
    English
  </button>

  <button
    className="tag-chip"
    onClick={() => setLanguage('he')}
  >
    Hebrew
  </button>

  <button
    className="tag-chip"
    onClick={() => setLanguage('ar')}
  >
    Arabic
  </button>

  <button
    className="tag-chip"
    onClick={() => setLanguage('ru')}
  >
    Russian
  </button>
</div>
</div>


<div
  style={{
    marginTop: '1rem',
    display: 'flex',
    gap: '0.75rem',
  }}
>
  <button
    type="button"
    className="tag-chip"
    onClick={() => setShowAiReview(!showAiReview)}
  >
    Generate AI Review
  </button>

  <button
  type="button"
  className="tag-chip"
  onClick={() => {
    const report = `
Research Proposal Report

Proposal ID: ${selectedProposal.id}

Title:
${text(selectedProposal.title)}

Score:
${selectedProposal.score}/100

Status:
${text(selectedProposal.statusLabel)}

Readiness:
${selectedProposal.readiness}

Recommendation:
${text(selectedProposal.recommendation ?? data.recommendation)}
    `;

    const blob = new Blob([report], {
      type: 'text/plain;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedProposal.id}-report.txt`;
    link.click();

    URL.revokeObjectURL(url);
  }}
>
  Export Report
</button>
</div>

{showAiReview && (
  <div className="callout-box" style={{ marginTop: '1rem' }}>
    <span className="eyebrow">
  {translations[language].aiSummary}
</span>

    <p>
      Proposal {selectedProposal.id} received a score of{' '}
      {selectedProposal.score}/100 based on evaluation criteria,
      implementation readiness and expected public impact.
    </p>

    <ul className="rail-list">
      <li>
        Recommendation:{' '}
        {text(selectedProposal.recommendation ?? data.recommendation)}
      </li>
      <li>Readiness: {selectedProposal.readiness}</li>
      <li>Status: {text(selectedProposal.statusLabel)}</li>
      <li>Overall Score: {selectedProposal.score}</li>
    </ul>
    <div
  style={{
    marginTop: '1rem',
    padding: '0.75rem',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px',
  }}
>
  <span className="eyebrow">
  {language === 'he'
    ? 'ציון אמון AI'
    : language === 'ar'
    ? 'درجة الثقة بالذكاء الاصطناعي'
    : language === 'ru'
    ? 'Оценка доверия ИИ'
    : 'AI Confidence Score'}
</span>

  <div
    className="progress-bar"
    style={{ marginTop: '0.5rem' }}
  >
    <span style={{ width: '95%' }} />
  </div>

  <p style={{ marginTop: '0.5rem' }}>
    95% confidence based on document completeness,
    evaluation consistency and historical proposal patterns.
  </p>
</div>
  </div>
)}

<div style={{ marginTop: '1rem' }}>
  <span className="eyebrow">Committee Decision</span>

  <div
    style={{
      display: 'flex',
      gap: '0.75rem',
      marginTop: '0.5rem',
      flexWrap: 'wrap',
    }}
  >
    <button
  type="button"
  className="tag-chip"
  onClick={() => setCommitteeDecision('approved')}
>
  {translations[language].approve}
</button>

    <button
  type="button"
  className="tag-chip"
  onClick={() => setCommitteeDecision('changes')}
>
  {translations[language].requestChanges}
</button>

    <button
  type="button"
  className="tag-chip"
  onClick={() => setCommitteeDecision('rejected')}
>
  {translations[language].reject}
</button>
  </div>
</div>

{committeeDecision && (
  <div className="callout-box" style={{ marginTop: '1rem' }}>
    <span className="eyebrow">
  {language === 'he'
    ? 'תוצאת ועדה'
    : language === 'ar'
    ? 'نتيجة اللجنة'
    : language === 'ru'
    ? 'Решение комиссии'
    : 'Committee Outcome'}
</span>

    {committeeDecision === 'approved' && (
      <p>
        Proposal {selectedProposal.id} has been approved for the next review
        phase.
      </p>
    )}

    {committeeDecision === 'changes' && (
      <p>
        Proposal {selectedProposal.id} requires revisions before proceeding.
      </p>
    )}

    {committeeDecision === 'rejected' && (
      <p>
        Proposal {selectedProposal.id} has been rejected based on committee
        evaluation.
      </p>
    )}
  </div>
)}
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
<WindowPanel
  title={lt('Proposal Comparison', 'השוואת הצעות')}
  subtitle={lt(
    'Quick comparison across all submitted proposals.',
    'השוואה מהירה בין כל ההצעות.'
  )}
  eyebrow={lt('Committee Insights', 'תובנות ועדה')}
  accent="success"
>
  <div className="stack-list">
    {data.proposals
      .slice()
      .sort((a, b) => b.score - a.score)
      .map((proposal) => (
        <button
  key={proposal.id}
  type="button"
  className="progress-card progress-card--tight"
  onClick={() => setComparisonProposal(proposal.id)}
  style={{
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    background: 'transparent',
    border: 'none',
  }}
>
          <div className="progress-card__header">
            <strong>{proposal.id}</strong>

            <StatusPill
              tone={
                proposal.score >= 88
                  ? 'success'
                  : proposal.score >= 80
                  ? 'accent'
                  : 'warning'
              }
              label={`${proposal.score}`}
            />
          </div>

          <div className="progress-card__footer">
            <strong>{text(proposal.title)}</strong>
            <br />
            {text(proposal.statusLabel)}
          </div>
        </button>
      ))}
  </div>
      {comparisonProposal && (
  <div
    className="callout-box"
    style={{ marginTop: '1rem' }}
  >
    <span className="eyebrow">
      Proposal Details
    </span>

    <p>
      Selected proposal:
      <strong> {comparisonProposal}</strong>
    </p>

    <ul className="rail-list">
      <li>
        AI has ranked this proposal based on evaluation
        criteria and implementation readiness.
      </li>

      <li>
        Expected public impact: High
      </li>

      <li>
        Estimated success probability: 92%
      </li>

      <li>
        Risk level: Low
      </li>
    </ul>
  </div>
)}
  <div className="callout-box" style={{ marginTop: '1rem' }}>
    <span className="eyebrow">
      {text(
        lt(
          'AI Ranking Insight',
          'תובנת דירוג מבוססת AI'
        )
      )}
    </span>

    <p>
      {text(
        lt(
          'PR-203 currently ranks highest based on evaluation score, readiness and projected public impact.',
          'PR-203 מדורגת ראשונה בהתבסס על ציון ההערכה, מוכנות והשפעה ציבורית צפויה.'
        )
      )}
    </p>
  </div>
</WindowPanel>
<WindowPanel
  className="page-grid__span-1"
  title={lt('Review Statistics', 'סטטיסטיקות סקירה')}
  subtitle={lt(
    'Live committee overview.',
    'סקירת נתוני הוועדה בזמן אמת.'
  )}
  eyebrow={lt('Dashboard', 'לוח מחוונים')}
  accent="info"
>
  <div className="stack-list">

    <article className="progress-card progress-card--tight">
      <div className="progress-card__header">
        <strong>Approved</strong>
        <span>18</span>
      </div>
    </article>

    <article className="progress-card progress-card--tight">
      <div className="progress-card__header">
        <strong>Pending</strong>
        <span>6</span>
      </div>
    </article>

    <article className="progress-card progress-card--tight">
      <div className="progress-card__header">
        <strong>Rejected</strong>
        <span>3</span>
      </div>
    </article>

  </div>

  <div className="callout-box" style={{ marginTop: '1rem' }}>
    <span className="eyebrow">AI Insight</span>

    <p>
      Proposal approval rate is currently
      <strong> 67% </strong>
      with an average AI recommendation score of
      <strong> 88/100</strong>.
    </p>
  </div>

</WindowPanel>
<WindowPanel
  className="page-grid__span-1"
  title={lt('Review History', 'היסטוריית סקירה')}
  subtitle={lt(
    'Tracks every review action for transparency.',
    'עוקב אחר כל פעולת סקירה לצורך שקיפות.'
  )}
  eyebrow={lt('Activity Log', 'יומן פעילות')}
  accent="accent"
>
  <div className="timeline-list">

    <button
      type="button"
      className="timeline-item"
      onClick={() => setSelectedHistoryEvent('submitted')}
    >
      <StatusPill
        tone="success"
        label={text(lt('Completed', 'הושלם'))}
      />
      <p>
        Proposal {selectedProposal.id} submitted for committee review.
      </p>
    </button>

    <button
      type="button"
      className="timeline-item"
      onClick={() => setSelectedHistoryEvent('analysis')}
    >
      <StatusPill
        tone="info"
        label={text(lt('AI Analysis', 'ניתוח AI'))}
      />
      <p>
        AI extracted proposal sections and generated evaluation scores.
      </p>
    </button>

    <button
      type="button"
      className="timeline-item"
      onClick={() => setSelectedHistoryEvent('viewed')}
    >
      <StatusPill
        tone="accent"
        label={text(lt('Committee Viewed', 'נצפה על ידי הוועדה'))}
      />
      <p>
        Committee members opened and reviewed the proposal.
      </p>
    </button>

    {committeeDecision && (
      <button
        type="button"
        className="timeline-item"
        onClick={() => setSelectedHistoryEvent('decision')}
      >
        <StatusPill
          tone="success"
          label={text(lt('Decision Recorded', 'החלטה נשמרה'))}
        />

        <p>
          Committee decision:
          {' '}
          {committeeDecision === 'approved'
            ? 'Approved'
            : committeeDecision === 'changes'
            ? 'Changes Requested'
            : 'Rejected'}
        </p>
      </button>
    )}

  </div>

  {selectedHistoryEvent && (
    <div
      className="callout-box"
      style={{ marginTop: '1rem' }}
    >
      <span className="eyebrow">
        Event Details
      </span>

      {selectedHistoryEvent === 'submitted' && (
        <p>
          Proposal {selectedProposal.id} was uploaded and
          entered into the review workflow. Initial validation
          checks were completed successfully.
        </p>
      )}

      {selectedHistoryEvent === 'analysis' && (
        <p>
          The AI extracted document sections, evaluated
          criteria, generated risk assessments and calculated
          the overall recommendation score.
        </p>
      )}

      {selectedHistoryEvent === 'viewed' && (
        <p>
          Committee members accessed the proposal,
          reviewed supporting documents and examined
          AI-generated recommendations.
        </p>
      )}

      {selectedHistoryEvent === 'decision' && (
        <p>
          The committee decision was recorded and
          added to the audit trail.
        </p>
      )}
    </div>
  )}
</WindowPanel>
<WindowPanel
  className="page-grid__span-1"
  title={lt('AI Research Assistant', 'עוזר מחקר AI')}
  subtitle={lt('Ask questions about the selected proposal.', 'שאל שאלות על ההצעה הנבחרת.')}
  eyebrow={lt('Interactive AI', 'AI אינטראקטיבי')}
  accent="success"
>

  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}
  >

    <input
      className="glass-input"
      value={aiQuestion}
      onChange={(e) => setAiQuestion(e.target.value)}
      placeholder="Ask AI anything..."
    />

    <button
      type="button"
      className="tag-chip"
      onClick={askAI}
    >
      Ask AI
    </button>

    {aiResponse && (

      <div className="callout-box">

        <span className="eyebrow">
          AI Response
        </span>

        <p>
          {aiResponse}
        </p>

      </div>

    )}

    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}
    >

      <button
        type="button"
        className="tag-chip"
        onClick={() => {
          setAiQuestion('summary');
          setTimeout(() => askAI(), 100);
        }}
      >
        Summarize
      </button>

      <button
        type="button"
        className="tag-chip"
        onClick={() => {
          setAiQuestion('risks');
          setTimeout(() => askAI(), 100);
        }}
      >
        Show Risks
      </button>

      <button
        type="button"
        className="tag-chip"
        onClick={() => {
          setAiQuestion('score');
          setTimeout(() => askAI(), 100);
        }}
      >
        Explain Score
      </button>

      <button
        type="button"
        className="tag-chip"
        onClick={() => {
          setAiQuestion('recommendation');
          setTimeout(() => askAI(), 100);
        }}
      >
        Recommendation
      </button>

    </div>

  </div>

</WindowPanel>
      </div>
    </div>
  );
}
