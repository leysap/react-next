"use client";
import Link from "next/link";
import ShowClient from "@/app/components/ShowClient";

export default function UserPortal() {
  return (
    <div className="bg-blue-900 min-h-screen w-full  flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-white mb-6">CLIENTES</h1>
      <div className="flex justify-center mb-8">
        <Link
          className="font-bold text-xl text-white bg-gray-800 hover:bg-gray-700 transition-colors duration-300 py-3 px-6 rounded-lg shadow-md"
          href="/user/client"
        >
          Crear nuevo cliente
        </Link>
      </div>
      <div className="w-full max-w-3xl p-4 bg-white rounded-lg shadow-lg">
        <ShowClient />
      </div>
    </div>
  );
}
