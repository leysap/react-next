"use client"
import ProjectById from '@/app/components/ProyectById';

const ShowProjectById = ({ params }) => {

  const { id } = params;

  return <ProjectById id={id} />;
};

export default ShowProjectById;
