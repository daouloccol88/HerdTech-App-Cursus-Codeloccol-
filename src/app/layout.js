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

        <div className={showNavbar ? "d-flex" : "d-block"}>
          {/* Sidebar (mobile only, fixed) */}

          {showNavbar && (
            <div className="d-block d-lg-none">
              <div
                className="position-fixed thm-bg-light"
                style={{ width: "100px", height: "100vh", left: 0, top: 0 }}
              >
                <Sidebar />
              </div>
            </div>
          )}

          {/* Main content */}
          <div
            className={
              showNavbar
                ? "flex-grow-1 thm-bg-dark main-content"
                : "flex-grow-1 thm-bg-dark "
            }
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
