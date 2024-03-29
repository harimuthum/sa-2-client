/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingCard from "@/components/LandingCard";

import LandingDrawer from "@/components/LandingDrawer";
import Navbar from "@/components/Navbar";

import { IFormResponse } from "../../../interfaces/IFormResponse";
import TabComponent from "@/components/TabComponent";

function Landingpage({ params }: { params: { id: string } }) {
  const userID = params.id;
  const router = useRouter();

  const [formResponses, setFormResponses] = useState<IFormResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [cLoading, setCLoading] = useState(true);

  // const [formResponses, setFormResponses] = useState<IFormResponse[]>([]);
  const [pendingResponses, setPendingResponses] = useState<IFormResponse[]>([]);
  const [approvedResponses, setApprovedResponses] = useState<IFormResponse[]>(
    []
  );
  const filterData = (s: string) =>
    formResponses.filter((response) => response.statusOfClient === s);

  useEffect(() => {
    setFormResponses(formResponses);
    setApprovedResponses(filterData("Approved"));
    setPendingResponses(filterData("Pending"));

    console.log("Form Responses from Parent", formResponses);

    console.log("Before loading", loading, cLoading);
    // params.setLoading(false);
    setCLoading(false);
    console.log("After loading", loading, cLoading);
  }, [setCLoading]);

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleCardButton = () => {
    console.log("Hello ");
  };

  useEffect(() => {
    if (!localStorage.getItem("_id")) {
      toast.error("You are not logged in");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  }, [router]);

  useEffect(() => {
    async function getFormResponse() {
      const req = await fetch(
        `http://localhost:5000/api/form/get-form-responses`,
        {
          method: "POST",
          body: JSON.stringify({
            userID,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const res = await req.json();
      console.log("Data from Backend", res.data);
      setFormResponses(res.data);
    }
    getFormResponse();
    setLoading(false);
  }, [loading]);

  // console.log("formResponses above return", formResponses);
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center min-h-[80vh]">
        <h1 className="my-6 ">Clients{"'"} Responses</h1>
        <div className="h-[80%] w-[80%] p-5 m-3">
          <TabComponent />
        </div>
      </main>
      <ToastContainer />
    </>
  );
}

export default Landingpage;
