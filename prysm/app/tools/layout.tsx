import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tools & Features | Prysm - Complete Student OS',
  description: 'Explore Prysm\'s comprehensive suite of tools: Exam Hub, Auto-Planner, Drawing Board, YouTube AI, and more. Everything you need to succeed in one platform.',
  keywords: ['Prysm Tools', 'Student Tools', 'Exam Hub', 'Study Planner', 'Note Taking', 'AI Education Tools', 'SADC Study Tools'],
  openGraph: {
    title: 'Tools & Features | Prysm',
    description: 'Explore Prysm\'s comprehensive suite of educational tools.',
    type: 'website',
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

