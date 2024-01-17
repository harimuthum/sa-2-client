/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import TimezoneSelect, { type ITimezone } from "react-timezone-select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const time = [
    { id: "null", t: "Select" },
    { id: "7", t: "7:00am" },
    { id: "8", t: "8:00am" },
    { id: "9", t: "9:00am" },
    { id: "10", t: "10:00am" },
    { id: "11", t: "11:00am" },
    { id: "12", t: "12:00pm" },
    { id: "13", t: "13:00pm" },
    { id: "14", t: "14:00pm" },
    { id: "15", t: "15:00pm" },
    { id: "16", t: "16:00pm" },
    { id: "17", t: "17:00pm" },
    { id: "18", t: "18:00pm" },
    { id: "19", t: "19:00pm" },
  ];

  const [schedule, setSchedule] = useState([
    { day: "Sun", startTime: "", endTime: "" },
    { day: "Mon", startTime: "", endTime: "" },
    { day: "Tue", startTime: "", endTime: "" },
    { day: "Wed", startTime: "", endTime: "" },
    { day: "Thu", startTime: "", endTime: "" },
    { day: "Fri", startTime: "", endTime: "" },
    { day: "Sat", startTime: "", endTime: "" },
  ]);

  const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  //👇🏻 This updates the schedule array with the start and end time.
  const handleTimeChange = ({ e, id }: any) => {
    const { name, value } = e.target;
    if (value === "Select") return;

    setSchedule((prevSchedule) =>
      prevSchedule.map((item, index) =>
        index === id ? { ...item, [name]: value } : item
      )
    );
  };

  //👇🏻 Logs the user's schedule to the console after setting the availability
  const handleSaveSchedules = async () => {
    if (JSON.stringify(selectedTimezone) !== "{}") {
      try {
        await fetch("http://localhost:5000/api/artist/set-schedule-timezone", {
          method: "POST",
          body: JSON.stringify({
            userId: localStorage.getItem("_id"),
            timezone: selectedTimezone,
            schedule,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        //👇🏻 navigates to the profile page
        toast.success("Schedule saved successfully");
        setTimeout(() => {
          router.push(`/profile/${localStorage.getItem("_id")}`);
        }, 1500);
      } catch (err) {
        console.error(err);
      }
    } else {
      toast.error("Please select your timezone");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("_id")) {
      toast.error("You are not logged in");
      setTimeout(() => {
        router.push("/");
      }, 2500);
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <main className="p-[20px] flex flex-col items-center">
        <h2 className="font-bold text-2xl my-7 mb-[25px]">
          Select your availability
        </h2>
        <div className="w-[50%] p-2 border-2 rounded-xl border-gray-400 flex flex-col items-center justify-center">
          <p className="font-bold px-2">Pick your timezone</p>
          <TimezoneSelect
            className="w-[80%] m-2 border-2 border-gray-700 rounded-md"
            value={selectedTimezone}
            instanceId={"timezone-select"}
            onChange={setSelectedTimezone}
          />

          {schedule.map((sch, id) => (
            <div
              className="w-full flex flex-row items-center justify-center mt-[30px]"
              key={id}
            >
              <p className="text-lg font-semibold mr-5">{sch.day}</p>
              <div className="flex items-center border-2 border-gray-400 rounded-md">
                <div className="flex items-end m-[15px]">
                  <label htmlFor="startTime">Start Time</label>
                  <select
                    name="startTime"
                    className="p-[5px] ml-3 mr-10 min-w-[150px] border-2 border-black rounded-sm"
                    onChange={(e) => handleTimeChange({ e, id })}
                  >
                    {time.map((t) => (
                      <option key={t.id} value={t.t} id={t.id}>
                        {t.t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end m-[15px]">
                  <label htmlFor="endTime">End Time</label>
                  <select
                    name="endTime"
                    onChange={(e) => handleTimeChange({ e, id })}
                    className="p-[5px] ml-3 min-w-[150px] border-2 border-black rounded-sm"
                  >
                    {time.map((t) => (
                      <option key={t.id} value={t.t} id={t.id}>
                        {t.t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full p-[30px] flex items-center justify-center">
          <button
            onClick={() => {
              console.log(schedule, selectedTimezone);
              handleSaveSchedules();
            }}
            className="bg-[#f9d4ac] rounded-md px-8 py-2 text-slate-800 font-bold border-2 border-gray-500 transition duration-500 ease-in-out hover:bg-[#5c4223] hover:text-white"
          >
            SAVE SCHEDULES
          </button>
        </div>

        <ToastContainer />
      </main>
    </>
  );
}

export default page;
