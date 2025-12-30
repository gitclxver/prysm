import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Drawing Board | Smart Note Taking & Visual Notes | Prysm',
  description: 'Infinite canvas drawing board for visual learners. Sketch diagrams, annotate study materials, and link notes to syllabus chapters. Cloud sync included.',
  keywords: ['Note Taking', 'Drawing Board', 'Visual Notes', 'Study Notes', 'Digital Canvas', 'Mind Maps'],
  openGraph: {
    title: 'Drawing Board | Prysm',
    description: 'Smart drawing board with infinite canvas for visual note-taking.',
    type: 'website',
  },
};

export default function CanvasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

