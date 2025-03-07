"use client";

import { FaPinterest } from "react-icons/fa";
import { useRef, useState } from "react";
import {
  Plane,
  MapPin,
  Users,
  ChevronDown,
  ChevronUp,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
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
      title: "How far in advance should?",
      content:
        "For peak season travel (summer, holidays), we recommend booking 6-8 months in advance. For off-peak travel, 3-4 months is usually sufficient to secure the best rates and availability.",
    },
    {
      title: "Do you offer travel insurance?",
      content:
        "Yes, we offer comprehensive travel insurance packages that cover trip cancellation, medical emergencies, lost luggage, and more. We strongly recommend purchasing travel insurance for all international trips.",
    },
    {
      title: "What payment methods do you accept?",
      content:
        "We accept all major credit cards, bank transfers, and PayPal. For certain destinations, we also offer payment plans to help you budget for your dream vacation.",
    },
    {
      title: "Can you accommodate special dietary requirements?",
      content:
        "Absolutely! We can accommodate vegetarian, vegan, gluten-free, and other dietary requirements. Please let us know your needs when booking, and we'll ensure they're communicated to all relevant service providers.",
    },
  ];

  const testimonials = [
    {
      id: 1,
      initials: "JD",
      name: "John Doe",
      trip: "Bali Trip, 2024",
      review:
        "Our family vacation to Bali was absolutely perfect. The accommodations were luxurious, and the itinerary was well-balanced with adventure and relaxation.",
    },
    {
      id: 2,
      initials: "JS",
      name: "Jane Smith",
      trip: "Europe Tour, 2023",
      review:
        "The European tour exceeded all my expectations. The guides were knowledgeable, the hotels were charming, and the entire experience was seamless.",
    },
    {
      id: 3,
      initials: "RJ",
      name: "Robert Johnson",
      trip: "Japan Adventure, 2024",
      review:
        "Our trip to Japan was meticulously planned. From the cherry blossoms to the food tours, every detail was considered. Will definitely book with Vacation Saga again!",
    },
    {
      id: 4,
      initials: "LM",
      name: "Laura Miller",
      trip: "African Safari, 2023",
      review:
        "The African Safari was an unforgettable adventure! The wildlife, the guides, and the accommodations were all top-notch.",
    },
    {
      id: 5,
      initials: "MT",
      name: "Michael Thompson",
      trip: "Alaskan Cruise, 2024",
      review:
        "The Alaskan cruise was breathtaking. From glaciers to wildlife, every moment was magical. Highly recommend!",
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-1/2">
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                  Discover Your Perfect Getaway
                </h1>
                <p className="mt-3 max-w-md text-lg text-white opacity-90">
                  Explore breathtaking destinations and create unforgettable memories with
                  our expertly crafted vacation packages.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => scrollToSection(servicesRef)}
                    className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-orange-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    Chat with Us
                  </button>
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

        <section
          ref={testimonialsRef}
          className="relative w-full max-w-7xl mx-auto mt-16 p-4 "
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
                    Vacation Packages
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    All-inclusive vacation packages to popular destinations worldwide,
                    with flights, accommodations, and activities.
                  </p>
                </div>
              </div>

              {/* Service Card 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">Group Tours</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Guided group tours with expert local guides, perfect for solo
                    travelers or those looking to meet new people.
                  </p>
                </div>
              </div>

              {/* Service Card 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">
                    Custom Itineraries
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Personalized travel itineraries designed specifically for your
                    preferences, interests, and budget.
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
                Creating unforgettable travel experiences since 2010
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
                Creating unforgettable travel experiences since 2010.
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
