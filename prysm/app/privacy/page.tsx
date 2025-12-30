'use client';

import { Navigation } from '@/components/Navigation';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <Badge variant="purple" className="mb-6">
            <i className="fa-solid fa-shield-halved mr-2"></i>Privacy & Security
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="space-y-8">
          <Card className="p-8">
            <h2 className="text-2xl font-extrabold mb-4">1. Introduction</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Welcome to Prysm ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>
            <p className="text-gray-300 leading-relaxed">
              By using Prysm, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our service.
            </p>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-extrabold mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-bold mb-3 mt-6">2.1 Information You Provide</h3>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>Account information (email address, display name)</li>
              <li>Profile information (bio, preferences, notification settings)</li>
              <li>Academic information (subjects, exam dates, study schedules)</li>
              <li>Content you create (notes, drawings, exam papers)</li>
            </ul>

            <h3 className="text-xl font-bold mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>Device information (browser type, operating system)</li>
              <li>Usage data (pages visited, features used, time spent)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>IP address and location data (general region only)</li>
            </ul>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-extrabold mb-4">3. How We Use Your Information</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-check text-lime-400 mt-1"></i>
                <span>To provide, maintain, and improve our services</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-check text-lime-400 mt-1"></i>
                <span>To authenticate your identity and manage your account</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-check text-lime-400 mt-1"></i>
                <span>To personalize your experience and provide relevant content</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-check text-lime-400 mt-1"></i>
                <span>To send you important updates, notifications, and support messages</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-check text-lime-400 mt-1"></i>
                <span>To analyze usage patterns and improve our platform</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-check text-lime-400 mt-1"></i>
                <span>To detect, prevent, and address technical issues and security threats</span>
              </li>
            </ul>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-extrabold mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
            </p>
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-white mb-2">Essential Cookies</h3>
                <p className="text-gray-300 text-sm">Required for the site to function properly. These cannot be disabled.</p>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Authentication Cookies</h3>
                <p className="text-gray-300 text-sm">Used to maintain your login session and security.</p>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Analytics Cookies</h3>
                <p className="text-gray-300 text-sm">Help us understand how visitors interact with our website.</p>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-extrabold mb-4">5. Data Sharing and Disclosure</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We do not sell your personal information. We may share your information only in the following circumstances:
            </p>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations or respond to legal requests</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>With service providers who assist us in operating our platform (under strict confidentiality agreements)</li>
              <li>In connection with a business transfer (merger, acquisition, etc.)</li>
            </ul>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-extrabold mb-4">6. Data Security</h2>
            <p className="text-gray-300 leading-relaxed">
              We implement industry-standard security measures to protect your information, including encryption, secure authentication, and regular security audits. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-extrabold mb-4">7. Your Rights</h2>
            <p className="text-gray-300 leading-relaxed mb-4">You have the right to:</p>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify inaccurate or incomplete data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing</li>
              <li>Data portability (receive your data in a structured format)</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              To exercise these rights, please contact us at{' '}
              <a href="mailto:support@prysmlearn.com" className="text-lime-400 hover:underline">
                support@prysmlearn.com
              </a>
            </p>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-extrabold mb-4">8. Children's Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              Our service is intended for students, including those under 18. We take special care to protect the privacy of young users. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-extrabold mb-4">9. International Data Transfers</h2>
            <p className="text-gray-300 leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
            </p>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-extrabold mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-extrabold mb-4">11. Contact Us</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-2 text-gray-300">
              <p>
                <i className="fa-solid fa-envelope text-lime-400 mr-2"></i>
                Email: <a href="mailto:support@prysmlearn.com" className="text-lime-400 hover:underline">support@prysmlearn.com</a>
              </p>
              <p>
                <i className="fa-solid fa-phone text-lime-400 mr-2"></i>
                Phone: <a href="tel:+264814989258" className="text-lime-400 hover:underline">+264 81 498 9258</a>
              </p>
              <p>
                <i className="fa-solid fa-location-dot text-lime-400 mr-2"></i>
                Location: Windhoek, Namibia
              </p>
            </div>
          </Card>

          <div className="text-center pt-8">
            <Link href="/" className="inline-flex items-center gap-2 text-lime-400 font-semibold hover:gap-3 transition-all">
              <i className="fa-solid fa-arrow-left"></i>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

