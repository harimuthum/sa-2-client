"use client";
import React from "react";

import { useRouter } from "next/navigation";
import LandingCard from "@/components/LandingCard";
import TabComponent from "@/components/TabComponent";
import Card from "@/components/Card";

const App: React.FC = () => {
  const sampleData = {
    name: "John Doe",
    status: "Active",
    message: "Hello, this is a sample message.",
    appointment: {
      day: "Monday",
      startTime: "10:00 AM",
    },
  };

  return (
    <div className="flex h-screen items-center justify-center">
      {/* <TabComponent /> */}
      {/* <LandingCard /> */}
      <Card data={sampleData} />
    </div>
  );
};

export default App;
