"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="text-center">
        <h3>Please Wait...</h3>
        <div class="spinner-border " role="status">
          <span class="visually-hidden ">Loading...</span>
        </div>
      </div>
    </div>
  );
}
