/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// interface Schedule {
//   day: string;
//   startTime: string;
//   endTime: string;
// }

const page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const [schedule, setSchedule] = useState<any>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [timezone, setTimezone] = useState<string>("");

  const { id } = params;

  useEffect(() => {
    if (!localStorage.getItem("_id")) {
      toast.error("You are not logged in. Redirecting...");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [router]);

  useEffect(() => {
    async function getUserDetails() {
      if (id) {
        const req = await fetch(
          `http://localhost:5000/api/artist/get-schedule/${id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const userData = await req.json();

        setUsername(userData.data.username);
        setSchedule(userData.data.schedule);
        setTimezone(userData.data.timezone.label);

        setLoading(false);
      }
    }
    getUserDetails();
  }, [id, loading]);

  return (
    <>
      <Navbar />
      <main className="min-h-[90vh] w-full flex flex-col items-center justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl mb-6">
              Hey, <span className="font-bold">{username}</span>
            </h2>
            <p className="text-base mb-3">
              Here is your schedule: -{" "}
              <span className="font-semibold">{timezone}</span>{" "}
            </p>
            <table className="border-2 border-gray-500 w-full border-collapse">
              <tbody>
                {schedule.map((sch: any) => (
                  <tr
                    className="border-2 border-gray-300 p-[20px]"
                    key={sch.day}
                  >
                    <td className="font-bold border-2 border-gray-300 p-[20px]">
                      {sch.day.toUpperCase()}
                    </td>
                    <td className="border-2 border-gray-300 p-[20px]">
                      {sch.startTime || "Unavailable"}
                    </td>
                    <td className="border-2 border-gray-300 p-[20px]">
                      {sch.endTime || "Unavailable"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <ToastContainer />
      </main>
    </>
  );
};

export default page;
