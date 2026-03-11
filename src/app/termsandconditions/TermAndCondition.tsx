// import React from "react";

// interface Feature {
//   title: string;
//   description: string;
// }
// const TermAndCondition: React.FC = () => {
//     const features: Feature[] = [
//       {
//         title: "Contract",
//         description: "Vacation Saga is not liable for any contract made between the travelers and property owners.Any amount paid by the traveler shall be received by the owner and in case of cancellation, the owner shall refund the amount directly to the traveler according to the cancellation polices provided by the owner and Vacation Saga shall have no involvement in such transaction.",
//       },
//       {
//         title: "Booking Denied",
//         description: "If a customer is working with other websites also and receives a booking through us and through the other site also and the booking request received through Vacation Saga is cancelled by the owner,due to non availability, such booking request shall be considered as booking provided. Since we have provided a booking request and such booking is denied by the owner, then Vacation Saga shall not be liable for not providing booking or charge back or money back guarantee.",
//       },
//       {
//         title: "Pricing",
//         description: "The subscription price offered by us may vary according to the offers introduced by us may vary according to the offers introduced by us from time to time. A customer availing an offer cannot claim the same benefits that are promised to the customer taking our regular subscription package. The results may vary according to the plan since we have different marketing strategies for different subscriptions and property.",
//       },
//       {
//         title: "Discount",
//         description: "A customer availing discount cannot claim the same discount on their renewal of the same description since we give discounted rates only when the company introduces offers. Thus, the chances of availing the same offer on the expiration of the subscription are very less. The discount totally depends on the offerintroduced by the company at that time and on the offer that is expired or availed by the customer before.If no offer is ongoing at the time of the expiry of the subscription, the customer will have to pay the regular price for the renewal of the subscription.",
//       },
//       {
//         title: "Inquiries",
//         description: "Once a property owner receives an inquiry through us, he shall be solely responsible for answering such require.Vacation saga will have no role in entertaining such inquiry our role is limited till forwarding the inquiry so received to the customers.",
//       },
//       {
//         title: "Payments",
//         description: "Where any customer's property is listed for free under any offer for the time period provided in the offer,such property shall be removed after the expiry of the offer and shall be visible on the site only when the customer pays for the amount subscription package opted by him.",
//       },
//       {
//         title: "Personal website",
//         description: "Where a person takes a subscription which includes a personal website, then the customer shall provide us with the domain to be used for his personal website. The credentials for such domain shall be shared by the customers and the website shall be made on the domain so provided",
//       },
//       {
//         title: "Reviews",
//         description: "In case two bad reviews are given by our registered travelers regarding the condition of the property, Vacation Saga shall remove the Property from the site and the same shall not be visible for 45 days. ",
//       },
//       {
//         title: "Returning investments",
//         description: "In case two bad reviews are given by our registered travelers regarding the condition of the property, Vacation Saga shall remove the Property from the site and the same shall not be visible for 45 days.",
//       },
//     ];



//     return (
        
//     );
// };
//   export default TermAndCondition;
import React from "react";

const TermAndCondition: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-neutral-900 dark:text-neutral-100 mb-8">
        Terms and Conditions
      </h1>

      <div className="space-y-8 text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
        {/* 1. Acceptance of Terms */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            1. Acceptance of Terms
          </h2>
          <p className="mb-2">
            By accessing, browsing, or using this website and its services, you acknowledge that
            you have read, understood, and agree to be legally bound by these Terms and Conditions.
            If you do not agree with these terms, you must discontinue use of the website
            immediately.
          </p>
          <p>
            Your continued use of the website following any updates or modifications to these
            terms constitutes your acceptance of such changes.
          </p>
        </section>

        {/* 2. Eligibility */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">2. Eligibility</h2>
          <p>
            The services provided through this website are intended only for individuals who are 18
            years of age or older and capable of entering into legally binding agreements. By using
            the platform, you confirm that you meet the eligibility requirements.
          </p>
        </section>

        {/* 3. User Responsibilities */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            3. User Responsibilities
          </h2>
          <p className="mb-2">Users agree to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Provide accurate, complete, and up-to-date information while using the platform.</li>
            <li>Maintain the confidentiality of account credentials and login information.</li>
            <li>Ensure that all activities conducted through their account comply with applicable laws.</li>
            <li>Use the website only for lawful purposes and legitimate transactions.</li>
          </ul>
          <p className="mt-2">
            Users are fully responsible for all activities conducted under their account.
          </p>
        </section>

        {/* 4. Prohibited Activities */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            4. Prohibited Activities
          </h2>
          <p className="mb-2">
            Users shall not engage in any activity that may harm the company, the platform, or other
            users. Prohibited actions include but are not limited to:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Unauthorized use of the website or its services.</li>
            <li>Reverse engineering, copying, modifying, or attempting to replicate any part of the platform.</li>
            <li>Posting unlawful, abusive, defamatory, obscene, or harmful content.</li>
            <li>Transmitting fraudulent, false, or misleading information.</li>
            <li>Attempting to gain unauthorized access to systems, databases, or network infrastructure.</li>
            <li>Interfering with the website’s functionality, security systems, or user experience.</li>
            <li>
              Using automated bots, scraping tools, or unauthorized software to extract data from the
              platform.
            </li>
          </ul>
          <p className="mt-2">
            Violation of these terms may result in immediate termination of access and potential
            legal action.
          </p>
        </section>

        {/* 5. Intellectual Property Rights */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            5. Intellectual Property Rights
          </h2>
          <p className="mb-2">
            All website content including but not limited to text, graphics, logos, icons, images,
            software, designs, and trademarks are the exclusive intellectual property of the
            company, unless otherwise specified.
          </p>
          <p>
            Users may not copy, reproduce, distribute, modify, publish, transmit, or commercially
            exploit any content without prior written consent from the company. Unauthorized use of
            intellectual property may result in legal consequences.
          </p>
        </section>

        {/* 6. Booking and Commission Policy */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            6. Booking and Commission Policy
          </h2>
          <p className="mb-2">
            The platform may charge a service fee or commission for facilitating bookings or
            property reservations. Once the commission amount has been paid and the booking process
            has been initiated, the amount shall be treated as a non-refundable service facilitation
            fee.
          </p>

          <h3 className="font-semibold mt-2 mb-1">Refund Policy</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <span className="font-semibold">Commission Payment:</span> The commission paid for
              confirming and reserving a property is considered a service and booking facilitation
              fee.
            </li>
            <li>
              <span className="font-semibold">Non-Refundable Policy:</span> Once the commission
              amount has been paid and the booking process has been initiated for signing the
              agreement and reserving the selected property, the commission fee will not be refunded
              if the guest decides to cancel the contract from their side.
            </li>
            <li>
              <span className="font-semibold">Alternative Property Option:</span> In case of
              cancellation by the guest, the paid commission can be adjusted toward booking another
              property within 30 days from the date of cancellation.
            </li>
            <li>
              <span className="font-semibold">Same Commission Slab:</span> The alternative property
              must fall under the same commission slab or category as the originally selected
              property.
            </li>
            <li>
              <span className="font-semibold">Validity Period:</span> If the guest does not select an
              alternative property within 30 days, the commission amount will be considered
              forfeited and will not be eligible for refund or adjustment.
            </li>
            <li>
              <span className="font-semibold">Company Rights:</span> The company reserves the right
              to verify availability and approve the alternative property selection based on
              existing inventory and booking policies.
            </li>
          </ul>

          <p className="mt-2">
            If the guest cancels the booking process after payment of the commission, the amount
            will not be refunded. However, the user may utilize the same commission amount toward
            booking another property within same area as requested before under the time period of
            30 days, subject to:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>Availability of the alternative property</li>
            <li>The same commission category or slab</li>
          </ul>
          <p className="mt-2">
            Failure to select an alternative property within the specified period will result in
            forfeiture of the commission amount.
          </p>
        </section>

        {/* 7. Payment Terms */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">7. Payment Terms</h2>
          <p className="mb-2">
            All payments made through the platform must be completed via authorized payment
            methods. Users agree that:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>All service fees or commissions must be paid in advance.</li>
            <li>Payments once processed may not be reversed except where required by law.</li>
            <li>
              Any applicable taxes, government charges, or payment processing fees shall be borne by
              the user.
            </li>
          </ul>
          <p className="mt-2">
            The company reserves the right to suspend services if payment obligations are not
            fulfilled.
          </p>
        </section>

        {/* 8. Data Privacy */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">8. Data Privacy</h2>
          <p className="mb-2">
            The company is committed to maintaining strict privacy and confidentiality of user
            information. Personal information collected through the platform is stored securely and
            used only for purposes including:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Account management</li>
            <li>Service facilitation</li>
            <li>Customer support and communication</li>
          </ul>
          <p className="mt-2">
            The company does not sell or disclose personal information to third parties except where
            required by law or necessary for service delivery. Industry-standard security practices
            such as encryption, restricted access controls, and system monitoring are implemented to
            protect user data.
          </p>
        </section>

        {/* 9. Limitation of Liability */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            9. Limitation of Liability
          </h2>
          <p className="mb-2">
            To the maximum extent permitted by law, the company shall not be liable for any
            indirect, incidental, consequential, or special damages arising from:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use or inability to use the website</li>
            <li>Errors, inaccuracies, or interruptions in the platform</li>
            <li>Unauthorized access to user data</li>
            <li>Technical failures or system outages</li>
            <li>Third-party services or external platforms</li>
          </ul>
          <p className="mt-2">
            The website and its services are provided on an “as is” and “as available” basis without
            warranties of any kind.
          </p>
        </section>

        {/* 10. Indemnification */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            10. Indemnification
          </h2>
          <p className="mb-2">
            Users agree to indemnify, defend, and hold harmless the company, its directors,
            employees, partners, and affiliates from any claims, liabilities, damages, losses, or
            legal expenses arising from:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Violation of these Terms and Conditions</li>
            <li>Misuse of the platform or services</li>
            <li>Infringement of third-party rights</li>
            <li>Fraudulent or unlawful activities conducted through the user’s account</li>
          </ul>
        </section>

        {/* 11. Third-Party Services */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            11. Third-Party Services
          </h2>
          <p>
            The platform may contain links or access to third-party websites, services, or external
            platforms for user convenience. The company does not control or assume responsibility
            for the policies, content, or practices of such third parties. Users access such
            services at their own discretion and risk.
          </p>
        </section>

        {/* 12. Platform Disclaimer (Marketplace Liability Protection) */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            12. Platform Disclaimer (Marketplace Liability Protection)
          </h2>
          <p className="mb-2">
            The platform acts solely as a facilitator or intermediary connecting users with property
            owners, managers, or service providers. The company does not own, operate, manage, or
            control the listed properties, unless explicitly stated.
          </p>
          <p className="mb-2">Accordingly:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>The company shall not be responsible for disputes between guests and property owners.</li>
            <li>The company does not guarantee the accuracy of property listings provided by third parties.</li>
            <li>
              Any agreements, transactions, or arrangements entered into between users and property
              owners are solely between those parties.
            </li>
          </ul>
          <p className="mt-2">
            The company shall not be liable for any damages, losses, or claims arising from such
            third-party interactions.
          </p>
        </section>

        {/* 13. Chargeback Protection */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            13. Chargeback Protection
          </h2>
          <p className="mb-2">
            Users agree that once a payment or commission has been processed through authorized
            payment channels, they will not initiate a chargeback or payment dispute without first
            contacting the company to resolve the matter.
          </p>
          <p className="mb-2">
            Unauthorized chargebacks or fraudulent payment disputes may result in:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Immediate suspension of user access</li>
            <li>Recovery actions for associated financial losses</li>
            <li>Legal proceedings where applicable</li>
          </ul>
          <p className="mt-2">
            The company reserves the right to contest chargebacks and recover service costs
            incurred.
          </p>
        </section>

        {/* 14. Property Availability Disclaimer */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            14. Property Availability Disclaimer
          </h2>
          <p>
            While the company strives to ensure accurate and updated listings, property
            availability may change due to factors beyond the company’s control, including owner
            decisions, prior bookings, or operational limitations. The company does not guarantee
            continuous availability of any specific property and reserves the right to offer
            alternative property options of similar category or commission slab where applicable.
          </p>
        </section>

        {/* 15. Digital Agreement and E-Signature Legality */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            15. Digital Agreement and E-Signature Legality
          </h2>
          <p>
            Users acknowledge and agree that any digital confirmation, electronic acceptance,
            online consent, or electronic signature provided through the website shall be legally
            binding. Such digital agreements shall have the same legal validity and enforceability
            as physical written signatures, in accordance with applicable electronic transaction
            laws.
          </p>
        </section>

        {/* 16. Suspension or Termination */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            16. Suspension or Termination
          </h2>
          <p className="mb-2">
            The company reserves the right to suspend or terminate access to the platform without
            prior notice if a user:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Violates these Terms and Conditions</li>
            <li>Engages in fraudulent or illegal activities</li>
            <li>Misuses the website or services</li>
          </ul>
          <p className="mt-2">
            The company may also pursue legal remedies where appropriate.
          </p>
        </section>

        {/* 17. Force Majeure */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            17. Force Majeure
          </h2>
          <p className="mb-2">
            The company shall not be held liable for any delay or failure in performance caused by
            events beyond its reasonable control, including but not limited to:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Natural disasters</li>
            <li>Government regulations or restrictions</li>
            <li>Internet or technical outages</li>
            <li>Cybersecurity incidents</li>
            <li>War, civil disturbances, or pandemics</li>
          </ul>
          <p className="mt-2">
            During such circumstances, services may be suspended without liability.
          </p>
        </section>

        {/* 18. Dispute Resolution and Arbitration */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            18. Dispute Resolution and Arbitration
          </h2>
          <p className="mb-2">
            In the event of any dispute arising from the use of the platform, both parties agree to
            attempt resolution through mutual negotiation. If the dispute cannot be resolved
            amicably, it shall be referred to binding arbitration under the Arbitration and
            Conciliation Act, 1996.
          </p>
          <p>
            The arbitration proceedings shall take place in Kanpur, Uttar Pradesh, and the
            arbitrator’s decision shall be final and binding.
          </p>
        </section>

        {/* 19. Governing Law and Jurisdiction */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            19. Governing Law and Jurisdiction
          </h2>
          <p>
            These Terms and Conditions shall be governed by and interpreted in accordance with the
            laws of India. Subject to arbitration provisions, the courts located in Kanpur, Uttar
            Pradesh shall have exclusive jurisdiction.
          </p>
        </section>

        {/* 20. Amendments to Terms */}
        <section>
          <h2 className="font-semibold text-lg md:text-xl mb-2">
            20. Amendments to Terms
          </h2>
          <p>
            The company reserves the right to update or modify these Terms and Conditions at any
            time. Revised versions will be published on the website and will take effect immediately
            upon publication. Continued use of the platform constitutes acceptance of the revised
            terms.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermAndCondition;

