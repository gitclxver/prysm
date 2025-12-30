import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exam Hub | Prysm - Access Thousands of Past Papers',
  description: 'Access 42,000+ past exam papers from Namibia (NSSCO), South Africa (CAPS & IEB), and Eswatini (EGCSE). AI-powered insights identify trending topics and frequently asked questions.',
  keywords: ['Exam Papers', 'Past Papers', 'NSSCO', 'CAPS', 'IEB', 'EGCSE', 'Exam Preparation', 'SADC Exams'],
  openGraph: {
    title: 'Exam Hub | Prysm',
    description: 'Access thousands of past exam papers with AI-powered insights.',
    type: 'website',
  },
};

export default function ExamHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

