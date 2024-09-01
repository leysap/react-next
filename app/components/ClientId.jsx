import { clientInfo } from "../utils/user";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ClientID({ id }) {
  const [token, setToken] = useState(null);
  const [clientInfoSave, setclientInfoSave] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt");
      setToken(storedToken);
      localStorage.setItem("clientId", id); 
    }
  }, [id]);

  useEffect(() => {
    if (token) {
      const fetchClientDataByID = async () => {
        try {
          const clientInfoSave = await clientInfo(id, token);
          setclientInfoSave(clientInfoSave);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchClientDataByID();
    }
  }, [token, id]);

  if (error) {
    return <div> Error: {error}</div>;
  }

  return (
    <div class="container mx-auto p-6 border border-gray-200 bg-white rounded-lg shadow-md w-full max-w-4xl">
      <h1 class="text-3xl font-semibold text-gray-800 mb-4">Nombre del cliente: {clientInfoSave.name}</h1>
      <h2 class="text-xl font-medium text-gray-600 mb-6">Id: {clientInfoSave._id}</h2>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <p class="text-gray-700">
          <strong class="text-blue-600">Calle:</strong> {clientInfoSave.address?.street}
        </p>
        <p class="text-gray-700">
          <strong class="text-blue-600">Número:</strong> {clientInfoSave.address?.number}
        </p>
        <p class="text-gray-700">
          <strong class="text-blue-600">Código Postal:</strong> {clientInfoSave.address?.postal}
        </p>
        <p class="text-gray-700">
          <strong class="text-blue-600">Ciudad:</strong> {clientInfoSave.address?.city}
        </p>
        <p class="text-gray-700">
          <strong class="text-blue-600">Provincia:</strong> {clientInfoSave.address?.province}
        </p>
      </div>

      <div class="text-white text-xl font-bold bg-teal-500 p-4 mb-6 text-center rounded-lg mx-auto w-56">
        <Link href={`/user/projects/newproject?clientId=${id}`}>
          Crear un proyecto a este cliente
        </Link>
      </div>
      <Link href="/user" class="text-blue-600 hover:underline">Volver</Link>
    </div>
  );
}
