function ProjectCard({ project }) {

return(

<div className="project-card">

<div className="card-top">

<h2>{project.name}</h2>

<span className={`status ${project.status}`}>
{project.status}
</span>

</div>

<p>{project.description}</p>

<div className="project-progress">

<div
className="progress-fill"
style={{
width:`${project.progress}%`
}}
></div>

</div>

<p className="progress-text">
{project.progress}% Completed
</p>

<div className="project-details">

<div>

📅

<p>Start</p>

<strong>

{project.startDate
? new Date(project.startDate).toLocaleDateString()
:"-"}

</strong>

</div>

<div>

🏁

<p>End</p>

<strong>

{project.endDate
? new Date(project.endDate).toLocaleDateString()
:"-"}

</strong>

</div>

<div>

👥

<p>Members</p>

<strong>

{project.teamMembers}

</strong>

</div>

<div>

🔥

<p>Priority</p>

<strong>

{project.priority}

</strong>

</div>

</div>

</div>

);

}

export default ProjectCard;