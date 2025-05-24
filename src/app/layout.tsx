// "use client"; // Ensures the component runs on the client side

// import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";
import SiteHeader from "./(client-components)/(Header)/SiteHeader";
import ClientCommons from "./ClientCommons";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { MyProvider } from "@/context/propertyContext";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Vacation Saga",
    template: "%s - Vacation Saga",
  },
  description: "Vacation Saga Rentals",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const pathname = usePathname();

  // List of pages that should NOT have the global layout
  // const noLayoutPages = ["/landing-page"];

  // if (noLayoutPages.includes(pathname)) {
  //   return <>{children}</>; // Renders the page without layout
  // }

  return (
    <MyProvider>
      <html lang="en" className={poppins.className}>
        <GoogleAnalytics />
        <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
          <ClientCommons />
          <SiteHeader />
          {children}
          <Footer />
        </body>
      </html>
    </MyProvider>
  );
}
