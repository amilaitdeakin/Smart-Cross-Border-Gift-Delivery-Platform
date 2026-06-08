import { Suspense } from "react";
import OrderTrackingPage from "@/components/track-public";

const page = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FFFBF5] text-[#3D2C1F] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#D36B31] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500">Loading tracking portal...</p>
        </div>
      </div>
    }>
      <OrderTrackingPage />
    </Suspense>
  );
};

export default page;

