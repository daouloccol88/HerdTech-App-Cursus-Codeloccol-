"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [counts, setCounts] = useState({
    vache: 0,
    taureau: 0,
    mouton: 0,
    brebis: 0,
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      router.replace("/login");
      return;
    }

    const animals = JSON.parse(localStorage.getItem("animals")) || [];

    // Filter animals by user
    const userAnimals = animals.filter((a) => a.userId === currentUser.id);

    // Count by category
    const categoryCounts = {
      vache: userAnimals.filter((a) => a.category === "vache").length,
      taureau: userAnimals.filter((a) => a.category === "taureau").length,
      mouton: userAnimals.filter((a) => a.category === "mouton").length,
      brebis: userAnimals.filter((a) => a.category === "brebis").length,
    };

    setCounts(categoryCounts);
  }, [router]);

  return (
    <div className="thm-bg-dark pt-4 min-vh-100">
      <h1>Dashboard</h1>
      <p>Number of vache: {counts.vache}</p>
      <p>Number of taureau: {counts.taureau}</p>
      <p>Number of mouton: {counts.mouton}</p>
      <p>Number of brebis: {counts.brebis}</p>
    </div>
  );
}
