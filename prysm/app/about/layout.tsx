import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Prysm - Building the Future of Education',
  description: 'Learn about Prysm, the Ultimate Student OS designed for SADC students. Discover our mission, vision, and commitment to revolutionizing education across Namibia, South Africa, and Eswatini.',
  keywords: ['Prysm', 'About Prysm', 'Education Technology', 'SADC Education', 'Student Platform', 'Namibia Education', 'South Africa Education', 'Eswatini Education'],
  openGraph: {
    title: 'About Us | Prysm - Building the Future of Education',
    description: 'Learn about Prysm, the Ultimate Student OS designed for SADC students.',
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

