import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read Prysm\'s Terms of Service to understand the rules and guidelines for using our educational platform.',
  keywords: ['Terms of Service', 'Terms and Conditions', 'User Agreement', 'Legal', 'Prysm'],
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


