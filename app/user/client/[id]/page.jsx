"use client";
import ClientId from "@/app/components/ClientId";


function showInfoClient({ params }) {
  console.log("params", params);

  return (
    <div >
      <div>
        <ClientId id={params.id} />
      </div>
    </div>
  );
}
export default showInfoClient;