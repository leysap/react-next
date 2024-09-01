"use client";
import { deliveryNoteById } from "../utils/user";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DeliverynoteID({ id }) {
  const [token, setToken] = useState(null);
  const [deliverynote, setDeliveryNote] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt");
      setToken(storedToken);
      localStorage.setItem("deliverynoteId", id); // Guardamos el ID del albaran en localStorage
    }
  }, [id]);

  useEffect(() => {
    if (token) {
      const fetchDeliverynoteByID = async () => {
        try {
          const deliverynote = await deliveryNoteById(id, token); // Cambiar storedToken por token
          setDeliveryNote(deliverynote);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchDeliverynoteByID();
    }
  }, [token, id]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 mb-4">
        <h2 className="text-xl text-gray-700 mb-4">ID del Albarán: {deliverynote._id}</h2>
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <pre className="whitespace-pre-wrap break-words text-sm text-gray-800">
            {JSON.stringify(deliverynote, null, 2)}
          </pre>
        </div>
      </div>
      <Link href="/user/deliverynotes" className="mt-4 text-blue-500 hover:underline">VOLVER</Link>
    </div>
  );
}
