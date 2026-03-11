"use client";

import React, { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqGroup = {
  title: string;
  items: FaqItem[];
};

const ownerFaqGroups: FaqGroup[] = [
  {
    title: "General Questions",
    items: [
      {
        question: "1. How can I list my property on the platform?",
        answer:
          "You can submit your property details through our listing process by providing property information, photographs, and availability details.",
      },
      {
        question: "2. What types of properties can be listed?",
        answer:
          "You may list villas, apartments, holiday homes, serviced apartments, vacation homes, or other eligible residential properties.",
      },
      {
        question: "3. Who can list a property?",
        answer:
          "Property owners or authorized property managers can submit listings on the platform.",
      },
      {
        question: "4. Do I need to verify my property before listing?",
        answer:
          "Yes. Property verification may be required to ensure authenticity and reliability.",
      },
      {
        question: "5. Can I list multiple properties on the platform?",
        answer:
          "Yes. Owners can list multiple properties if they manage more than one property.",
      },
    ],
  },
  {
    title: "Property Listing",
    items: [
      {
        question: "6. What information is required to list a property?",
        answer:
          "Property address, property type, number of rooms, guest capacity, amenities, pricing, and photographs.",
      },
      {
        question: "7. How many photos should I upload for my property?",
        answer:
          "High-quality photos showing bedrooms, living areas, bathrooms, exterior views, and amenities are recommended.",
      },
      {
        question: "8. Can I update my property details after listing?",
        answer:
          "Yes. Owners can update property information whenever necessary.",
      },
      {
        question: "9. How long does it take for my listing to go live?",
        answer:
          "Listings may be reviewed before approval and publication.",
      },
      {
        question: "10. Can I temporarily pause my listing?",
        answer:
          "Yes. Listings may be paused if the property is temporarily unavailable.",
      },
    ],
  },
  {
    title: "Booking Process",
    items: [
      {
        question: "11. How will I receive booking inquiries?",
        answer:
          "Booking inquiries are communicated through the platform once a traveller shows interest in your property.",
      },
      {
        question: "12. How do I confirm availability for a booking request?",
        answer:
          "Owners will be contacted to confirm availability before the booking is finalized.",
      },
      {
        question: "13. When is a booking considered confirmed?",
        answer:
          "A booking is considered confirmed once the traveller completes the booking process and confirmation is issued.",
      },
      {
        question: "14. Can I reject a booking request?",
        answer:
          "Yes, if the property is unavailable or the request does not meet your requirements.",
      },
      {
        question: "15. Will I receive guest details before arrival?",
        answer:
          "Guest details may be shared after the booking process has been completed.",
      },
    ],
  },
  {
    title: "Payments and Commission",
    items: [
      {
        question: "16. How does the commission model work?",
        answer:
          "Travellers may pay a service or commission fee to initiate the booking process.",
      },
      {
        question: "17. Do property owners pay any commission?",
        answer:
          "Commission structures may vary depending on the agreement with the platform.",
      },
      {
        question: "18. Are there any hidden charges for property owners?",
        answer:
          "No. All applicable terms and charges are communicated clearly in advance.",
      },
      {
        question: "19. When will I receive booking confirmation details?",
        answer:
          "Booking confirmation details are shared once the booking process is completed.",
      },
      {
        question: "20. Are taxes applicable to property bookings?",
        answer:
          "Taxes may apply depending on applicable laws and property policies.",
      },
    ],
  },
  {
    title: "Managing Availability",
    items: [
      {
        question: "21. How do I update my property&apos;s availability?",
        answer:
          "Owners should inform the platform whenever availability changes.",
      },
      {
        question: "22. Can I block specific dates for my property?",
        answer:
          "Yes. Owners can block dates when the property is not available.",
      },
      {
        question: "23. What happens if my property becomes unavailable after confirmation?",
        answer:
          "Owners should inform the platform immediately to minimize inconvenience to travellers.",
      },
      {
        question: "24. Can I temporarily close my listing during off-season periods?",
        answer:
          "Yes. Owners may pause listings during periods of non-availability.",
      },
      {
        question: "25. How can I avoid double bookings?",
        answer:
          "Keep your availability updated and communicate changes promptly.",
      },
    ],
  },
  {
    title: "Guest Stay Management",
    items: [
      {
        question: "26. Who handles guest check-in?",
        answer:
          "The property owner or property manager is responsible for guest check-in arrangements.",
      },
      {
        question: "27. What documents should guests provide at check-in?",
        answer:
          "Guests may be required to present valid identification depending on property policies and local regulations.",
      },
      {
        question: "28. Can I set house rules for my property?",
        answer:
          "Yes. Property owners may establish house rules for guests.",
      },
      {
        question: "29. Can I restrict the number of guests allowed in my property?",
        answer:
          "Yes. Owners may define maximum occupancy limits.",
      },
      {
        question: "30. Can I deny entry if guests violate house rules?",
        answer:
          "Yes, provided that the rules were clearly communicated beforehand.",
      },
    ],
  },
  {
    title: "Property Standards",
    items: [
      {
        question: "31. What standards should I maintain for my property?",
        answer:
          "Cleanliness, safety, accurate listing descriptions, and well-maintained amenities.",
      },
      {
        question: "32. Are safety measures required for properties?",
        answer:
          "Basic safety features and secure access are recommended.",
      },
      {
        question: "33. Should I provide essential amenities?",
        answer:
          "Providing essential amenities improves guest experience and booking success.",
      },
      {
        question: "34. What happens if guests complain about the property?",
        answer:
          "Owners should address concerns promptly and maintain service quality.",
      },
      {
        question: "35. Can my listing be removed for poor standards?",
        answer:
          "Listings may be suspended if they repeatedly fail to meet platform standards.",
      },
    ],
  },
  {
    title: "Communication",
    items: [
      {
        question: "36. How should I communicate with guests?",
        answer:
          "Owners should provide clear communication regarding check-in instructions and property rules.",
      },
      {
        question: "37. Can I contact guests before arrival?",
        answer:
          "Yes, to provide check-in instructions and necessary information.",
      },
      {
        question: "38. Can I request guest identification in advance?",
        answer:
          "Yes, if required for security or regulatory purposes.",
      },
      {
        question: "39. What if a guest does not follow house rules?",
        answer:
          "Owners may take appropriate action depending on the situation.",
      },
      {
        question: "40. Can I refuse bookings for specific conditions?",
        answer:
          "Yes, provided the conditions comply with applicable regulations.",
      },
    ],
  },
  {
    title: "Property Management",
    items: [
      {
        question: "41. Can I appoint a property manager?",
        answer:
          "Yes. Owners may assign a manager or representative to manage bookings and guest interactions.",
      },
      {
        question: "42. Can I set my own property pricing?",
        answer:
          "Yes. Owners may set pricing based on season, demand, and availability.",
      },
      {
        question: "43. Can I offer discounts for longer stays?",
        answer:
          "Yes. Owners may offer discounts for extended stays if desired.",
      },
      {
        question: "44. Can I update amenities offered at my property?",
        answer:
          "Yes. Amenities should be updated whenever changes occur.",
      },
      {
        question: "45. Can I restrict events or parties at my property?",
        answer:
          "Yes. Owners may prohibit events, gatherings, or parties.",
      },
    ],
  },
  {
    title: "Guest Conduct",
    items: [
      {
        question: "46. What should I do if guests damage my property?",
        answer:
          "Owners should document the issue and report it through the appropriate channels.",
      },
      {
        question: "47. Can I request a security deposit from guests?",
        answer:
          "Security deposit policies may be defined depending on property rules.",
      },
      {
        question: "48. Can I refuse check-in if guests exceed occupancy limits?",
        answer:
          "Yes. Guests must comply with occupancy rules.",
      },
      {
        question: "49. Can I offer additional services such as meals or transport?",
        answer:
          "Yes, optional services may be offered if clearly communicated in the listing.",
      },
      {
        question: "50. Can guests extend their stay?",
        answer:
          "Stay extensions may be allowed if the property remains available.",
      },
    ],
  },
  {
    title: "Platform Policies",
    items: [
      {
        question: "51. Can the platform suspend my listing?",
        answer:
          "Yes, if platform policies are violated.",
      },
      {
        question: "52. What if I receive incorrect information from a guest?",
        answer:
          "You should report the issue to the platform support team.",
      },
      {
        question: "53. Can I remove my property listing anytime?",
        answer:
          "Yes. Owners may request removal of their listing.",
      },
      {
        question: "54. Who is responsible for managing the property?",
        answer:
          "Property owners remain responsible for property operations unless otherwise agreed.",
      },
      {
        question: "55. Does the platform manage the property?",
        answer:
          "The platform acts as a facilitator unless specific management services are provided.",
      },
    ],
  },
  {
    title: "Additional Questions",
    items: [
      {
        question: "56. Can international travellers book my property?",
        answer:
          "Yes, subject to applicable regulations and property policies.",
      },
      {
        question: "57. Can I set a minimum stay requirement?",
        answer:
          "Yes. Owners may define minimum stay requirements.",
      },
      {
        question: "58. Can I update pricing during peak seasons?",
        answer:
          "Yes. Owners may adjust pricing based on demand.",
      },
      {
        question: "59. How can I increase bookings for my property?",
        answer:
          "Maintaining accurate listings, high-quality photos, competitive pricing, and good property standards can improve bookings.",
      },
      {
        question: "60. How can I contact platform support for assistance?",
        answer:
          "Owners may contact the support team through official communication channels provided on the platform.",
      },
    ],
  },
];

const travellerFaqGroups: FaqGroup[] = [
  {
    title: "General Questions",
    items: [
      {
        question: "1. What services does the platform provide?",
        answer:
          "Our platform connects travellers with property owners and facilitates property bookings through a streamlined reservation process.",
      },
      {
        question: "2. Do you own the listed properties?",
        answer:
          "No. We act as a facilitator between travellers and property owners unless explicitly stated otherwise.",
      },
      {
        question: "3. How do I use the platform?",
        answer:
          "You can browse property listings, select a property of interest, submit an inquiry, and proceed with the booking process through our platform.",
      },
      {
        question: "4. Do I need an account to make a booking?",
        answer:
          "In some cases, you may be required to create an account to complete a booking or manage your reservation.",
      },
      {
        question: "5. Are the property listings verified?",
        answer:
          "Property listings may be reviewed before publication, but travellers should always review property details carefully before booking.",
      },
    ],
  },
  {
    title: "Booking Related Questions",
    items: [
      {
        question: "6. How do I book a property?",
        answer:
          "Select the desired property, submit an inquiry, confirm availability, and pay the applicable commission to initiate the booking process.",
      },
      {
        question: "7. How will I know if my booking is confirmed?",
        answer:
          "You will receive confirmation details once the booking process has been completed and verified.",
      },
      {
        question: "8. Can I book multiple properties at the same time?",
        answer:
          "Yes, subject to availability and booking terms.",
      },
      {
        question: "9. How far in advance can I book a property?",
        answer:
          "Booking availability depends on the property owner&apos;s schedule and listing availability.",
      },
      {
        question: "10. Can I request specific amenities or services?",
        answer:
          "Yes. You may communicate your preferences during the inquiry stage.",
      },
    ],
  },
  {
    title: "Payments and Commission",
    items: [
      {
        question: "11. Is there a commission or service fee?",
        answer:
          "Yes. A commission or service fee may be charged to facilitate property bookings.",
      },
      {
        question: "12. When do I need to pay the commission?",
        answer:
          "The commission must be paid when initiating the booking process.",
      },
      {
        question: "13. What payment methods are accepted?",
        answer:
          "Approved payment methods may include bank transfers, digital payments, or other supported payment gateways.",
      },
      {
        question: "14. Are there any hidden charges?",
        answer:
          "No. Any applicable service fee or commission will be communicated before booking confirmation.",
      },
      {
        question: "15. Do I receive a payment confirmation?",
        answer:
          "Yes. Once payment is processed, a confirmation will be provided.",
      },
    ],
  },
  {
    title: "Refund and Cancellation",
    items: [
      {
        question: "16. Is the commission refundable?",
        answer:
          "No. Once the commission is paid and the booking process has started, it is considered non-refundable.",
      },
      {
        question: "17. Can I cancel my booking request?",
        answer:
          "Yes. However, the commission amount will not be refunded.",
      },
      {
        question: "18. Can I use the commission for another property?",
        answer:
          "Yes. The commission may be applied toward another property within 30 days.",
      },
      {
        question: "19. What if I do not choose another property within 30 days?",
        answer:
          "The commission amount may be forfeited if not utilized within the specified period.",
      },
      {
        question: "20. Can the company cancel my booking?",
        answer:
          "Bookings may be cancelled if required due to property availability issues or policy violations.",
      },
    ],
  },
  {
    title: "Property Information",
    items: [
      {
        question: "21. How accurate are property descriptions?",
        answer:
          "Property information is provided by property owners, and we encourage travellers to review details carefully.",
      },
      {
        question: "22. Are the photos of the properties real?",
        answer:
          "Photos are typically provided by property owners or managers.",
      },
      {
        question: "23. Can I request additional photos or details?",
        answer:
          "Yes. You may request more information before confirming your booking.",
      },
      {
        question: "24. Are all amenities guaranteed?",
        answer:
          "Amenities depend on the property owner&apos;s listing and may vary.",
      },
      {
        question: "25. Can property availability change after inquiry?",
        answer:
          "Yes. Availability may change based on other bookings or owner decisions.",
      },
      {
        question: "26. Can I visit the property before booking?",
        answer:
          "Yes. Property visits may be arranged prior to booking. The visit will be scheduled based on mutual discussion and the availability of the property owner or manager, and timings may vary depending on the owner&apos;s convenience and property accessibility.",
      },
    ],
  },
  {
    title: "Check-In and Stay",
    items: [
      {
        question: "27. What documents are required at check-in?",
        answer:
          "Valid identification may be required depending on the property&apos;s policies.",
      },
      {
        question: "28. What time is check-in and check-out?",
        answer:
          "Check-in and check-out times are determined by the property owner.",
      },
      {
        question: "29. Can I request early check-in or late check-out?",
        answer:
          "Such requests depend on property availability and owner approval.",
      },
      {
        question: "30. Are pets allowed in properties?",
        answer:
          "Pet policies vary by property and must be confirmed in advance.",
      },
      {
        question: "31. Can I host events at the property?",
        answer:
          "Events may only be allowed if approved by the property owner.",
      },
    ],
  },
  {
    title: "Communication",
    items: [
      {
        question: "32. How do I contact the property owner?",
        answer:
          "Communication may be facilitated through the platform once the booking process begins.",
      },
      {
        question: "33. Can I visit the property before booking?",
        answer:
          "Property visits may be arranged depending on the property owner&apos;s policy.",
      },
      {
        question: "34. Who should I contact for booking assistance?",
        answer:
          "Our support team is available to assist travellers throughout the booking process.",
      },
      {
        question: "35. What if I face issues during my stay?",
        answer:
          "You should contact the property owner or our support team for assistance.",
      },
      {
        question: "36. Can I change my contact details after booking?",
        answer:
          "Yes, you may update your contact details through your account or support channels.",
      },
    ],
  },
  {
    title: "Safety and Security",
    items: [
      {
        question: "37. Is my personal information safe?",
        answer:
          "Yes. We implement security measures to protect user data.",
      },
      {
        question: "38. How do you protect user privacy?",
        answer:
          "We follow recognized privacy practices and use secure systems to manage personal data.",
      },
      {
        question: "39. Are there safety checks for properties?",
        answer:
          "Basic listing reviews may be conducted, but travellers should verify property details independently.",
      },
      {
        question: "40. What if I suspect fraud?",
        answer:
          "You should immediately report suspicious activity to our support team.",
      },
      {
        question: "41. Can my account be suspended?",
        answer:
          "Yes. Accounts may be suspended for policy violations or fraudulent activity.",
      },
    ],
  },
  {
    title: "Platform Usage",
    items: [
      {
        question: "42. Can I share my account with others?",
        answer:
          "Account sharing is not recommended as users are responsible for all activity under their account.",
      },
      {
        question: "43. Can I modify my booking details?",
        answer:
          "Modifications may be possible depending on property availability.",
      },
      {
        question: "44. How do I update my account information?",
        answer:
          "You can update your profile details through your account settings.",
      },
      {
        question: "45. Can I delete my account?",
        answer:
          "Yes. Account deletion requests may be submitted through support channels.",
      },
      {
        question: "46. Do you provide customer support?",
        answer:
          "Yes. Our support team is available to assist with booking and platform-related inquiries.",
      },
    ],
  },
  {
    title: "Additional Questions",
    items: [
      {
        question: "47. Do you guarantee property availability?",
        answer:
          "Availability depends on property owners and cannot always be guaranteed.",
      },
      {
        question: "48. Are taxes included in the booking price?",
        answer:
          "Taxes may apply depending on applicable regulations and property policies.",
      },
      {
        question: "49. Do you offer travel assistance?",
        answer:
          "Our team may provide general guidance related to property bookings.",
      },
      {
        question: "50. Can property listings change over time?",
        answer:
          "Yes. Property details, pricing, and availability may change.",
      },
      {
        question: "51. How do I stay updated with new properties?",
        answer:
          "You may follow platform updates or subscribe to notifications where available.",
      },
      {
        question: "52. Can international travellers use the platform?",
        answer:
          "Yes. International travellers may use the platform subject to applicable booking policies.",
      },
    ],
  },
];

const FAQPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"owner" | "traveller">("owner");
  const [openKey, setOpenKey] = useState<string | null>(null);

  const handleToggle = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-neutral-900 dark:text-neutral-100 mb-6">
        Frequently Asked Questions
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 p-1">
          <button
            type="button"
            className={`px-4 py-2 text-sm md:text-base rounded-full transition-colors ${
              activeTab === "owner"
                ? "bg-primary-6000 text-white"
                : "text-neutral-700 dark:text-neutral-300"
            }`}
            onClick={() => {
              setActiveTab("owner");
              setOpenKey(null);
            }}
          >
            Owners&apos; FAQs
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm md:text-base rounded-full transition-colors ${
              activeTab === "traveller"
                ? "bg-primary-6000 text-white"
                : "text-neutral-700 dark:text-neutral-300"
            }`}
            onClick={() => {
              setActiveTab("traveller");
              setOpenKey(null);
            }}
          >
            Travellers&apos; FAQs
          </button>
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {activeTab === "owner" ? (
          <div className="space-y-6">
            {ownerFaqGroups.map((group, groupIndex) => (
              <div key={`owner-group-${groupIndex}`} className="space-y-3">
                <h2 className="font-semibold text-base md:text-lg text-neutral-900 dark:text-neutral-100">
                  {group.title}
                </h2>
                {group.items.map((item, itemIndex) => {
                  const key = `owner-${groupIndex}-${itemIndex}`;
                  const isOpen = openKey === key;
                  return (
                    <div
                      key={key}
                      className="border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900"
                    >
                      <button
                        type="button"
                        className="w-full flex justify-between items-center px-4 py-3 text-left"
                        onClick={() => handleToggle(key)}
                      >
                        <span className="font-medium text-sm md:text-base text-neutral-900 dark:text-neutral-100">
                          {item.question}
                        </span>
                        <span className="ml-4 text-xl text-neutral-500">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {travellerFaqGroups.map((group, groupIndex) => (
              <div key={`group-${groupIndex}`} className="space-y-3">
                <h2 className="font-semibold text-base md:text-lg text-neutral-900 dark:text-neutral-100">
                  {group.title}
                </h2>
                {group.items.map((item, itemIndex) => {
                  const key = `traveller-${groupIndex}-${itemIndex}`;
                  const isOpen = openKey === key;
                  return (
                    <div
                      key={key}
                      className="border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900"
                    >
                      <button
                        type="button"
                        className="w-full flex justify-between items-center px-4 py-3 text-left"
                        onClick={() => handleToggle(key)}
                      >
                        <span className="font-medium text-sm md:text-base text-neutral-900 dark:text-neutral-100">
                          {item.question}
                        </span>
                        <span className="ml-4 text-xl text-neutral-500">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQPage;

