import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Learn about how Prysm uses cookies and similar tracking technologies to enhance your experience on our platform.',
  keywords: ['Cookie Policy', 'Cookies', 'Tracking', 'Privacy', 'Prysm'],
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


