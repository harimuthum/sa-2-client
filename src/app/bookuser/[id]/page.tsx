/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ErrorPage from "@/components/ErrorPage";
import emailjs from "@emailjs/browser";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
}

function page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [schedules, setSchedules] = useState(["Select any session"]);
  const [timezone, setTimezone] = useState("");
  const [error, setError] = useState(false);
  const [receiverEmail, setReceiverEmail] = useState("");
  const [duration, setDuration] = useState("");
  const [appointment, setAppointment] = useState<any>({
    day: "",
    startTime: "",
    endTime: "",
  });

  const [loading, setLoading] = useState(true);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const user = params.id;

  useEffect(() => {
    if (!localStorage.getItem("_id")) {
      toast.error("You are not logged in");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  }, [router]);

  const sendMail = () => {
    emailjs
      .send(
        "service_6kfueub", //"YOUR_SERVICE_ID",
        "template_78s6ai6", //"YOUR_TEMPLATE_ID",
        {
          to_email: receiverEmail,
          from_email: email,
          fullName,
          message,
          duration,
        },
        "7OqKBNSJcz5qLX9S7" //"YOUR_PUBLIC_KEY"
      )
      .then(
        (result: any) => {
          console.log(result.text);
          toast.success("Session booked successfully!");
          // alert("Success : Session booked successfully!");
        },
        (error: any) => {
          console.log(error.text);
          // alert("Error :" + error.text);
          toast.error(error.text);
        }
      );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (email === "" || fullName === "" || message === "" || duration === "") {
      toast.error("Please fill in all fields");
      return;
    }

    // sendMail();

    try {
      const request = await fetch(
        `http://localhost:5000/api/form/save-submitted-form`,
        {
          method: "POST",
          body: JSON.stringify({
            user_id: localStorage.getItem("_id"),
            artistEmail: receiverEmail,
            clientEmail: email,
            clientName: fullName,
            message,
            duration,
            appointment,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await request.json();
      if (data.error_message) {
        toast.error("Errorr: " + data.error_message);
      } else {
        toast.success(data.message);

        //Empty all fields after submission of form
        setFullName("");
        setEmail("");
        setMessage("");
        setDuration("");

        // setTimeout(() => {
        //   router.push("/");
        // }, 2500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getScheduleDetails() {
      await fetch(`http://localhost:5000/api/form/get-schedule-timezone`, {
        method: "POST",
        body: JSON.stringify({
          username: user,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error_message) {
            toast.error("ErrorHere: " + data.error_message);
            setError(true);
          } else {
            setTimezone(data.timezone.label);
            // setSchedules(data.schedules);
            setSchedules([...schedules, ...data.schedules]);
            setReceiverEmail(data.receiverEmail);
          }
        })
        .catch((err) => console.error(err));

      setLoading(false);
    }
    getScheduleDetails();
  }, [user]);

  // if (error) {
  //   return <ErrorPage error="User doesn't exist" />;
  // }

  return (
    <div>
      <Navbar />
      <main className="w-full min-h-[90vh] flex items-center justify-center flex-col p-[30px]">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2 className="text-2xl mb-3">
              Book a session with <span className="font-bold">@{user}</span>{" "}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex justify-center flex-col w-[70%] p-10 mx-0 my-auto border-2 "
            >
              <label htmlFor="fullName" className="font-semibold">
                Full Name
              </label>
              <input
                name="fullName"
                type="text"
                onChange={(e) => setFullName(e.target.value)}
                className="p-1 mb-4 border-2 border-gray-600 rounded-md"
              />
              <label htmlFor="email" className="font-semibold">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="p-1 mb-4 border-2 border-gray-600 rounded-md"
              />

              <label htmlFor="message" className="font-semibold">
                Any important note? (optional)
              </label>
              <textarea
                rows={5}
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="p-1 mb-4 border-2 border-gray-600 rounded-md"
              />

              <label htmlFor="session">
                Select your preferred session -{" "}
                <span className="font-semibold">{timezone}</span>
              </label>
              <select
                name="duration"
                onChange={async (e) => {
                  // console.log(e.target.value);
                  setDuration(e.target.value);
                  if (e.target.value === "Select any session") {
                    setAppointment({ day: "", startTime: "", endTime: "" });
                    return;
                  } else {
                    const [day, Time] = e.target.value.split(" - ");
                    const [startTime, endTime] = Time.split(" : ");
                    await setAppointment({ day, startTime, endTime });
                  }
                  // console.log(appointment);
                }}
                className=" border-2 border-gray-600 rounded-md p-3"
              >
                {schedules.map((schedule: any, idx) => (
                  <option
                    value={
                      typeof schedule === "string"
                        ? schedule
                        : `${schedule.day} - ${schedule.startTime} : ${schedule.endTime}`
                    }
                    key={idx}
                  >
                    {typeof schedule === "string"
                      ? schedule
                      : `${schedule.day} - ${schedule.startTime} : ${schedule.endTime}`}
                  </option>
                ))}
              </select>

              <button className="p-3 mt-[20px] bg-[#c58940] text-white border-2 border-black rounded-md text-lg font-bold transition duration-500 ease-in-out hover:bg-[#5c4223] hover:text-white">
                SUBMIT FORM
              </button>
            </form>
          </>
        )}
      </main>
      <ToastContainer />
    </div>
  );
}

export default page;
