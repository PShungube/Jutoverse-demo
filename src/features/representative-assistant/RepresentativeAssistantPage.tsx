import { FeedbackControls } from './components/FeedbackControls';
import { demoAdapter } from '../../api/adapters/demoAdapter';
import { lt } from '../../api/contracts';
import { LoadingDeck } from '../../components/common/LoadingDeck';
import { MetricCard } from '../../components/common/MetricCard';
import { StatusPill } from '../../components/common/StatusPill';
import { WindowPanel } from '../../components/common/WindowPanel';
import { useMockResource } from '../../hooks/useMockResource';
import { useI18n } from '../../i18n/I18nProvider';

export function RepresentativeAssistantPage() {
  const { data, loading } = useMockResource(demoAdapter.getAssistantSnapshot);
  const { text } = useI18n();

  if (loading || !data) return <LoadingDeck />;

  return (
    <div className="page-stack">
      <div className="metric-grid">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="page-grid page-grid--assistant">
        <WindowPanel className="page-grid__span-2" title={lt('Guided conversation workspace', 'מרחב שיחה מונחה')} subtitle={lt('Grounded assistance with visible citations and escalation-safe language.', 'סיוע מבוסס מקורות עם ציטוטים גלויים ושפה בטוחה להסלמה.')} eyebrow={lt('Live Assist', 'סיוע חי')} accent="accent">
          <div className="assistant-layout">
            <div className="assistant-prompts">
              <span className="eyebrow">{text(lt('Suggested prompts', 'פרומפטים מוצעים'))}</span>
              <div className="tag-row">
                {data.suggestedPrompts.map((prompt, index) => (
                  <button key={index} type="button" className="tag-chip tag-chip--interactive">
                    {text(prompt)}
                  </button>
                ))}
              </div>
            </div>
            <div className="chat-thread">
              {data.exchanges.map((exchange) => (
                <article key={exchange.id} className={['chat-bubble', `chat-bubble--${exchange.speaker}`, exchange.emphasis ? `chat-bubble--${exchange.emphasis}` : ''].join(' ')}>
                  <span className="chat-bubble__speaker">{exchange.speaker === 'agent' ? text(lt('Representative', 'נציג')) : 'Assistant'}</span>
                  <p>{text(exchange.text)}</p>
                </article>
              ))}
              
              <FeedbackControls />
            </div>
          </div>
        </WindowPanel>

        <WindowPanel title={lt('Grounding sources', 'מקורות עיגון')} subtitle={lt('Every answer is backed by an approved source or escalation path.', 'כל תשובה נתמכת במקור מאושר או במסלול הסלמה.')} eyebrow={lt('Evidence', 'ראיות')} accent="success">
          <div className="stack-list">
            {data.citations.map((citation) => (
              <article key={citation.id} className="citation-card">
                <div className="signal-row__topline">
                  <strong>{citation.source}</strong>
                  <StatusPill tone="success" label={text(citation.title)} />
                </div>
                <p>{text(citation.excerpt)}</p>
              </article>
            ))}
          </div>
        </WindowPanel>

        <WindowPanel title={lt('Translation assist', 'סיוע תרגום')} subtitle={lt('Multilingual support is framed as a real-time co-pilot, not a hidden system.', 'התמיכה הרב-לשונית ממוסגרת כטייס משנה בזמן אמת ולא כמערכת נסתרת.')} eyebrow={lt('Language Layer', 'שכבת שפה')} accent="info">
          <div className="stack-list">
            {data.translations.map((item) => (
              <article key={item.id} className="translation-card">
                <div className="translation-card__meta">
                  <strong>
                    {item.sourceLanguage} → {item.targetLanguage}
                  </strong>
                  <StatusPill tone="info" label={text(lt('Live assist', 'סיוע חי'))} />
                </div>
                <p>{text(item.phrase)}</p>
                <p className="translation-card__output">{text(item.translated)}</p>
              </article>
            ))}
          </div>
        </WindowPanel>

        <WindowPanel title={lt('Live support signals', 'אותות תמיכה חיים')} subtitle={lt('Sentiment and translation risk can be surfaced alongside the answer.', 'ניתן להציג סנטימנט וסיכון תרגום לצד התשובה.')} eyebrow={lt('Operator Pulse', 'דופק מפעיל')} accent="warning">
          <div className="stack-list">
            {data.liveSignals.map((signal) => (
              <article key={signal.id} className="signal-row">
                <div>
                  <div className="signal-row__topline">
                    <strong>{text(signal.title)}</strong>
                    <StatusPill tone={signal.severity} label={signal.source} />
                  </div>
                  <p>{text(signal.summary)}</p>
                </div>
                <span className="signal-age">{signal.age}</span>
              </article>
            ))}
          </div>
        </WindowPanel>
      </div>
    </div>
  );
}
