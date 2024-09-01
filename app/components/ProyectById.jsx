"use client";
//PROYECTO POR SU ID Y ADEMAS PERMITE MODIFICARLO (CON PUT)
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getProjectById, updateProject } from '@/app/utils/user'; 
import Link from 'next/link';

const ProjectById = ({ id }) => {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    const fetchProject = async () => {
      const storedToken = localStorage.getItem('jwt');
      if (!storedToken) {
        setError('No se encontró el token. Por favor, inicia sesión.');
        setLoading(false);
        return;
      }
      if (!id) {
        setError('No se encontró el ID del proyecto.');
        setLoading(false);
        return;
      }
      try {
        const project = await getProjectById(id, storedToken);
        if (!project) {
          setError('Proyecto no encontrado.');
        } else {
          setProjectData(project);
          reset(project); // Inicializa el formulario con los datos del proyecto
        }
      } catch (err) {
        setError('No se pudieron cargar los datos del proyecto.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, reset]);

  const onSubmit = async (data) => {
    const storedToken = localStorage.getItem('jwt');
    if (!storedToken) {
      setError('No se encontró el token. Por favor, inicia sesión.');
      return;
    }
    try {
      await updateProject(id, data, storedToken);
      setProjectData(data);
      setIsEditing(false);
      alert('Proyecto actualizado con éxito.');
    } catch (err) {
      setError('No se pudo actualizar el proyecto.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-blue-500">
        Cargando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">
        No se encontraron detalles del proyecto.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Detalles del Proyecto</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-lg font-medium text-gray-700">Nombre:</label>
              <input
                className="mt-2 p-3 border border-gray-300 rounded-md text-gray-900"
                type="text"
                id="name"
                {...register("name", { required: "El nombre es requerido" })}
              />
              {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="code" className="text-lg font-medium text-gray-700">Código:</label>
              <input
                className="mt-2 p-3 border border-gray-300 rounded-md text-gray-900"
                type="text"
                id="code"
                {...register("code", { required: "El código es requerido" })}
              />
              {errors.code && <p className="text-red-500 mt-1">{errors.code.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg font-medium text-gray-700">Email:</label>
              <input
                className="mt-2 p-3 border border-gray-300 rounded-md text-gray-900"
                type="email"
                id="email"
                {...register("email", { required: "El email es requerido" })}
              />
              {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
            </div>
          </div>
          <div className="text-lg font-medium text-gray-700 mt-4">Domicilio Fiscal:</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="flex flex-col">
              <label htmlFor="address.street" className="text-lg font-medium text-gray-700">Calle:</label>
              <input
                className="mt-2 p-3 border border-gray-300 rounded-md text-gray-900"
                type="text"
                id="address.street"
                {...register("address.street", { required: "La calle es requerida" })}
              />
              {errors.address?.street && <p className="text-red-500 mt-1">{errors.address.street.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="address.number" className="text-lg font-medium text-gray-700">Número:</label>
              <input
                className="mt-2 p-3 border border-gray-300 rounded-md text-gray-900"
                type="text"
                id="address.number"
                {...register("address.number", { required: "El número es requerido" })}
              />
              {errors.address?.number && <p className="text-red-500 mt-1">{errors.address.number.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="address.postal" className="text-lg font-medium text-gray-700">Código Postal:</label>
              <input
                className="mt-2 p-3 border border-gray-300 rounded-md text-gray-900"
                type="text"
                id="address.postal"
                {...register("address.postal", { required: "El código postal es requerido" })}
              />
              {errors.address?.postal && <p className="text-red-500 mt-1">{errors.address.postal.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <label htmlFor="address.city" className="text-lg font-medium text-gray-700">Ciudad:</label>
              <input
                className="mt-2 p-3 border border-gray-300 rounded-md text-gray-900"
                type="text"
                id="address.city"
                {...register("address.city", { required: "La ciudad es requerida" })}
              />
              {errors.address?.city && <p className="text-red-500 mt-1">{errors.address.city.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="address.province" className="text-lg font-medium text-gray-700">Provincia:</label>
              <input
                className="mt-2 p-3 border border-gray-300 rounded-md text-gray-900"
                type="text"
                id="address.province"
                {...register("address.province", { required: "La provincia es requerida" })}
              />
              {errors.address?.province && <p className="text-red-500 mt-1">{errors.address.province.message}</p>}
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            >
              Actualizar Proyecto
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <p><strong>Nombre:</strong> {projectData.name}</p>
          <p><strong>Id del Proyecto:</strong> {projectData.userId}</p>
          <p><strong>Código:</strong> {projectData.code}</p>
          <p><strong>ID del Cliente:</strong> {projectData.clientId}</p>
          <p><strong>Email:</strong> {projectData.email}</p>
          <p><strong>Dirección:</strong> {projectData.address?.street}, {projectData.address?.number}, {projectData.address?.postal}, {projectData.address?.city}, {projectData.address?.province}</p>
          <p><strong>Creado:</strong> {projectData.createdAt}</p>
          <p><strong>Actualizado:</strong> {projectData.updatedAt}</p>
          <div className="flex gap-4 mt-4">
            <button 
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Editar
            </button>
            <Link href="/user/projects" className="px-6 py-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50">
              VOLVER
            </Link>
            <Link href="/user/deliverynotes/newdeliverynote" className="px-6 py-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50">
              CREAR ALBARÁN DE HORAS
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectById;
