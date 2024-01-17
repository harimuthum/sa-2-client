/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function page() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !username || !password) {
      toast.error("Please fill in all fields");
      // alert("Please fill in all fields");
      return;
    }
    try {
      const request = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          username,
          password,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await request.json();
      if (data.error_message) {
        toast.error(data.error_message);
        // alert("Error: " + data.error_message);
      } else {
        toast.success(data.message);
        // alert("Success: " + data.message);
        setTimeout(() => {
          router.push("/login");
        }, 2500);
      }
    } catch (err) {
      console.error(err);
      toast.error("Account creation failed");
      // alert("Error : Account creation failed");
    }
  };

  return (
    <main className="w-full min-h-[100vh] flex flex-col items-center justify-center">
      <form
        className="w-full min-h-[80vh] flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-10 font-bold text-3xl">Create an account</h2>
        <label htmlFor="email" className="font-bold text-xl">
          Email Address
        </label>
        <input
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 w-[60%] border-2 border-gray-400 mb-5"
        />
        <label htmlFor="username" className="font-bold text-xl">
          Username
        </label>
        <input
          name="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 w-[60%] border-2 border-gray-400 mb-5"
        />
        <label htmlFor="password" className="font-bold text-xl">
          Password
        </label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 w-[60%] border-2 border-gray-400 mb-5"
        />
        <button className="w-[200px] p-[15px] border-2 border-gray-600 bg-[#e28521] rounded-md px-8 py-2 text-slate-800 font-bold transition duration-500 ease-in-out hover:bg-[#5c4223] hover:text-white">
          REGISTER
        </button>
        <div className="text-center my-8 flex flex-row">
          Already have an account?{" "}
          <div className="ml-1 transition duration-500 ease-in-out hover:scale-105">
            <Link className="link font-bold" href={"/login"}>
              Sign in
            </Link>
          </div>
        </div>
      </form>
      <ToastContainer />
    </main>
  );
}

export default page;
