import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acceptable Use Policy',
  description: 'Review Prysm\'s Acceptable Use Policy to understand the rules and guidelines for using our educational platform responsibly.',
  keywords: ['Acceptable Use Policy', 'Community Guidelines', 'User Conduct', 'Rules', 'Prysm'],
};

export default function AcceptableUseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


