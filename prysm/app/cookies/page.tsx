'use client';

import { Navigation } from '@/components/Navigation';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import Link from 'next/link';

export default function CookiesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-12">
          <Badge variant="purple" className="mb-6">
            <i className="fa-solid fa-cookie-bite mr-2"></i>Cookie Policy
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">Cookie Policy</h1>
          <p className="text-[var(--text-secondary)]">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">1. What Are Cookies?</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Prysm uses cookies and similar tracking technologies to enhance your experience, analyze usage, and assist in our marketing efforts.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">2. Types of Cookies We Use</h2>
            
            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-4">2.1 Essential Cookies</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt out of these cookies as they are essential for the Service to work.
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2 mb-6">
              <li><strong className="text-[var(--text-primary)]">Authentication cookies:</strong> Keep you logged in and maintain your session</li>
              <li><strong className="text-[var(--text-primary)]">Security cookies:</strong> Protect against fraud and unauthorized access</li>
              <li><strong className="text-[var(--text-primary)]">Preference cookies:</strong> Remember your settings and preferences</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-6">2.2 Performance and Analytics Cookies</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the way our website works.
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2 mb-6">
              <li>Page views and navigation patterns</li>
              <li>Time spent on pages</li>
              <li>Error messages and loading times</li>
              <li>Feature usage statistics</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-6">2.3 Functionality Cookies</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              These cookies allow the website to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features.
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2">
              <li>Theme preferences (light/dark mode)</li>
              <li>Language and region settings</li>
              <li>Notification preferences</li>
            </ul>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">3. Third-Party Cookies</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics and deliver advertisements. These include:
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2">
              <li><strong className="text-[var(--text-primary)]">Google Analytics:</strong> Helps us understand website usage and improve user experience</li>
              <li><strong className="text-[var(--text-primary)]">Firebase:</strong> Provides authentication and database services</li>
              <li><strong className="text-[var(--text-primary)]">Social Media Platforms:</strong> Enable social sharing features</li>
            </ul>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-4">
              These third parties may use cookies to collect information about your online activities across different websites. We do not control these third-party cookies.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">4. How Long Do Cookies Last?</h2>
            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-4">4.1 Session Cookies</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              These cookies are temporary and are deleted when you close your browser. They are used to maintain your session while you navigate the website.
            </p>

            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-6">4.2 Persistent Cookies</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              These cookies remain on your device for a set period or until you delete them. They help us recognize you when you return to our website and remember your preferences.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">5. Managing Cookies</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
            </p>
            
            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-6">5.1 Browser Settings</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our Service. Here are links to cookie settings for popular browsers:
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)] list-disc list-inside ml-2 mb-6">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[var(--lime)] hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-[var(--lime)] hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[var(--lime)] hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[var(--lime)] hover:underline">Microsoft Edge</a></li>
            </ul>

            <h3 className="text-lg sm:text-xl font-bold mb-3 mt-6">5.2 Our Cookie Consent Tool</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              When you first visit our website, you will see a cookie consent banner. You can manage your cookie preferences at any time through your account settings or by clearing your browser cookies.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">6. Do Not Track Signals</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Some browsers include a &quot;Do Not Track&quot; (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked. Currently, there is no standard for how DNT signals should be interpreted. As a result, we do not currently respond to DNT browser signals or mechanisms.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">7. Updates to This Policy</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We will notify you of any material changes by posting the new Cookie Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4">8. Contact Us</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              If you have any questions about our use of cookies, please contact us:
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


