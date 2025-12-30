import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Uni-Link | University Applications Made Easy',
  description: 'Centralized university applications across SADC and beyond. Match your results to degree requirements and streamline your application process.',
  keywords: ['Uni-Link', 'University Applications', 'SADC Universities', 'Higher Education', 'University Matching'],
  openGraph: {
    title: 'Uni-Link | Future Phase',
    description: 'Centralized university applications across SADC and beyond.',
    type: 'website',
  },
};

export default function UniLinkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

