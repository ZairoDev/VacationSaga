"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { FaPinterest } from "react-icons/fa";
import {
  Plane,
  MapPin,
  Users,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "@/styles/index.scss";
import CallbackForm from "./callback";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const accordionData = [
    {
      title: "How do I book a stay through Vacation Saga?",
      content:
        "Booking is easy! Browse our listings, choose your ideal stay, and confirm your reservation directly through our secure platform.",
    },
    {
      title: "Are the properties verified?",
      content:
        "Yes! All properties listed on Vacation Saga are handpicked and verified to ensure safety, comfort, and quality for our guests.",
    },
    {
      title: "Can I book long-term stays?",
      content:
        "Absolutely! We offer both short-term getaways and long-term rentals to suit your travel plans.",
    },
    {
      title: "Do you offer customer support during my stay?",
      content:
        "Yes! Our support team is available 24/7 to assist you with any issues or questions during your vacation.",
    },
  ];

  const testimonials = [
    {
      id: 1,
      initials: "JD",
      name: "Tzika Gershuni",
      trip: "Bali Trip, 2024",
      review:
        "Vacation Saga helped me rent my properties in Chania a few times both short terms and for longer terms as well. The team is very accommodating, very pleasant to work with and speak fluent English",
    },
    {
      id: 2,
      initials: "JS",
      name: "Kiki Tsopelou",
      trip: "Europe Tour, 2023",
      review:
        "I had the best experience with Vacation saga I have 12 apartments in Greece and they are managing these with the best way Thanks so much for everything Go on with your good work",
    },
    {
      id: 3,
      initials: "RJ",
      name: "Yasmine Abid",
      trip: "Japan Adventure, 2024",
      review:
        "This agency is really professional, they’re always prompt with the answers and ready to help you find an apartment in no time. Special thank to the agent MAHEK who helped us through this journey",
    },
    {
      id: 4,
      initials: "LM",
      name: "Victor Costta",
      trip: "African Safari, 2023",
      review:
        "I had a very satisfactory experience. The entire team served me very well, they accompanied me on the visit to choose an apartment. I recommend the company 100%. Everything went well.",
    },
    {
      id: 5,
      initials: "MT",
      name: "Marialessandra Cecchi",
      trip: "Alaskan Cruise, 2024",
      review:
        "I was in an urgent situation since I needed to find an apartment in a short time. Vacation Saga provided me with the right solution on time. Highly recommended.",
    },
  ];

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="https://vacationsaga.b-cdn.net/assets/vsround.png"
                alt="Vacation Saga Logo"
                width={45}
                height={45}
                className="mr-2"
              />

              <a href="https://www.vacationsaga.com/">
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Vacation Saga
                </span>
              </a>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection(heroRef)}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection(testimonialsRef)}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection(servicesRef)}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection(aboutRef)}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection(accordionRef)}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                FAQ
              </button>
            </nav>
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-orange-500 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            <button
              onClick={() => scrollToSection(heroRef)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection(testimonialsRef)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 w-full text-left"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection(servicesRef)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 w-full text-left"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 w-full text-left"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection(accordionRef)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-50 w-full text-left"
            >
              FAQ
            </button>
          </div>
        </div>
      </header>

      <main>
        <section
          ref={heroRef}
          className="pt-24 pb-16 bg-gradient-to-r from-orange-400 to-amber-500"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-1/2 pr-4">
                <h1 className="text-4xl font-extrabold text-white sm:text-4xl md:text-5xl">
                  Your next address is just a click away!
                </h1>
                <p className="mt-3 max-w-md text-lg text-white opacity-90">
                  We provide comfort, affordability, and flexibility for both short trips
                  and long stays.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-orange-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 flex items-center justify-center"
                    href={`https://wa.me/+918960980806`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className=" flex items-center justify-center">
                      Chat with Us
                      <img
                        src="https://vacationsaga.b-cdn.net/assets/wsp.png"
                        alt="icon image"
                        className="h-12 w-12"
                      />
                    </div>
                  </Link>
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 md:py-4 md:text-lg md:px-10"
                  >
                    Schedule a callback
                  </button>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:w-1/2 hidden md:block">
                <div className="relative h-64 sm:h-72 md:h-96 rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                    alt="Beautiful beach destination"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          {showForm && <CallbackForm onClose={() => setShowForm(false)} />}
        </section>

        <section className=" flex justify-center mt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center">
              Why Choose Us?
            </h2>
            <p className=" text-neutral-600 text-lg mt-4 italic">
              Personalized service, dedicated agents, and hassle-free rentals—because your
              property deserves the best!
            </p>
          </div>
        </section>

        <section
          ref={testimonialsRef}
          className="relative w-full max-w-7xl mx-auto mt-4 p-4 "
        >
          <div className="text-center py-4">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Don&apos;t just take our word for it
            </p>
          </div>
          {/* Slider Wrapper */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1} // Default: 1 card visible
            breakpoints={{
              640: { slidesPerView: 1 }, // 1 card for small screens
              768: { slidesPerView: 2 }, // 2 cards for medium screens
              1024: { slidesPerView: 3 }, // 3 cards for large screens
            }}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            loop
            className="w-full"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
                  <p className="text-gray-600 italic">&quot;{testimonial.review}&quot;</p>
                  <h3 className="mt-4 text-lg font-semibold">{testimonial.name}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section ref={servicesRef} className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Our Services
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Comprehensive travel solutions tailored to your needs
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Service Card 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Plane className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">
                    Vacation Rentals
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Offering handpicked properties, from luxury villas to cozy stays. Find
                    your perfect home away from home!
                  </p>
                </div>
              </div>

              {/* Service Card 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">
                    Short Term Rentals
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Get the best short-term rentals — great stays, great prices, great
                    value.
                  </p>
                </div>
              </div>

              {/* Service Card 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    {/* <MapPin className="h-6 w-6 text-orange-500" /> */}
                    <Users className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">
                    Long Term Rentals
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Find comfortable and affordable long-term rentals — your home for as
                    long as you need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={aboutRef} className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                About Us
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Creating unforgettable travel experiences since 2017
              </p>
            </div>
            <div className="mt-12 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900">Our Mission</h3>
                <p className="mt-3 text-lg text-gray-500">
                  At Vacation Saga, we believe that travel has the power to transform
                  lives. Our mission is to create personalized travel experiences that
                  inspire, educate, and bring joy to our clients.
                </p>
                <div className="mt-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Expert Team</h4>
                      <p className="mt-1 text-base text-gray-500">
                        Our team of travel experts has visited over 100 countries.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <MapPin className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">
                        Global Destinations
                      </h4>
                      <p className="mt-1 text-base text-gray-500">
                        We offer packages to over 500 destinations worldwide.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 hidden lg:block">
                <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                    alt="Our team"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={accordionRef} className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Find answers to common questions about our services
              </p>
            </div>
            <div className="mt-12 max-w-3xl mx-auto">
              <div className="space-y-4">
                {accordionData.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 focus:outline-none"
                      onClick={() => toggleAccordion(index)}
                    >
                      <span className="text-lg font-medium text-gray-900">
                        {item.title}
                      </span>
                      {openAccordion === index ? (
                        <ChevronUp className="h-5 w-5 text-orange-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-orange-500" />
                      )}
                    </button>
                    {openAccordion === index && (
                      <div className="p-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-600">{item.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <Image
                  src="https://vacationsaga.b-cdn.net/assets/vsround.png"
                  alt="Vacation Saga Logo"
                  width={45}
                  height={45}
                  className="mr-2"
                />
                <span className="ml-2 text-xl font-bold">Vacation Saga</span>
              </div>
              <p className="mt-4 text-base text-gray-400">
                Creating unforgettable travel experiences since 2017.
              </p>
              <p className="mt-2 text-base text-gray-400">
                117/N/70 3rd Floor Kakadeo Kanpur
              </p>
              <p className="mt-2 text-base text-gray-400">
                info@vacationsaga.com | +91 8960980806
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://www.facebook.com/Vacationsaga/"
                className="text-gray-400 hover:text-white"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://in.pinterest.com/vacationsaga/"
                className="text-gray-400 hover:text-white"
              >
                <FaPinterest className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/vacationsaga/?hl=en"
                className="text-gray-400 hover:text-white"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://in.linkedin.com/company/vacationsaga"
                className="text-gray-400 hover:text-white"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; {new Date().getFullYear()} Vacation Saga. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
