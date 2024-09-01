import ClientForm from "@/app/components/ClientForm";

export default function NewClient() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">CLIENTES</h1>
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
        <ClientForm />
      </div>
    </div>
  );
}


