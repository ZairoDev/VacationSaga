"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Building2, Home } from "lucide-react"
import Link from 'next/link';
import { UrlObject } from "url";
// import {RouteImpl } from "@/routers/types";

const ListingSelectionPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-light mb-3 text-black text-center tracking-tight"
      >
        What would you like to list?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-gray-500 mb-12 text-center max-w-md"
      >
        Choose the type of property you want to list on our platform
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"
      >
        {/* Hotel Card */}
        <ListingCard
          icon={<Building2 className="w-6 h-6 text-orange-500" />}
          title="Hotel"
          description="Perfect for listing hotels, resorts, guesthouses and commercial stays."
          buttonText="Start Hotel Listing"
          href={{ pathname: "/add-hotel" }}
          delay={0.3}
        />

        {/* Property Card */}
        <ListingCard
          icon={<Home className="w-6 h-6 text-orange-500" />}
          title="Property"
          description="Ideal for homes, apartments, farmhouses, villas and unique stays."
          buttonText="Start Property Listing"
          href={{ pathname: "/add-listing" }}
          delay={0.4}
        />
      </motion.div>
    </div>
  )
}

interface ListingCardProps {
  icon: React.ReactNode
  title: string
  description: string
  buttonText: string
  href: UrlObject 
  delay: number
}

const ListingCard = ({ icon, title, description, buttonText, href, delay }: ListingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-8 flex flex-col items-center gap-5 shadow-sm hover:shadow-md transition-all"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>

      <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">{icon}</div>

      <h2 className="text-xl font-medium text-gray-800 group-hover:text-orange-500 transition-colors">
        List a {title}
      </h2>

      <p className="text-gray-500 text-center text-sm leading-relaxed">{description}</p>

      <Link href={href}>
        <div
          className="mt-2 w-full py-3 px-4 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-200 text-center cursor-pointer"
        >
          {buttonText}
        </div>
      </Link>
    </motion.div>
  )
}

export default ListingSelectionPage
