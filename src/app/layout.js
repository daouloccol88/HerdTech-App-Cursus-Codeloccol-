"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import FirstTimeDataLoader from "@/utils/FirstTimeDataLoader";
import BootstrapClient from "@/utils/BoostrapClient";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const showNavbar = pathname !== "/login";
  return (
    <html lang="en">
      <body className="themed light">
        {showNavbar && <Navbar />}
        {children}
        <FirstTimeDataLoader />
        <BootstrapClient />
      </body>
    </html>
  );
}
