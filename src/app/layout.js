"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import FirstTimeDataLoader from "@/utils/FirstTimeDataLoader";
import BootstrapClient from "@/utils/BoostrapClient";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Navbar/Sidebar";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const showNavbar = pathname !== "/login";
  return (
    <html lang="en">
      <body className="themed light">
        {showNavbar && <Navbar />}
        <div className="d-flex">
          <div
            className="d-block d-lg-none thm-bg-light position-fixed"
            style={{ height: "100vh", width: "100px", top: 0, left: 0 }}
          >
            <Sidebar />
          </div>
          <div
            className="flex-grow-1 thm-bg-dark"
            style={{ paddingLeft: "120px", paddingRight: "20px" }}
          >
            {children}
          </div>
        </div>
        <FirstTimeDataLoader />
        <BootstrapClient />
      </body>
    </html>
  );
}
