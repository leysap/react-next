"use client";
import Link from "next/link";
import { getDeliverynote } from "../utils/user";
import { useEffect, useState } from "react";

export default function ShowDeliverynotes() {
  const [token, setToken] = useState(null);
  const [deliverynoteData, setDeliverynoteData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt");
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetchDeliverynoteData = async () => {
        try {
          const recordDeliverynote = await getDeliverynote(token);
          setDeliverynoteData(recordDeliverynote);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchDeliverynoteData();
    }
  }, [token]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-red-600 bg-gray-100">
        Error: {error}
      </div>
    );
  }

  if (deliverynoteData.length === 0 || !deliverynoteData) {
    return (
      <div className="flex justify-center items-center h-screen p-6 bg-gray-50">
        <h2 className="text-2xl font-semibold text-gray-800">
          Parece que no tienes ningún albarán todavía!
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deliverynoteData.map((deliveryNotes) => (
          <div
            key={deliveryNotes._id}
            className="bg-white shadow-lg rounded-lg border border-gray-300 p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <Link href={`/user/deliverynotes/${deliveryNotes._id}`}>
              <div className="block cursor-pointer">
                <h2 className="text-xl font-semibold text-indigo-600 mb-3">
                  Id del Albarán: {deliveryNotes._id}
                </h2>
                <p className="text-lg text-gray-800 mb-3">
                  <strong className="text-gray-600">Id cliente:</strong> {deliveryNotes.clientId}
                </p>
                <div className="text-lg text-gray-800">
                  <p className="font-semibold mb-2 text-gray-700">Información del proyecto:</p>
                  <pre className="bg-gray-200 p-4 rounded-md text-sm text-gray-800 whitespace-pre-wrap">
                    {JSON.stringify(deliveryNotes.projectId, null, 2)}
                  </pre>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
