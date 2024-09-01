import Link from "next/link";
import { listClient } from "../utils/user";
import { useEffect, useState } from "react";

export default function ShowClient() {
  const [token, setToken] = useState(null);
  const [clientData, setClientData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt");
      setToken(storedToken);
      console.log("token generado:", storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetchClientData = async () => {
        try {
          const recordClient = await listClient(token);
          setClientData(recordClient);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchClientData();
    }
  }, [token]);

  if (error) {
    return <div className="text-red-500 font-semibold">Error: {error}</div>;
  }
  
  if (clientData.length === 0 || !clientData) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          ¡Parece que no tienes ningún cliente!
        </h2>
        <Link href="/user/client">
          <div className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 cursor-pointer">
            CREAR UNO
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-xl">
      <div className="flex flex-wrap gap-6 justify-center">
        {clientData.map((client) => (
          <Link
            key={client._id}
            href={`/user/client/${client._id}`}
            className="block bg-white rounded-lg shadow-md p-4 w-full sm:w-80 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{client.name}</h2>
              <h5 className="text-gray-600">
                <strong>ID:</strong> {client._id}
              </h5>
              <h5 className="text-gray-600">
                <strong>Usuario:</strong> {client.userId}
              </h5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
