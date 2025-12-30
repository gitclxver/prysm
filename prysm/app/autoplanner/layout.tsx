import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auto-Planner | Smart Study Schedule Generator | Prysm',
  description: 'Automatically generate optimized study schedules based on your subjects, exam dates, and available hours. AI-powered planning for NSSCO, CAPS, IEB, and EGCSE students.',
  keywords: ['Study Planner', 'Exam Schedule', 'Study Timetable', 'Auto Planner', 'Study Schedule Generator'],
  openGraph: {
    title: 'Auto-Planner | Prysm',
    description: 'Smart study schedule generator with AI-powered recommendations.',
    type: 'website',
  },
};

export default function AutoPlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

