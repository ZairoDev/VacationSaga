"use client";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-8">
        Privacy Policy
      </h1>

      <div className="space-y-8 text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
        {/* 1. Introduction */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            1. Introduction
          </h2>
          <p className="mb-2">
            This Privacy Policy explains how we collect, use, process, store, and protect your
            personal information when you access or use our website, platform, or related services.
          </p>
          <p>
            By using our services, you acknowledge and agree to the collection and use of
            information in accordance with this Privacy Policy.
          </p>
        </section>

        {/* 2. Information We Collect */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            2. Information We Collect
          </h2>
          <p className="mb-2">
            We may collect different types of information from users in order to provide and
            improve our services.
          </p>

          <h3 className="font-semibold mt-2 mb-1">Personal Information</h3>
          <p className="mb-2">This may include:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Billing or payment details</li>
            <li>Identification details where required for booking confirmation</li>
            <li>Any information voluntarily provided during inquiries or communication</li>
          </ul>

          <h3 className="font-semibold mt-4 mb-1">Technical Information</h3>
          <p className="mb-2">
            When you access our platform, certain technical data may automatically be collected,
            including:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>IP address</li>
            <li>Browser type and device information</li>
            <li>Operating system</li>
            <li>Website usage activity</li>
            <li>Cookies and tracking technologies</li>
          </ul>
          <p className="mt-2">
            This information helps improve platform performance, security, and user experience.
          </p>
        </section>

        {/* 3. How We Use Your Information */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            3. How We Use Your Information
          </h2>
          <p className="mb-2">The information collected may be used for the following purposes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Facilitating property bookings and service requests</li>
            <li>Communicating with users regarding inquiries, bookings, or support</li>
            <li>Processing payments and transaction confirmations</li>
            <li>Improving platform functionality and user experience</li>
            <li>Preventing fraud, unauthorized activity, or misuse of the platform</li>
            <li>Complying with legal or regulatory obligations</li>
          </ul>
          <p className="mt-2">
            We only use personal information for legitimate operational purposes related to our
            services.
          </p>
        </section>

        {/* 4. Data Storage and Security */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            4. Data Storage and Security
          </h2>
          <p className="mb-2">
            We implement appropriate technical and organizational security measures to safeguard
            personal data from unauthorized access, misuse, alteration, or disclosure.
          </p>
          <p className="mb-2">Security measures may include:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Secure servers and encrypted data transmission</li>
            <li>Restricted internal access to sensitive information</li>
            <li>System monitoring and security protocols</li>
          </ul>
          <p className="mt-2">
            While we strive to protect user data, no system can guarantee absolute security. Users
            are encouraged to maintain confidentiality of their login credentials.
          </p>
        </section>

        {/* 5. Sharing of Information */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            5. Sharing of Information
          </h2>
          <p className="mb-2">
            We respect user privacy and do not sell, rent, or trade personal information to third
            parties. However, limited information may be shared in the following circumstances:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>With property owners or service providers to facilitate bookings</li>
            <li>With payment processing partners to complete transactions</li>
            <li>When required by law, regulatory authorities, or legal proceedings</li>
            <li>To protect the rights, safety, or security of the company or its users</li>
          </ul>
          <p className="mt-2">
            Any third-party partners are expected to maintain confidentiality and protect user
            information.
          </p>
        </section>

        {/* 6. Cookies and Tracking Technologies */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            6. Cookies and Tracking Technologies
          </h2>
          <p className="mb-2">
            Our website may use cookies and similar tracking technologies to enhance user
            experience and improve functionality. Cookies may be used to:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Remember user preferences</li>
            <li>Analyze website traffic and performance</li>
            <li>Improve website navigation</li>
          </ul>
          <p className="mt-2">
            Users may disable cookies through browser settings, although some features of the
            platform may not function properly without them.
          </p>
        </section>

        {/* 7. Data Retention */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            7. Data Retention
          </h2>
          <p>
            Personal information will only be retained for as long as necessary to fulfill the
            purposes for which it was collected, including legal, accounting, or operational
            requirements. Once the retention period expires, data may be securely deleted or
            anonymized.
          </p>
        </section>

        {/* 8. User Rights */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">8. User Rights</h2>
          <p className="mb-2">
            Depending on applicable laws, users may have the right to:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Request access to their personal data</li>
            <li>Request correction of inaccurate or incomplete information</li>
            <li>Request deletion of personal data where applicable</li>
            <li>Withdraw consent for certain types of data processing</li>
          </ul>
          <p className="mt-2">
            Requests regarding personal data may be submitted to the company through official
            contact channels.
          </p>
        </section>

        {/* 9. Children's Privacy */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            9. Children&apos;s Privacy
          </h2>
          <p>
            Our services are intended for individuals 18 years of age or older. We do not knowingly
            collect or store personal information from individuals under the age of 18. If such
            information is discovered, it will be removed from our records.
          </p>
        </section>

        {/* 10. Third-Party Links */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            10. Third-Party Links
          </h2>
          <p>
            Our platform may contain links to third-party websites or services. We are not
            responsible for the privacy practices, policies, or content of such external websites.
            Users are advised to review the privacy policies of any third-party platforms they
            visit.
          </p>
        </section>

        {/* 11. International Data Protection Compliance */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            11. International Data Protection Compliance
          </h2>
          <p className="mb-2">
            Our data protection practices aim to align with widely recognized privacy principles and
            global regulatory frameworks such as:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>General Data Protection Regulation (GDPR)</li>
            <li>California Consumer Privacy Act (CCPA)</li>
          </ul>
          <p className="mt-2">
            Where applicable, we take reasonable steps to ensure compliance with relevant data
            protection regulations.
          </p>
        </section>

        {/* 12. Updates to This Privacy Policy */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            12. Updates to This Privacy Policy
          </h2>
          <p>
            The company reserves the right to update or modify this Privacy Policy at any time. Any
            changes will be published on this page and will become effective immediately upon
            posting. Continued use of the platform after updates constitutes acceptance of the
            revised policy.
          </p>
        </section>

        {/* 13. Contact Information */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            13. Contact Information
          </h2>
          <p>
            For questions, concerns, or requests related to this Privacy Policy, users may contact
            the company through official communication channels provided on the website.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

