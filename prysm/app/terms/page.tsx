'use client';

import { Navigation } from '@/components/Navigation';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-12">
          <Badge variant="purple" className="mb-6">
            <i className="fa-solid fa-file-contract mr-2"></i>Legal
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">Terms of Service</h1>
          <p className="text-[var(--text-secondary)]">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">1. Acceptance of Terms</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              By accessing or using Prysm (&quot;the Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you disagree with any part of these terms, you may not access the Service.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              These Terms apply to all users of the Service, including without limitation users who are browsers, students, educators, parents, or contributors of content.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">2. Description of Service</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Prysm is an educational technology platform that provides:
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2">
              <li>Centralized note-taking and study tools</li>
              <li>Access to exam papers and study materials</li>
              <li>AI-powered study assistance and exam predictions</li>
              <li>Community features for students and educators</li>
              <li>Tutoring and educational resource matching</li>
            </ul>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">3. User Accounts</h2>
            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-4">3.1 Account Creation</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              To access certain features of the Service, you must create an account. You agree to:
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2 mb-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information to keep it accurate</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-6">3.2 Account Eligibility</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              You must be at least 13 years old to use the Service. If you are under 18, you represent that you have your parent&apos;s or guardian&apos;s permission to use the Service. We reserve the right to verify your age and may suspend accounts that violate this requirement.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">4. Acceptable Use</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon intellectual property rights</li>
              <li>Upload malicious code, viruses, or harmful content</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Use automated systems to access the Service without permission</li>
              <li>Share your account credentials with others</li>
              <li>Upload content that is illegal, offensive, or violates others&apos; rights</li>
            </ul>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-4">
              For more details, please see our <Link href="/acceptable-use" className="text-[var(--lime)] hover:underline">Acceptable Use Policy</Link>.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">5. User Content</h2>
            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-4">5.1 Your Content</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              You retain ownership of content you create, upload, or share on the Service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content for the purpose of operating and improving the Service.
            </p>

            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-6">5.2 Content Standards</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              You are solely responsible for your content. You represent and warrant that:
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2">
              <li>You own or have the right to use all content you submit</li>
              <li>Your content does not violate any third-party rights</li>
              <li>Your content complies with all applicable laws</li>
              <li>Your content is accurate and not misleading</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-6">5.3 Content Removal</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We reserve the right to remove any content that violates these Terms or our Acceptable Use Policy, without prior notice.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">6. Intellectual Property</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              The Service and its original content, features, and functionality are owned by Prysm Academy and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">7. Subscription and Payment</h2>
            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-4">7.1 Free and Premium Services</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Prysm offers both free and premium subscription tiers. Core features are available free of charge. Premium features require a paid subscription.
            </p>

            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-6">7.2 Payment Terms</h3>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2 mb-4">
              <li>Subscription fees are billed in advance on a recurring basis</li>
              <li>All fees are non-refundable except as required by law</li>
              <li>We reserve the right to change our pricing with 30 days&apos; notice</li>
              <li>You are responsible for any applicable taxes</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-6">7.3 Cancellation</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              You may cancel your subscription at any time. Cancellation takes effect at the end of your current billing period. You will continue to have access to premium features until the end of the paid period.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">8. Service Availability</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              We strive to provide reliable service but cannot guarantee:
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2">
              <li>Uninterrupted or error-free service</li>
              <li>That defects will be corrected</li>
              <li>That the Service will meet your specific requirements</li>
            </ul>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-4">
              We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with or without notice.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">9. Limitation of Liability</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, PRYSM ACADEMY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Our total liability for any claims arising from or related to the Service shall not exceed the amount you paid us in the 12 months preceding the claim.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">10. Indemnification</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              You agree to indemnify, defend, and hold harmless Prysm Academy and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the Service, violation of these Terms, or infringement of any rights of another.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">11. Termination</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including if you breach these Terms.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Upon termination, your right to use the Service will cease immediately. You may terminate your account at any time by contacting us or using account deletion features in your settings.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">12. Governing Law</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of Namibia, without regard to its conflict of law provisions. Any disputes arising from these Terms or the Service shall be subject to the exclusive jurisdiction of the courts of Namibia.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">13. Changes to Terms</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              We reserve the right to modify these Terms at any time. We will notify users of material changes via email or through the Service.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Your continued use of the Service after changes become effective constitutes acceptance of the modified Terms. If you do not agree to the changes, you must stop using the Service.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">14. Contact Information</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="space-y-2 text-[var(--text-secondary)]">
              <p className="flex items-center gap-3">
                <i className="fa-solid fa-envelope text-[var(--lime)]"></i>
                Email: <a href="mailto:support@prysmlearn.com" className="text-[var(--lime)] hover:underline">support@prysmlearn.com</a>
              </p>
              <p className="flex items-center gap-3">
                <i className="fa-solid fa-phone text-[var(--lime)]"></i>
                Phone: <a href="tel:+264814989258" className="text-[var(--lime)] hover:underline">+264 81 498 9258</a>
              </p>
              <p className="flex items-start gap-3">
                <i className="fa-solid fa-location-dot text-[var(--lime)] mt-1"></i>
                <span>Windhoek, Namibia</span>
              </p>
            </div>
          </Card>

          <div className="text-center pt-6 sm:pt-8">
            <Link href="/" className="inline-flex items-center gap-2 text-[var(--lime)] font-semibold hover:gap-3 transition-all">
              <i className="fa-solid fa-arrow-left"></i>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


