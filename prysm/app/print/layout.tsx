import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prysm Print | Order Premium Study Guides',
  description: 'Transform your digital notes and AI-generated summaries into premium physical study guides. Get professionally printed materials delivered to your door.',
  keywords: ['Prysm Print', 'Study Guides', 'Print Notes', 'Physical Study Materials', 'SADC Education'],
  openGraph: {
    title: 'Prysm Print | Premium Study Guides',
    description: 'Transform your digital notes into premium physical study guides.',
    type: 'website',
  },
};

export default function PrintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

