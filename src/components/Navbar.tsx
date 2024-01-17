"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();

  const [userID, setuserID] = useState("");
  const [userNAME, setUsername] = useState("");

  useEffect(() => {
    let id;
    id = localStorage.getItem("_id") || "";
    setuserID(localStorage.getItem("_id") || "");
    setUsername(localStorage.getItem("_myUsername") || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("_id");
    localStorage.removeItem("_myEmail");
    localStorage.removeItem("_myUsername");
    router.push("/");
  };

  return (
    <nav className="bg-[#c58940] h-[12vh] flex flex-row items-center justify-evenly">
      <div className="w-[10%] flex flex-col items-center justify-center font-black text-2xl transition duration-500 ease-in-out hover:scale-105">
        Icon
      </div>
      {/* //flex justify-center font-black text-2xl transition duration-500 */}
      {/* ease-in-out hover:scale-105 */}
      <div className="w-[50%] flex flex-row">
        <ul className="flex flex-row w-[70%] justify-evenly text-sm">
          <li className="transition duration-500 ease-in-out hover:scale-110">
            <Link href={`/landing/${userID}`}>Home</Link>
          </li>
          <li className="transition duration-500 ease-in-out hover:scale-110">
            <Link href={`/dashboard/${userID}`}>Dashboard</Link>
          </li>
          <li className="transition duration-500 ease-in-out hover:scale-110">
            <Link href={`/profile/${userID}`}>Profile</Link>
          </li>
          <li className="transition duration-500 ease-in-out hover:scale-110">
            <Link href={`/bookuser/${userNAME}`}>Book-A-User</Link>
          </li>
        </ul>
      </div>
      <div className="w-[10%]">
        <button
          onClick={() => {
            handleLogout();
            router.push("/login");
          }}
          className="bg-[#f7ede2] border-2 border-gray-600 rounded-md px-8 py-2 text-slate-800 font-bold transition duration-500 ease-in-out hover:bg-[#5c4223] hover:text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
