import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prysm Tutors | 1-on-1 Tutoring with Curriculum Experts',
  description: 'Book 1-on-1 sessions with top-tier university students who mastered your exact curriculum. AI-powered tutor recommendations based on your performance. Available for NSSCO, CAPS, IEB, and EGCSE.',
  keywords: ['Tutoring', 'Online Tutors', 'SADC Tutors', 'NSSCO Tutors', 'CAPS Tutors', 'IEB Tutors', 'EGCSE Tutors', 'Study Help'],
  openGraph: {
    title: 'Prysm Tutors | 1-on-1 Tutoring',
    description: 'Book sessions with curriculum experts who understand your syllabus.',
    type: 'website',
  },
};

export default function TutorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

