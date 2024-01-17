/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please fill in all fields");
      // alert("Please fill in all fields");
      return;
    }

    try {
      const request = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify({
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
        //👇🏻If login successful
        // alert("Success :" + data.message);
        toast.success(data.message);
        //👇🏻 saves the email and id for identification
        localStorage.setItem("_id", data.data._id);
        localStorage.setItem("_myEmail", data.data._email);
        localStorage.setItem("_myUsername", data.data._username);

        setTimeout(() => {
          router.push("/landing/" + data.data._id);
        }, 1000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="w-full min-h-[100vh] flex flex-col items-center justify-center">
      <form
        className="w-full min-h-[80vh] flex flex-col items-center justify-center"
        onSubmit={handleLogin}
      >
        <h2 className="mb-10 font-bold text-3xl">Log into your account</h2>
        <label htmlFor="username" className="font-bold text-xl">
          Username
        </label>
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 w-[60%] border-2 border-gray-400 mb-8"
        />
        <label htmlFor="password" className="font-bold text-xl">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 w-[60%] border-2 border-gray-400 mb-6"
        />
        <button className="w-[200px] p-[15px] border-2 border-gray-600 bg-[#e28521] rounded-md px-8 py-2 text-slate-800 font-bold transition duration-500 ease-in-out hover:bg-[#5c4223] hover:text-white">
          LOG IN
        </button>
        <div className="text-center my-8 flex flex-row">
          {"Don't have an account?  "}
          <div className="ml-1 transition duration-500 ease-in-out hover:scale-105 ">
            <Link className="font-bold" href="/register">
              Create one
            </Link>
          </div>
        </div>
      </form>
      <ToastContainer />
    </main>
  );
}

export default page;
