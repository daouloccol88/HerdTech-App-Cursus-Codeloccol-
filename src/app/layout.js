"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import FirstTimeDataLoader from "@/utils/FirstTimeDataLoader";
import BootstrapClient from "@/utils/BoostrapClient";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <FirstTimeDataLoader />
      <BootstrapClient />
    </html>
  );
}
