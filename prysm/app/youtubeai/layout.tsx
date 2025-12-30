import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YouTube AI | Instant Transcripts & AI Summaries | Prysm',
  description: 'Transform any YouTube video into study notes instantly. Get AI-generated transcripts, summaries, translations, and key points extraction for educational videos.',
  keywords: ['YouTube Transcript', 'Video Summaries', 'AI Transcription', 'Study Videos', 'Video Notes'],
  openGraph: {
    title: 'YouTube AI | Prysm',
    description: 'Transform YouTube videos into study notes with AI.',
    type: 'website',
  },
};

export default function YouTubeAILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

