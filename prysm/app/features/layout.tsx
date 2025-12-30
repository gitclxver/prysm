import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features | Prysm - Why Choose Prysm',
  description: 'Discover why Prysm is the best choice for SADC students. Compare features with global competitors and see how we\'re revolutionizing education.',
  keywords: ['Prysm Features', 'Student OS Features', 'Education Platform Comparison', 'SADC Education'],
  openGraph: {
    title: 'Features | Prysm',
    description: 'Discover why Prysm is the best choice for SADC students.',
    type: 'website',
  },
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

