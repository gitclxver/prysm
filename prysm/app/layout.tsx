import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CookieConsent } from "@/components/CookieConsent";
import { WaitlistPopup } from "@/components/WaitlistPopup";
import { BackToTop } from "@/components/BackToTop";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://prysmlearn.com'),
  openGraph: {
    title: "Prysm | Save the Semester. Escape the Prysm.",
    description: "The Ultimate Student OS. Centralize your notes, exam papers, and schedule. Save your semester with AI-powered tools designed for SADC students.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://prysmlearn.com',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Prysm",
              "description": "The Ultimate Student OS. Centralize your notes, exam papers, and schedule for SADC students.",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://prysmlearn.com",
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://prysmlearn.com"}/logo.png`,
              "foundingDate": "2024",
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
          {children}
          <CookieConsent />
          <WaitlistPopup />
          <BackToTop />
        </AuthProvider>
      </body>
    </html>
  );
}
