"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { newClient } from "@/app/utils/user";
import { useEffect, useState } from "react";

function ClientForm() {
  const [token, setToken] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      cif: "",
      address: {
        street: "",
        number: "",
        postal: "",
        city: "",
        province: "",
      },
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt");
      setToken(storedToken);
    }
  }, []);

  const router = useRouter();

  const onSubmit = async (data) => {
    if (!token) {
      console.error("Token is missing. Please login again.");
      return;
    }

    try {
      const res = await newClient(token, data);
      alert("Tu cliente ha sido registrado con éxito");
      router.push("/user");

      if (res.token) {
        localStorage.setItem("jwt", res.token);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al registrar el cliente. Inténtalo de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Nuevo Cliente</h1>
      
      <div className="mb-4">
        <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Nombre del Cliente o Empresa</label>
        <input
          type="text"
          id="name"
          {...register("name", { maxLength: { value: 20, message: "Name cannot exceed 20 characters" } })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="cif" className="block text-lg font-medium text-gray-700 mb-2">CIF <span className="text-gray-500 text-sm">(Ejemplo: D52921210)</span></label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          id="cif"
          {...register("cif", { maxLength: { value: 9, message: "CIF cannot exceed 9 characters" } })}
        />
        {errors.cif && <p className="text-red-500 text-sm mt-1">{errors.cif.message}</p>}
      </div>

      <div className="text-xl font-semibold text-gray-800 mb-4">Domicilio Fiscal</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="address.street" className="block text-lg font-medium text-gray-700 mb-2">Calle</label>
          <input
            type="text"
            id="address.street"
            {...register("address.street", { required: "Street is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address?.street && <p className="text-red-500 text-sm mt-1">{errors.address.street.message}</p>}
        </div>

        <div>
          <label htmlFor="address.number" className="block text-lg font-medium text-gray-700 mb-2">Número</label>
          <input
            id="address.number"
            type="number"
            min="1"
            {...register("address.number", { required: "Number is required", valueAsNumber: true, min: { value: 1, message: "Number must be greater than 0" } })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address?.number && <p className="text-red-500 text-sm mt-1">{errors.address.number.message}</p>}
        </div>

        <div>
          <label htmlFor="address.postal" className="block text-lg font-medium text-gray-700 mb-2">Código Postal</label>
          <input
            id="address.postal"
            type="number"
            min="1"
            {...register("address.postal", { required: "Postal code is required", valueAsNumber: true, min: { value: 1, message: "Postal code must be greater than 0" } })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address?.postal && <p className="text-red-500 text-sm mt-1">{errors.address.postal.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="address.city" className="block text-lg font-medium text-gray-700 mb-2">Ciudad</label>
          <input
            id="address.city"
            type="text"
            {...register("address.city", { required: "City is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address?.city && <p className="text-red-500 text-sm mt-1">{errors.address.city.message}</p>}
        </div>

        <div>
          <label htmlFor="address.province" className="block text-lg font-medium text-gray-700 mb-2">Provincia</label>
          <input
            id="address.province"
            type="text"
            {...register("address.province", { required: "Province is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address?.province && <p className="text-red-500 text-sm mt-1">{errors.address.province.message}</p>}
        </div>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 text-white text-lg font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Crear cliente
        </button>
      </div>
    </form>
  );
}

export default ClientForm;
