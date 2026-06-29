import React, { useState, useEffect } from 'react';

// ==========================================
// 1. TYPE DEFINITIONS FOR STRICT CHECKING
// ==========================================
interface Metric {
  id: string;
  title: string;
  value: string;
  change: string;
  tone: 'success' | 'accent' | 'warning' | 'info';
}

interface LocalizedString {
  en: string;
  he: string;
  [key: string]: string;
}

interface ExtractedField {
  id: string;
  label: LocalizedString;
  value: string;
  confidence: number;
}

interface VerificationStage {
  id: string;
  status: 'success' | 'accent' | 'warning' | 'info';
  label: LocalizedString;
  detail: LocalizedString;
}

interface TimelineItem {
  id: string;
  status: 'success' | 'accent' | 'warning' | 'info';
  label: LocalizedString;
  detail: LocalizedString;
}

interface CitizenCase {
  id: string;
  service: LocalizedString;
  statusLabel: LocalizedString;
  progress: number;
  citizenTier: LocalizedString;
  lastTouchpoint: string;
  waitingOn: LocalizedString;
  extractedFields: ExtractedField[];
  verificationStages: VerificationStage[];
  selfServiceTimeline: TimelineItem[];
}

interface SnapshotData {
  metrics: Metric[];
  cases: CitizenCase[];
}

interface WindowPanelProps {
  title: string;
  subtitle: string;
  eyebrow: string;
  accent: 'accent' | 'info' | 'warning' | 'success';
  children: React.ReactNode;
  className?: string;
}

// ==========================================
// 2. MOCK UTILITIES & LOCALIZATION
// ==========================================
const CURRENT_LANG: 'en' | 'he' = 'en';

export function lt(en: string, other: string): string {
  return CURRENT_LANG === 'en' ? en : other;
}

export function useI18n() {
  return {
    text: (val: LocalizedString | string | undefined): string => {
      if (!val) return '';
      if (typeof val === 'object') return val[CURRENT_LANG] || val['en'];
      return val;
    }
  };
}

export function useMockResource(fetchFn: () => SnapshotData) {
  const [data, setData] = useState<SnapshotData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(fetchFn());
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [fetchFn]);

  return { data, loading };
}

// ==========================================
// 3. REQUIREMENT-DRIVEN MOCK DATA
// ==========================================
const mockSnapshotData: SnapshotData = {
  metrics: [
    { id: 'm1', title: lt('Manual Handling Saved', 'חיסכון בטיפול ידני'), value: '42%', change: '+12% this week', tone: 'success' },
    { id: 'm2', title: lt('IVR Recognition Rate', 'שיעור זיהוי IVR'), value: '89.4%', change: '+5.1% Context-based', tone: 'accent' },
    { id: 'm3', title: lt('After-Hours Requests', 'בקשות מחוץ לשעות הפעילות'), value: '1,432', change: '24/7 Automated', tone: 'info' }
  ],
  cases: [
    {
      id: 'CS-1284',
      service: { en: 'Income Support Grant', he: 'מענק תמיכה בהכנסה' },
      statusLabel: { en: 'Awaiting Verification', he: 'ממתין לאימות' },
      progress: 65,
      citizenTier: { en: 'Tier 2 (Standard)', he: 'סיווג 2 (רגיל)' },
      lastTouchpoint: 'IVR System',
      waitingOn: { en: 'Reviewing cross-channel interaction context signals.', he: 'בחינת אותות הקשר של אינטראקציה בין ערוצים.' },
      extractedFields: [
        { id: 'f1', label: { en: 'National ID Number', he: 'מספר תעודת זהות' }, value: '987543210', confidence: 100 },
        { id: 'f2', label: { en: 'Reported Monthly Income', he: 'הכנסה חודשית מדווחת' }, value: '₪6,400', confidence: 100 },
        { id: 'f3', label: { en: 'Employer Verification Code', he: 'קוד אימות מעסיק' }, value: 'EMP-9921', confidence: 45 }
      ],
      verificationStages: [
        { id: 'v1', status: 'success', label: { en: 'IVR Behavioral Footprint', he: 'טביעת רגל התנהגותית IVR' }, detail: { en: 'Voice cadence and interaction speed verified against historical user profile.', he: 'קצב הדיבור ומהירות האינטראקציה אומתו מול פרופיל משתמש היסטורי.' } },
        { id: 'v2', status: 'accent', label: { en: 'Cross-Channel Context', he: 'הקשר רב-ערוצי' }, detail: { en: 'Portal login attempt matches current phone metadata.', he: 'ניסיון ההתחברות לפורטל תואם למטא-נתונים הנוכחיים של הטלפון.' } },
        { id: 'v3', status: 'warning', label: { en: 'Biometric Fallback Bypass', he: 'מעקף גיבוי ביומטרי' }, detail: { en: 'Non-biometric trust scoring logic active.', he: 'לוגיקת דירוג אמון לא ביומטרית פעילה.' } }
      ],
      selfServiceTimeline: [
        { id: 's1', status: 'success', label: { en: 'Secure Upload', he: 'העלאה מאובטחת' }, detail: { en: 'Form uploaded at 02:14 AM. Tokenized access active.', he: 'הטופס הועלה בשעה 02:14 לפנות בוקר. גישה עם אסימון פעילה.' } },
        { id: 's2', status: 'info', label: { en: 'Document AI Parsing', he: 'ניתוח בינה מלאכותית של המסמך' }, detail: { en: 'Automated entity extraction pipeline triggered safely.', he: 'צינור חילוץ ישויות אוטומטי הופעל בצורה מאובטחת.' } }
      ]
    },
    {
      id: 'CS-8831',
      service: { en: 'After-Hours Housing Subsidy', he: 'סבסוד דיור מחוץ לשעות הפעילות' },
      statusLabel: { en: 'Document AI Confirmed', he: 'בינה מלאכותית למסמכים אושרה' },
      progress: 92,
      citizenTier: { en: 'Tier 1 (Priority)', he: 'סיווג 1 (עדיפות)' },
      lastTouchpoint: 'Web Portal',
      waitingOn: { en: 'Form fields auto-validated. Final secure payment release pending.', he: 'שדות הטופס אומתו אוטומטית. ממתין לשחרור תשלום מאובטח סופי.' },
      extractedFields: [
        { id: 'f1', label: { en: 'Property Registry ID', he: 'מזהה רישום מקרקעין' }, value: 'PROP-7721-X', confidence: 100 },
        { id: 'f2', label: { en: 'Monthly Rental Amount', he: 'סכום שכירות חודשי' }, value: '₪4,200', confidence: 100 }
      ],
      verificationStages: [
        { id: 'v1', status: 'success', label: { en: 'Prior History Match', he: 'התאמת היסטוריה קודמת' }, detail: { en: 'Match confirmed with zero active friction flags.', he: 'ההתאמה אושרה ללא סימוני חיכוך פעילים.' } }
      ],
      selfServiceTimeline: [
        { id: 's1', status: 'success', label: { en: 'Late-Night Access Auth', he: 'אימות גישה בשעות הלילה המאוחרות' }, detail: { en: 'Validated via secondary interaction signal structure.', he: 'אומת באמצעות מבנה אות אינטראקציה משני.' } },
        { id: 's2', status: 'success', label: { en: 'Auto-Validated Field Check', he: 'בדיקת שדות מאומתת אוטומטית' }, detail: { en: 'Manual handling bypass threshold achieved successfully.', he: 'סף מעקף הטיפול הידני הושג בהצלחה.' } }
      ]
    }
  ]
};

const demoAdapter = {
  getCitizenServicesSnapshot: () => mockSnapshotData
};

// ==========================================
// 4. UI COMPONENTS WITH TYPED PROPS
// ==========================================
function LoadingDeck() {
  return <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Simulating Secure AI Service Layer Response...</div>;
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', minWidth: '200px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
      <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>{metric.title}</span>
      <h2 style={{ margin: '0.5rem 0 0.25rem 0', fontSize: '1.75rem', color: '#0f172a', fontWeight: '700' }}>{metric.value}</h2>
      <small style={{ color: metric.tone === 'success' ? '#16a34a' : '#0284c7', fontWeight: '600' }}>{metric.change}</small>
    </div>
  );
}

function StatusPill({ tone, label }: { tone: 'success' | 'accent' | 'warning' | 'info'; label: string }) {
  const colors = {
    success: { bg: '#d1fae5', text: '#065f46' },
    accent: { bg: '#e0f2fe', text: '#0369a1' },
    warning: { bg: '#ffedd5', text: '#9a3412' },
    info: { bg: '#f3e8ff', text: '#6b21a8' }
  };
  const match = colors[tone] || colors.info;
  return (
    <span style={{ backgroundColor: match.bg, color: match.text, padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>
      {label}
    </span>
  );
}

function ExtractedFieldRow({ field, text }: { field: any; text: (val: any) => string }) {
  const [currentConfidence, setCurrentConfidence] = useState(field.confidence);

  return (
    <article className="field-row" style={{ background: '#fffdf5', border: '1px solid #fef3c7', padding: '0.75rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
      <div className="field-row__meta" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        <strong>{text(field.label)}</strong>
        <span style={{ fontFamily: 'monospace', color: '#b45309', fontWeight: '600' }}>{field.value}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div className="progress-bar" style={{ background: '#e2e8f0', height: '6px', borderRadius: '3px', flexGrow: 1, overflow: 'hidden' }}>
          <span style={{ display: 'block', height: '100%', background: currentConfidence > 80 ? '#10b981' : '#ef4444', width: `${currentConfidence}%`, transition: 'width 0.3s ease' }} />
        </div>
        <small style={{ fontSize: '0.75rem', color: '#78350f', fontWeight: 'bold' }}>{currentConfidence}%</small>
      </div>

      {currentConfidence < 100 && (
        <button 
          type="button"
          onClick={() => setCurrentConfidence(100)}
          style={{ 
            marginTop: '0.5rem', 
            background: '#fff', 
            border: '1px solid #d97706', 
            color: '#d97706', 
            padding: '4px 8px', 
            borderRadius: '4px', 
            fontSize: '0.75rem', 
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          ✓ Verify & Accept Field
        </button>
      )}
    </article>
  );
}

function WindowPanel({ title, subtitle, eyebrow, accent, children, className }: WindowPanelProps) {
  const accentColors = { accent: '#0284c7', info: '#6366f1', warning: '#f59e0b', success: '#10b981' };
  return (
    <div className={className} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderTop: `4px solid ${accentColors[accent] || '#ccc'}` }}>
      <span style={{ textTransform: 'uppercase', fontSize: '0.7rem', color: '#64748b', fontWeight: 'bold', letterSpacing: '0.05em' }}>{eyebrow}</span>
      <h3 style={{ margin: '0.25rem 0 0.1rem 0', fontSize: '1.1rem', color: '#0f172a', fontWeight: '600' }}>{title}</h3>
      <p style={{ margin: '0 0 1rem 0', fontSize: '0.8rem', color: '#64748b' }}>{subtitle}</p>
      <hr style={{ border: 'none', borderBottom: '1px solid #f1f5f9', marginBottom: '1rem' }} />
      {children}
    </div>
  );
}

// ==========================================
// 5. MAIN PAGE COMPONENT
// ==========================================
export function CitizenServicesPage() {
  const { data, loading } = useMockResource(demoAdapter.getCitizenServicesSnapshot);
  const { text } = useI18n();
  const [selectedCaseId, setSelectedCaseId] = useState<string>('CS-1284');

  // Interactive UI Simulation States
  const [approvedCaseIds, setApprovedCaseIds] = useState<string[]>([]);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceInput, setVoiceInput] = useState<string>('');
  const [voiceOutput, setVoiceOutput] = useState<string>('');

  if (loading || !data) return <LoadingDeck />;
  
  const selectedCaseSummary = data.cases.find((item) => item.id === selectedCaseId) ?? data.cases[0];
  const isCurrentlyApproved = approvedCaseIds.includes(selectedCaseSummary.id);

  const handleApproveCase = (id: string) => {
    if (!approvedCaseIds.includes(id)) {
      setApprovedCaseIds([...approvedCaseIds, id]);
    }
  };

  const handleVoiceTranslationDemo = () => {
    const SpeechAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    setIsListening(true);
    setVoiceInput(lt('Listening to microphone entry...', 'מאזין לקלט קולי...'));
    setVoiceOutput('...');

    if (!SpeechAPI) {
      setTimeout(() => {
        setIsListening(false);
        setVoiceInput(lt('"Inquiring about my income support grant status criteria."', '"בירור לגבי קריטריונים לזכאות למענק תמיכה בהכנסה."'));
        setVoiceOutput(lt('Translation Match -> Request forwarded safely into local AWS VPC environment.', 'מיפוי מערכת אוטומטי -> הבקשה הועברה בצורה מאובטחת לסביבת ענן מקומית'));
      }, 2000);
      return;
    }

    const recognition = new SpeechAPI();
    recognition.continuous = false;
    recognition.lang = CURRENT_LANG === 'he' ? 'he-IL' : 'en-US';
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const audioText = event.results[0][0].transcript;
      setVoiceInput(`"${audioText}"`);
      setVoiceOutput(lt('AI Engine Framework Mapping Confirmed -> Project Nimbus Layer 1 Secure Router.', 'מיפוי מערכת בינה מלאכותית אושר -> נתונים מאובטח בפרויקט נימבוס.'));
    };
    recognition.start();
  };

  return (
    <div className="page-stack" style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ background: '#0f172a', color: '#fff', padding: '1.25rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.4rem' }}>🏛️ Citizen Services AI Layer Workspace</h1>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
            <strong>Objective:</strong> Reduce bureaucratic friction and improve 24/7 access to digital channels without reliance on non-compliant biometric parameters[cite: 181, 202].
          </p>
        </div>
        <div style={{ fontSize: '0.75rem', background: '#1e293b', padding: '6px 12px', borderRadius: '6px', color: '#38bdf8', fontWeight: 'bold', border: '1px solid #334155' }}>
          VAT Included Cap: 50,000 NIS [cite: 18, 217]
        </div>
      </div>

      <div className="metric-grid" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        {data.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* ==========================================================
          NEW: LIGHT-THEME PROGRAM-WIDE AI AUDIO TRANSLATION SYSTEM
          ========================================================== */}
      <WindowPanel
        title={lt('Global Simultaneous Voice Translation Matrix', 'מטריצת תרגום קולי סימولטני גלובלי')}
        subtitle={lt('Listens and maps omni-channel phone and reception terminology program-wide.', 'מאזין וממפה מונחים קוליים וטלפוניים רשמיים בכל חלקי המערכת.')}
        eyebrow={lt('AI Translation Layer', 'שכבת תרגום בינה מלאכותית')}
        accent="info"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <button
            type="button"
            onClick={handleVoiceTranslationDemo}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: 'none',
              background: isListening ? '#ef4444' : '#0284c7',
              color: '#fff',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            🎤
          </button>
          <div style={{ flexGrow: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#fff', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 'bold', display: 'block' }}>AUDIO INPUT TRANSCRIPT</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#1e293b', fontStyle: 'italic' }}>{voiceInput || 'Click microphone to test voice translation...'}</p>
            </div>
            <div style={{ background: '#f0f9ff', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #bae6fd' }}>
              <span style={{ fontSize: '0.7rem', color: '#0369a1', fontWeight: 'bold', display: 'block' }}>AI OUTPUT TRANSLATION</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#0369a1', fontWeight: '600' }}>{voiceOutput || 'Awaiting conversation loop...'}</p>
            </div>
          </div>
        </div>
      </WindowPanel>

      <div className="page-grid page-grid--citizen" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        <WindowPanel 
          className="page-grid__span-2" 
          title={lt('Citizen request queue', 'תור בקשות אזרחים')} 
          subtitle={lt('Request intake, portal status, and assisted service paths converge here.', 'קליטת בקשות, סטטוס פורטל ומסלולי שירות מסייע מתכנסים כאן.')} 
          eyebrow={lt('Request Flow', 'זרימת בקשות')} 
          accent="accent"
        >
          <div className="record-list record-list--compact" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {data.cases.map((item) => {
              const isApproved = approvedCaseIds.includes(item.id);
              return (
                <button 
                  key={item.id} 
                  type="button" 
                  style={{ 
                    textAlign: 'left', 
                    padding: '1rem', 
                    borderRadius: '8px', 
                    border: item.id === selectedCaseSummary.id ? '2px solid #0284c7' : '1px solid #e2e8f0',
                    background: item.id === selectedCaseSummary.id ? '#f0f9ff' : '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    width: '100%'
                  }}
                  onClick={() => setSelectedCaseId(item.id)}
                >
                  <div className="record-row__top" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <strong style={{ color: '#0f172a' }}>{item.id}</strong>
                      {isApproved && <span style={{ background: '#d1fae5', color: '#065f46', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>✓ APPROVED</span>}
                    </div>
                    <StatusPill tone={item.progress > 80 ? 'success' : item.progress > 60 ? 'accent' : 'warning'} label={`${item.progress}%`} />
                  </div>
                  <strong className="record-row__title" style={{ display: 'block', fontSize: '0.95rem', color: '#1e293b' }}>{text(item.service)}</strong>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: '#64748b' }}>{text(item.statusLabel)}</p>
                  <div className="tag-row" style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <span className="tag-chip" style={{ background: '#f1f5f9', color: '#334155', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem' }}>{text(item.citizenTier)}</span>
                    <span className="tag-chip tag-chip--muted" style={{ background: '#f8fafc', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', color: '#94a3b8' }}>📍 {item.lastTouchpoint}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </WindowPanel>

        <WindowPanel 
          title={lt('Selected case workspace', 'מרחב עבודה לתיק נבחר')} 
          subtitle={lt('Demonstrates a secure, reviewable citizen-service flow without a backend.', 'מדגים זרימת שירות לאזרח מאובטחת וברת ביקורת ללא בקאנד.')} 
          eyebrow={lt('Case Detail', 'פרטי תיק')} 
          accent="info"
        >
          <div className="detail-card" style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div className="detail-card__hero" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div>
                <span className="eyebrow" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{selectedCaseSummary.id}</span>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', fontWeight: '600' }}>{text(selectedCaseSummary.service)}</h3>
              </div>
              <StatusPill tone="info" label={`${selectedCaseSummary.progress}%`} />
            </div>

            {/* ==========================================================
                NEW: INTERACTIVE LIGHT-THEME AI SUMMARY BREAKDOWN INSIGHT
                ========================================================== */}
            <div style={{ background: '#fff', border: '1px solid #bae6fd', padding: '0.75rem', borderRadius: '6px', margin: '1rem 0' }}>
              <span style={{ fontSize: '0.7rem', color: '#0284c7', fontWeight: 'bold', textTransform: 'uppercase', display: 'block' }}>⚡ AI-Generated Summary Insight [cite: 263]</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#334155', lineHeight: '1.4' }}>
                {selectedCaseSummary.id === 'CS-1284' 
                  ? lt('Verified income fields sit below emergency support parameters. Open Banking matches verified identities flawlessly.', 'שדות ההכנסה המאומתים נמצאים מתחת לפרמטרי תמיכת החירום. מערכת בנקאות פתוחה מתאימה לזהויות בצורה חלקה.')
                  : lt('Auto-validated via secure secondary token arrays. Manual bypass rules reached successfully.', 'אימות אוטומטי בוצע באמצעות מערכי אסימונים משניים מאובטחים. כללי מעקף ידני הושגו בהצלחה.')}
              </p>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.4' }}>{text(selectedCaseSummary.waitingOn)}</p>
            <div className="progress-bar progress-bar--wide" style={{ background: '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden', marginTop: '1rem' }}>
              <span style={{ display: 'block', height: '100%', background: '#6366f1', width: `${selectedCaseSummary.progress}%`, transition: 'width 0.4s ease' }} />
            </div>

            {/* ==========================================================
                NEW: INTERACTIVE WORKFLOW APPROVAL BUTTON
                ========================================================== */}
            <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
              {isCurrentlyApproved ? (
                <div style={{ display: 'inline-block', background: '#d1fae5', color: '#065f46', fontSize: '0.8rem', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', border: '1px solid #a7f3d0' }}>
                  ✓ Request Approved & Synced to Nimbus Cloud Framework
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleApproveCase(selectedCaseSummary.id)}
                  style={{
                    background: '#10b981',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}
                >
                  {lt('Approve Grant Application', 'אשר בקשת מענק')}
                </button>
              )}
            </div>

          </div>
        </WindowPanel>

        <WindowPanel 
          title={lt('Extracted document fields', 'שדות מסמכים שחולצו')} 
          subtitle={lt('Field confidence is visible before any sensitive action proceeds.', 'ביטחון השדות גלוי לפני כל פעולה רגישה.')} 
          eyebrow={lt('Document AI Mock', 'מוקאפ Document AI')} 
          accent="warning"
        >
          <div className="stack-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {selectedCaseSummary.extractedFields.map((field) => (
              <ExtractedFieldRow key={field.id} field={field} text={text} />
            ))}
          </div>
        </WindowPanel>

        <WindowPanel 
          title={lt('Identity-assist ladder', 'סולם סיוע בזיהוי')} 
          subtitle={lt('Human-safe fallback remains explicit at every stage.', 'גיבוי בטוח לאדם נשאר מפורש בכל שלב.')} 
          eyebrow={lt('Verification', 'אימות')} 
          accent="success"
        >
          <div className="timeline-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {selectedCaseSummary.verificationStages.map((stage) => (
              <article key={stage.id} className="timeline-item" style={{ borderLeft: '3px solid #10b981', paddingLeft: '0.75rem', margin: '0 0 0 0.25rem' }}>
                <StatusPill tone={stage.status} label={text(stage.label)} />
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#475569' }}>{text(stage.detail)}</p>
              </article>
            ))}
          </div>
        </WindowPanel>

        <WindowPanel 
          title={lt('After-hours self-service path', 'מסלול שירות עצמי מחוץ לשעות הפעילות')} 
          subtitle={lt('A clear citizen-safe journey from upload to response.', 'מסע ברור ובטוח לאזרח מהעלאה ועד תגובה.')} 
          eyebrow={lt('Portal Flow', 'זרימת פורטל')} 
          accent="accent"
        >
          <div className="timeline-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {selectedCaseSummary.selfServiceTimeline.map((item) => (
              <article key={item.id} className="timeline-item" style={{ borderLeft: '3px solid #0284c7', paddingLeft: '0.75rem', margin: '0 0 0 0.25rem' }}>
                <StatusPill tone={item.status} label={text(item.label)} />
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#475569' }}>{text(item.detail)}</p>
              </article>
            ))}
          </div>
        </WindowPanel>

      </div>
    </div>
  );
}

export default CitizenServicesPage;