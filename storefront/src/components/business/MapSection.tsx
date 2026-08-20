"use client";

import dynamic from "next/dynamic";

const BusinessMap = dynamic(() => import("./BusinessMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[220px] items-center justify-center rounded-xl border border-gray-200 bg-gray-100 text-sm text-gray-400">
      Loading map…
    </div>
  ),
});

export default function MapSection({ lat, lng }: { lat: number; lng: number }) {
  return <BusinessMap lat={lat} lng={lng} />;
}
