const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
      <h2 className="text-xl font-bold">
        {project.name}
      </h2>

      <p className="text-gray-600 mt-2">
        {project.description}
      </p>

      <span className="inline-block mt-4 bg-green-100 text-green-700 px-3 py-1 rounded-full">
        {project.status}
      </span>
    </div>
  );
};

export default ProjectCard;