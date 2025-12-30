'use client';

import { Navigation } from '@/components/Navigation';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import Link from 'next/link';

export default function AcceptableUsePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-12">
          <Badge variant="purple" className="mb-6">
            <i className="fa-solid fa-shield-halved mr-2"></i>Community Guidelines
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">Acceptable Use Policy</h1>
          <p className="text-[var(--text-secondary)]">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">1. Introduction</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              This Acceptable Use Policy (&quot;Policy&quot;) outlines the rules and guidelines for using Prysm (&quot;the Service&quot;). By using our Service, you agree to comply with this Policy.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We are committed to maintaining a safe, respectful, and productive learning environment for all users. Violations of this Policy may result in suspension or termination of your account.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">2. Prohibited Activities</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              You may not use the Service to:
            </p>

            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-4">2.1 Illegal Activities</h3>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2 mb-6">
              <li>Violate any applicable local, national, or international laws or regulations</li>
              <li>Engage in fraud, theft, or other criminal activities</li>
              <li>Distribute illegal content or materials</li>
              <li>Facilitate or encourage illegal activities</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-6">2.2 Harmful Content</h3>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2 mb-6">
              <li>Upload or share malicious software, viruses, or harmful code</li>
              <li>Post content that could cause harm, injury, or damage</li>
              <li>Share false or misleading information that could cause harm</li>
              <li>Distribute content that promotes self-harm or suicide</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-6">2.3 Harassment and Abuse</h3>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2 mb-6">
              <li>Harass, threaten, intimidate, or bully other users</li>
              <li>Post hate speech, discriminatory content, or content that targets protected groups</li>
              <li>Engage in cyberbullying or online harassment</li>
              <li>Impersonate other users, organizations, or public figures</li>
              <li>Stalk or invade the privacy of other users</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-6">2.4 Intellectual Property Violations</h3>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2 mb-6">
              <li>Infringe upon copyrights, trademarks, patents, or other intellectual property rights</li>
              <li>Upload copyrighted material without authorization</li>
              <li>Share exam papers or educational materials in violation of copyright</li>
              <li>Use others&apos; content without proper attribution or permission</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-6">2.5 Academic Integrity</h3>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2 mb-6">
              <li>Share answers to active exams or assignments</li>
              <li>Facilitate cheating or academic dishonesty</li>
              <li>Upload exam papers that are currently in use</li>
              <li>Use the Service to complete assignments on behalf of others</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-6">2.6 System and Security</h3>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2">
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use automated systems (bots, scrapers) without permission</li>
              <li>Attempt to reverse engineer or decompile the Service</li>
              <li>Share your account credentials with others</li>
              <li>Create multiple accounts to circumvent restrictions</li>
            </ul>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">3. Content Standards</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              All content you upload, share, or create must:
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2 mb-6">
              <li>Be accurate and truthful</li>
              <li>Respect the rights of others</li>
              <li>Comply with applicable laws and regulations</li>
              <li>Be appropriate for an educational environment</li>
              <li>Not contain spam, advertisements, or promotional content (unless authorized)</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-6">3. Educational Content</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              When sharing educational materials:
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2">
              <li>Ensure you have the right to share the content</li>
              <li>Provide proper attribution when required</li>
              <li>Only share past exam papers, not active exams</li>
              <li>Verify the accuracy of educational content before sharing</li>
            </ul>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">4. Community Guidelines</h2>
            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-4">4.1 Respectful Communication</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              We encourage constructive, respectful, and supportive interactions:
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2 mb-6">
              <li>Be respectful and considerate of others</li>
              <li>Use appropriate language and tone</li>
              <li>Provide constructive feedback when helping others</li>
              <li>Respect diverse opinions and perspectives</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-6">4.2 Collaboration</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              When collaborating with others:
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2">
              <li>Respect others&apos; work and contributions</li>
              <li>Give credit where credit is due</li>
              <li>Follow group rules and guidelines</li>
              <li>Maintain academic integrity in collaborative work</li>
            </ul>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">5. Reporting Violations</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              If you encounter content or behavior that violates this Policy, please report it to us immediately:
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2 mb-6">
              <li>Use the reporting features available in the Service</li>
              <li>Contact us at <a href="mailto:support@prysmlearn.com" className="text-[var(--lime)] hover:underline">support@prysmlearn.com</a></li>
              <li>Provide as much detail as possible about the violation</li>
            </ul>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We take all reports seriously and will investigate promptly. We may take action including content removal, account warnings, suspension, or termination.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">6. Enforcement</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Violations of this Policy may result in:
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2 mb-6">
              <li><strong className="text-[var(--text-primary)]">Warning:</strong> First-time minor violations may result in a warning</li>
              <li><strong className="text-[var(--text-primary)]">Content Removal:</strong> Violating content will be removed</li>
              <li><strong className="text-[var(--text-primary)]">Temporary Suspension:</strong> Account access may be temporarily restricted</li>
              <li><strong className="text-[var(--text-primary)]">Permanent Ban:</strong> Serious or repeated violations may result in permanent account termination</li>
            </ul>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We reserve the right to take any action we deem necessary to maintain a safe and productive learning environment. Decisions regarding enforcement are at our sole discretion.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">7. Appeals</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              If you believe your account was suspended or terminated in error, you may appeal by contacting us at <a href="mailto:support@prysmlearn.com" className="text-[var(--lime)] hover:underline">support@prysmlearn.com</a>.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Please include your account information and a detailed explanation of why you believe the action was incorrect. We will review your appeal and respond within a reasonable timeframe.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">8. Changes to This Policy</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              We may update this Acceptable Use Policy from time to time to reflect changes in our practices, legal requirements, or for other reasons.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We will notify users of material changes via email or through the Service. Your continued use of the Service after changes become effective constitutes acceptance of the updated Policy.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">9. Contact Us</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              If you have questions about this Acceptable Use Policy, please contact us:
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


