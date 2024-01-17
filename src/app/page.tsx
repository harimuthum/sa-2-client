"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col justify-center p-24 bg-gradient-to-br from-yellow-700 via-green-200 to-pink-800 bg-opacity-75">
      <div className="min-h-[80vh] w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-6">
          Welcome to{" "}
          <a
            href="http://localhost:3000/"
            className="text-blue-600 hover:text-blue-500"
          >
            Silo
          </a>
        </h1>
        <Image
          src="/silo-icon.png"
          alt="silo-icon"
          width={250}
          height={250}
          className="w-40 h-40"
          priority
        />
        <div className="mt-5 p-3 flex flex-row justify-evenly items-center h-24 w-[500px] ">
          <button
            onClick={() => {
              router.push("/register");
            }}
            className="px-5 w-32 h-10 border-2 border-gray-500 rounded-md transition duration-500 ease-in-out hover:bg-[#5c4223] hover:text-white hover:border-none"
          >
            Sign-Up
          </button>
          <button
            onClick={() => {
              router.push("/login");
            }}
            className="px-5 w-32 h-10 border-2 border-gray-500 rounded-md transition duration-500 ease-in-out hover:bg-[#5c4223] hover:text-white hover:border-none"
          >
            Log-In
          </button>
        </div>
      </div>
    </main>
  );
}
