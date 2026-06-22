import { BotMessageSquare, FileSearch, LayoutDashboard, Settings2, ShieldCheck, Waves } from 'lucide-react';
import type { ComponentType } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { AppShell } from '../../components/shell/AppShell';
import { lt, type LocalizedText } from '../../api/contracts';
import { AdministrationPage } from '../../features/administration/AdministrationPage';
import { CitizenServicesPage } from '../../features/citizen-services/CitizenServicesPage';
import { OverviewPage } from '../../features/overview/OverviewPage';
import { RepresentativeAssistantPage } from '../../features/representative-assistant/RepresentativeAssistantPage';
import { ResearchReviewPage } from '../../features/research-review/ResearchReviewPage';
import { ServiceOperationsPage } from '../../features/service-operations/ServiceOperationsPage';

export type RouteDefinition = {
  id: string;
  path: string;
  label: LocalizedText;
  subtitle: LocalizedText;
  badge: LocalizedText;
  icon: ComponentType<{ className?: string }>;
};

export const ROUTES: RouteDefinition[] = [
  {
    id: 'overview',
    path: '/overview',
    label: lt('Overview', 'סקירה'),
    subtitle: lt('Cross-program pulse, cloud posture, and active signals.', 'תמונת מצב רוחבית, מצב הענן והאותות הפעילים.'),
    badge: lt('Mission Control', 'חדר פיקוד'),
    icon: LayoutDashboard,
  },
  {
    id: 'service-operations',
    path: '/service-operations',
    label: lt('Service Operations', 'תפעול שירות'),
    subtitle: lt('Monitor anomalies, demand, and channel quality in one surface.', 'ניטור חריגות, ביקוש ואיכות ערוצים במשטח אחד.'),
    badge: lt('RFI 7197', 'מענה 7197'),
    icon: Waves,
  },
  {
    id: 'representative-assistant',
    path: '/representative-assistant',
    label: lt('Representative Assistant', 'עוזר לנציג'),
    subtitle: lt('Grounded answers, translation, and live guidance for frontline teams.', 'תשובות מבוססות מקורות, תרגום והכוונה בזמן אמת לצוותי קו ראשון.'),
    badge: lt('RFI 7190', 'מענה 7190'),
    icon: BotMessageSquare,
  },
  {
    id: 'citizen-services',
    path: '/citizen-services',
    label: lt('Citizen Services', 'שירותים לאזרח'),
    subtitle: lt('Document intake, secure status lookup, and identity-assist workflows.', 'קליטת מסמכים, בדיקת סטטוס מאובטחת וזרימות סיוע בזיהוי.'),
    badge: lt('RFI 7192', 'מענה 7192'),
    icon: ShieldCheck,
  },
  {
    id: 'research-review',
    path: '/research-review',
    label: lt('Research Review', 'סקירת מחקר'),
    subtitle: lt('Proposal triage, criteria-based screening, and committee-ready recommendations.', 'מיון הצעות, סינון מבוסס קריטריונים והמלצות מוכנות לוועדה.'),
    badge: lt('RFI 7632', 'מענה 7632'),
    icon: FileSearch,
  },
  {
    id: 'administration',
    path: '/administration',
    label: lt('Administration', 'ניהול'),
    subtitle: lt('Operational controls, connectors, audit visibility, and experience tuning.', 'בקרות תפעול, חיבורים, נראות ביקורת והתאמת חוויית שימוש.'),
    badge: lt('Governance', 'ממשל'),
    icon: Settings2,
  },
];

function ShellRoute() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ShellRoute />}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/service-operations" element={<ServiceOperationsPage />} />
          <Route path="/representative-assistant" element={<RepresentativeAssistantPage />} />
          <Route path="/citizen-services" element={<CitizenServicesPage />} />
          <Route path="/research-review" element={<ResearchReviewPage />} />
          <Route path="/administration" element={<AdministrationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
