import ShowDeliveryNotes from "@/app/components/ShowDeliveryNotes"

export default function PageDeliveryNotes() {
  return (
    <div className=" w-full bg-opacity-70 rounded-lg">
      <div className="container bg-blue-900 flex justify-center text-center p-10">
        <h1 className=" text-4xl font-bold text-white">ALBARAN</h1>
      </div>
      <div className="bg-blue-900 page-p p-2 m-4">
        <ShowDeliveryNotes/>
      </div>
    </div>
  );
}


