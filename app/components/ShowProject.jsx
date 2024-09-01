"use client";
import Link from "next/link";
import { listProject } from "@/app/utils/user"; 
import { useEffect, useState } from "react";

export default function ShowProject() {
  const [token, setToken] = useState(null);
  const [projectData, setProjectData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt");
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetchProjectData = async () => {
        try {
          const recordProject = await listProject(token);
          setProjectData(recordProject);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false); 
        }
      };

      fetchProjectData();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-blue-600">
        Cargando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-red-600">
        Error: {error}
      </div>
    );
  }

  if (projectData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Parece que no tienes ningún proyecto</h2>
        <Link
          href="/user/projects/newproject"
          className="bg-cyan-600 text-white rounded-lg px-4 py-2 text-lg font-semibold hover:bg-cyan-700 transition"
        >
          CREAR UNO
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4 justify-center">
        {projectData.map((project) => (
          <div
            key={project._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 max-w-xs flex flex-col items-start hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <Link href={`/user/projects/${project._id}`} className="block w-full">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                <strong>Nombre del Proyecto:</strong> {project.name}
              </h2>
              <h5 className="text-gray-600 mb-1">
                <strong>Id del proyecto:</strong> {project._id}
              </h5>
              <h5 className="text-gray-600">
                <strong>Id del cliente:</strong> {project.clientId}
              </h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
