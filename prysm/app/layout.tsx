import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CookieConsent } from "@/components/CookieConsent";
import { WaitlistModal } from "@/components/WaitlistModal";
import { BackToTop } from "@/components/BackToTop";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Helper function to ensure URL has a protocol
function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://prysmlearn.com';
  // If URL doesn't start with http:// or https://, add https://
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: {
    default: "Prysm | Save the Semester. Escape the Prysm.",
    template: "%s | Prysm",
  },
  description: "Prysm - The Ultimate Student OS. Centralize your notes, exam papers, and schedule. Access 42,000+ past papers from NSSCO, CAPS, IEB, and EGCSE. AI-powered study tools launching February 2026.",
  keywords: ["Prysm", "Student OS", "SADC", "Education", "Exam Papers", "Study Tools", "AI Learning", "Student Platform", "Academic Tools", "NSSCO", "CAPS", "IEB", "EGCSE", "Namibia", "South Africa", "Eswatini"],
  authors: [{ name: "Prysm Academy" }],
  creator: "Prysm Academy",
  publisher: "Prysm Academy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Prysm | Save the Semester. Escape the Prysm.",
    description: "The Ultimate Student OS. Centralize your notes, exam papers, and schedule. Save your semester with AI-powered tools designed for SADC students.",
    url: siteUrl,
    siteName: "Prysm",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prysm | Save the Semester. Escape the Prysm.",
    description: "The Ultimate Student OS. Centralize your notes, exam papers, and schedule.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const theme = savedTheme === 'light' || savedTheme === 'dark' 
                    ? savedTheme 
                    : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-solid-900.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-brands-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Prysm",
              "description": "The Ultimate Student OS. Centralize your notes, exam papers, and schedule for SADC students.",
              "url": siteUrl,
              "logo": `${siteUrl}/logo.png`,
              "foundingDate": "2025",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "support@prysmlearn.com",
                "telephone": "+264814989258",
                "contactType": "Customer Service",
                "areaServed": ["NA", "ZA", "SZ"],
                "availableLanguage": ["en"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Windhoek",
                "addressCountry": "Namibia"
              },
              "areaServed": {
                "@type": "Place",
                "name": "Southern African Development Community",
                "containsPlace": [
                  { "@type": "Country", "name": "Namibia" },
                  { "@type": "Country", "name": "South Africa" },
                  { "@type": "Country", "name": "Eswatini" }
                ]
              },
              "offers": {
                "@type": "Offer",
                "name": "Student OS Platform",
                "description": "Free core features with premium options available"
              }
            })
          }}
        />
      </head>
      <body className={`${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ThemeProvider>
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--lime)] focus:text-[var(--prysm-bg)] focus:rounded-lg focus:font-bold"
            >
              Skip to main content
            </a>
            {children}
            <CookieConsent />
            <WaitlistModal />
            <BackToTop />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
