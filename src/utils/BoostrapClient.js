"use client";
import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    // Dynamically import Bootstrap once the component mounts
    import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => {
      // Assign bootstrap to the global window so you can use it anywhere
      window.bootstrap = bootstrap;
    });
  }, []);

  return null;
}
