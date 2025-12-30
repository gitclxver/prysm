import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read Prysm\'s Privacy Policy to understand how we collect, use, and protect your personal information.',
  keywords: ['Privacy Policy', 'Data Protection', 'Privacy', 'GDPR', 'Personal Information', 'Prysm'],
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


