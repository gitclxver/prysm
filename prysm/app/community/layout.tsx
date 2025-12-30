import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community | Prysm - Connect & Collaborate with Students',
  description: 'Join the Prysm Community to share exam papers, study notes, and collaborate with students across SADC. Upload resources, join study groups, and build a thriving learning ecosystem.',
  keywords: ['Prysm Community', 'Student Community', 'Study Groups', 'Share Notes', 'Upload Exams', 'SADC Students', 'Collaborative Learning'],
  openGraph: {
    title: 'Community | Prysm',
    description: 'Connect and collaborate with students across SADC.',
    type: 'website',
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

