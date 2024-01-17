/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState, useEffect } from "react";
import LandingDrawer from "@/components/LandingDrawer";

import { IFormResponse } from "../../../interfaces/IFormResponse";

function page() {
  const [loading, setLoading] = useState<Boolean>(true);
  const [formResponses, setFormResponses] = useState<IFormResponse[]>([
    {
      artist_id: "1",
      clientName: "John Doe",
      clientEmail: "john@example.com",
      message: "This is a test message",
      duration: "1 hour",
      appointment: {
        day: "2024-01-15",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
      },
      statusOfClient: "Pending",
    },
    {
      artist_id: "2",
      clientName: "Jane Smith",
      clientEmail: "jane@example.com",
      message: "Another test message",
      duration: "30 minutes",
      appointment: {
        day: "2024-01-16",
        startTime: "02:30 PM",
        endTime: "03:00 PM",
      },
      statusOfClient: "Approved",
    },
    {
      artist_id: "3",
      clientName: "Bob Johnson",
      clientEmail: "bob@example.com",
      message: "Test message for Bob",
      duration: "45 minutes",
      appointment: {
        day: "2024-01-17",
        startTime: "12:00 PM",
        endTime: "12:45 PM",
      },
      statusOfClient: "Pending",
    },
  ]);

  useEffect(() => {
    async function getFormResponse() {
      const req = await fetch(
        `http://localhost:5000/api/form/get-form-responses`,
        {
          method: "POST",
          body: JSON.stringify({
            userID: localStorage.getItem("_id"),
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          // console.log("From BackEnd", res.data);
          const updatedData = res.data.map((response: IFormResponse) => {
            return {
              artist_id: response.artist_id,
              clientName: response.clientName,
              clientEmail: response.clientEmail,
              message: response.message,
              duration: response.duration,
              appointment: {
                day: response.appointment.day,
                startTime: response.appointment.startTime,
                endTime: response.appointment.endTime,
              },
              statusOfClient: response.statusOfClient,
            };
          });
          // console.log("Processed Data", updatedData);

          setFormResponses([...formResponses, ...updatedData]);
          // console.log("After Setting", formResponses);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
    getFormResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center">
      <div className="h-[80%] w-[80%] p-5 m-10">
        <LandingDrawer PformResponses={formResponses} />
      </div>
    </div>
  );
}

export default page;
