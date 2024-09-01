"use client";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { newProject } from "../utils/user";
import { useEffect, useState } from "react";

export default function ProjectForm({ clientId: propClientId }) {
  const [token, setToken] = useState(null);
  const searchParams = useSearchParams();
  const clientId = propClientId || searchParams.get('clientId');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      code: "",
      address: {
        street: "",
        number: "",
        postal: "",
        city: "",
        province: "",
      },
      clientId: clientId,
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt");
      setToken(storedToken);
    }
  }, [clientId]);

  const router = useRouter();

  const onSubmit = async (data) => {
    data.clientId = clientId;

    try {
      const res = await newProject(clientId, token, data);
      alert("El proyecto ha sido asignado al cliente con éxito");
      router.push("/user/projects");
      if (res.token) {
        localStorage.setItem("jwt", res.token);
      } else {
        throw new Error("Failed to register project.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full space-y-6">
        <h1 className="text-3xl font-extrabold text-blue-600 mb-4 text-center">Nuevo Proyecto</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg font-semibold mb-2">Nombre del Proyecto</label>
            <input
              className="border border-gray-300 rounded-lg p-3 text-lg outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="name"
              {...register("name", { maxLength: 100 })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-semibold mb-2">Email</label>
            <input
              className="border border-gray-300 rounded-lg p-3 text-lg outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="code" className="text-lg font-semibold mb-2">Código Interno</label>
            <input
              className="border border-gray-300 rounded-lg p-3 text-lg outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="code"
              {...register("code")}
            />
            {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>}
          </div>
        </div>
        <div className="text-lg font-semibold">Domicilio Fiscal:</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label htmlFor="address.street" className="text-lg font-semibold mb-2">Calle</label>
            <input
              className="border border-gray-300 rounded-lg p-3 text-lg outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="address.street"
              {...register("address.street", { required: "Street is required" })}
            />
            {errors.address?.street && <p className="text-red-500 text-sm mt-1">{errors.address.street.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="address.number" className="text-lg font-semibold mb-2">Número</label>
            <input
              className="border border-gray-300 rounded-lg p-3 text-lg outline-none focus:ring-2 focus:ring-blue-500"
              id="address.number"
              type="text"
              {...register("address.number", {
                required: "Number is required",
                valueAsNumber: true,
                min: { value: 1, message: "Number must be greater than 0" }
              })}
            />
            {errors.address?.number && <p className="text-red-500 text-sm mt-1">{errors.address.number.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="address.postal" className="text-lg font-semibold mb-2">Código Postal</label>
            <input
              className="border border-gray-300 rounded-lg p-3 text-lg outline-none focus:ring-2 focus:ring-blue-500"
              id="address.postal"
              type="text"
              {...register("address.postal", {
                required: "Postal code is required",
                valueAsNumber: true,
                min: { value: 1, message: "Postal code must be greater than 0" }
              })}
            />
            {errors.address?.postal && <p className="text-red-500 text-sm mt-1">{errors.address.postal.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="address.city" className="text-lg font-semibold mb-2">Ciudad</label>
            <input
              className="border border-gray-300 rounded-lg p-3 text-lg outline-none focus:ring-2 focus:ring-blue-500"
              id="address.city"
              type="text"
              {...register("address.city", {
                required: "City is required",
                maxLength: 100
              })}
            />
            {errors.address?.city && <p className="text-red-500 text-sm mt-1">{errors.address.city.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="address.province" className="text-lg font-semibold mb-2">Provincia</label>
            <input
              className="border border-gray-300 rounded-lg p-3 text-lg outline-none focus:ring-2 focus:ring-blue-500"
              id="address.province"
              type="text"
              {...register("address.province", {
                required: "Province is required",
                maxLength: 100
              })}
            />
            {errors.address?.province && <p className="text-red-500 text-sm mt-1">{errors.address.province.message}</p>}
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="submit"
          >
            ENVIAR
          </button>
          <button
            className="bg-gray-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            type="button"
            onClick={() => router.push("/user/projects")}
          >
            VOLVER A PROYECTOS
          </button>
        </div>
      </form>
    </div>
  );
}
