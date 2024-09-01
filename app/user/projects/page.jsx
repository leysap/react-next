import ShowProject from "@/app/components/ShowProject";

function newProject() {
  return (
    <div className="bg-blue-900 min-h-screen w-full bg-opacity-70 rounded-lg">
      <div className="container bg-blue-900 flex justify-center text-center p-10">
        <h1 className=" text-4xl font-bold text-white">PROYECTOS</h1>
      </div>
      <div className="bg-blue-900 page-p p-2 m-4">
        <ShowProject />
      </div>
    </div>
  );
}


export default newProject;