"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

const MapPage = () => {
  return (
    <div>
      <MapClient />
    </div>
  );
};

export default MapPage;
