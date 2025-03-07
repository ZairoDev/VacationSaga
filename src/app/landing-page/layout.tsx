"use client"; // Ensures the component runs on the client side
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { MyProvider } from "@/context/propertyContext";
import "../globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";

import "rc-slider/assets/index.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
;


  return (
    <MyProvider>
      <html lang="en" className={poppins.className}>
        <GoogleAnalytics />
        <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
          {/* <ClientCommons />  */}
        
          {children}
     
        </body>
      </html>
    </MyProvider>
  );
}
