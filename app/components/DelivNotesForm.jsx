"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { newDeliverynote } from "../utils/user";

export default function DelinoteHorsForm() {
  const [token, setToken] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      clientId: "",
      projectId: "",
      format: "hours",
      hours: "",
      description: "",
      workdate: "",
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt");
      const storedClientID = localStorage.getItem("clientId");
      const storedProjectID = localStorage.getItem("projectId");

      setToken(storedToken);

      reset({
        clientId: storedClientID,
        projectId: storedProjectID,
        hours: "",
        workdate: "",
        format: "hours",
        description: "",
      });
    }
  }, [reset]);

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await newDeliverynote(token, data);
      alert("Tu albarán ha sido registrado con éxito");
      router.push("/user/deliverynotes");
      if (res.token) {
        localStorage.setItem("jwt", res.token);
      } else {
        throw new Error("Failed to register user.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg"
      >
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Albarán de Horas
        </h1>

        <div className="mb-4">
          <label
            htmlFor="hours"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Total de Horas
          </label>
          <input
            className="block w-full rounded-md border border-gray-300 p-3 text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            type="number"
            id="hours"
            {...register("hours", { required: "Total de horas requerido", maxLength: 9 })}
          />
          {errors.hours && <p className="text-red-500 mt-1 text-sm">{errors.hours.message}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Descripción
          </label>
          <input
            className="block w-full rounded-md border border-gray-300 p-3 text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            type="text"
            id="description"
            {...register("description", { required: "Descripción requerida", maxLength: 50 })}
          />
          {errors.description && <p className="text-red-500 mt-1 text-sm">{errors.description.message}</p>}
        </div>

        <div className="mb-6">
          <label
            htmlFor="workdate"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Fecha de Trabajo
          </label>
          <input
            className="block w-full rounded-md border border-gray-300 p-3 text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            type="date"
            id="workdate"
            {...register("workdate", { required: "Fecha de trabajo requerida" })}
          />
          {errors.workdate && <p className="text-red-500 mt-1 text-sm">{errors.workdate.message}</p>}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white text-lg font-bold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}
