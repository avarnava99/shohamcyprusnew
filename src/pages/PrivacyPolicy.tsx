import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { CONTACT } from "@/constants/contact";
import SEO from "@/components/SEO";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <SEO title="Privacy Policy" description="How Shoham Shipping & Logistics collects, uses, and protects your personal information." path="/about-us/privacy-policy" />
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <div className="mb-2">
            <Link to="/about-us" className="text-white/70 hover:text-white text-sm">
              ← Back to About Us
            </Link>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            How we collect, use, and protect your personal information.
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="prose prose-lg max-w-4xl mx-auto">
          <p className="lead text-muted-foreground">
            Shoham Shipping & Logistics ("we", "our", or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
            when you visit our website or use our services.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect 
            includes:
          </p>
          <h3>Personal Data</h3>
          <ul>
            <li>Name, email address, and phone number</li>
            <li>Company name and business address</li>
            <li>Shipping and billing addresses</li>
            <li>Payment information (processed securely through third-party providers)</li>
            <li>Communication preferences</li>
          </ul>

          <h3>Derivative Data</h3>
          <p>
            Information our servers automatically collect when you access our website, such as your 
            IP address, browser type, operating system, access times, and the pages you have viewed 
            directly before and after accessing the website.
          </p>

          <h2>Use of Your Information</h2>
          <p>
            We use the information we collect about you or that you provide to us:
          </p>
          <ul>
            <li>To provide, operate, and maintain our services</li>
            <li>To process your shipping and logistics requests</li>
            <li>To communicate with you about your shipments and inquiries</li>
            <li>To send you marketing communications (with your consent)</li>
            <li>To improve our website and services</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>Disclosure of Your Information</h2>
          <p>
            We may share information we have collected about you in certain situations:
          </p>
          <ul>
            <li><strong>Business Partners:</strong> We may share your information with shipping lines, 
            customs authorities, and other partners necessary to provide our services</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information where we are 
            legally required to do so</li>
            <li><strong>Business Transfers:</strong> We may share or transfer your information in 
            connection with a merger, acquisition, or sale of assets</li>
          </ul>

          <h2>Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to protect your personal 
            information. While we have taken reasonable steps to secure the information you provide to 
            us, please be aware that no security measures are perfect, and we cannot guarantee absolute 
            security.
          </p>

          <h2>Your Rights Under GDPR</h2>
          <p>
            If you are a resident of the European Economic Area, you have certain data protection rights:
          </p>
          <ul>
            <li><strong>Right to Access:</strong> Request copies of your personal data</li>
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
            <li><strong>Right to Restrict Processing:</strong> Request restriction of data processing</li>
            <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
            <li><strong>Right to Object:</strong> Object to our processing of your data</li>
          </ul>

          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We may use cookies, web beacons, and other tracking technologies to collect information 
            about your browsing activities. You can instruct your browser to refuse all cookies or to 
            indicate when a cookie is being sent.
          </p>

          <h2>Third-Party Websites</h2>
          <p>
            Our website may contain links to third-party websites and services. We are not responsible 
            for the content or privacy practices of these third-party sites.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by 
            posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at:
          </p>
          <address className="not-italic">
            <strong>Shoham Shipping & Logistics</strong><br />
            <br />
            Email: <a href={CONTACT.primary.emailHref}>{CONTACT.primary.email}</a><br />
            Phone: <a href={CONTACT.primary.phoneHref}>{CONTACT.primary.phone}</a>
          </address>

          <p className="text-sm text-muted-foreground mt-8">
            Last Updated: January 2026
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
