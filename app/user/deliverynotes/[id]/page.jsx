"use client";
import DelivNotesById from "@/app/components/DelivNotesById";

function showInfoClient({ params }) {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Información del Albarán
        </h1>
        <DelivNotesById id={params.id} />
      </div>
    </div>
  );
}

export default showInfoClient;
