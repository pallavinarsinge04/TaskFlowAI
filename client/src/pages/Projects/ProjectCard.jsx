function ProjectCard({project}){

return(

<div className="project-card">

<h2>{project.title}</h2>

<p>{project.description}</p>

<div>

Priority

{project.priority}

</div>

<div>

Progress

{project.progress}%

</div>

<div>

Due

{project.dueDate}

</div>

</div>

);

}

export default ProjectCard;