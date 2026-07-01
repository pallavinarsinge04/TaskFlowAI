import { useState } from "react";
import axios from "axios";
import "./CreateProjectModal.css";

function CreateProjectModal({ close, addProject }) {

const [form,setForm]=useState({

name:"",
description:"",
status:"Planning",
priority:"Medium",
startDate:"",
endDate:"",
teamMembers:1,
progress:0

});

const handleChange=(e)=>{

setForm({

...form,
[e.target.name]:e.target.value

});

};
console.log(form);
const handleSubmit=async(e)=>{

e.preventDefault();

const res=await axios.post(
"http://localhost:5000/api/projects",
form
);

addProject(res.data);

close();

};

return(

<div className="modal-overlay">

<div className="modal-box">

<h2>Create New Project</h2>

<form
className="project-form"
onSubmit={handleSubmit}
>

<div className="full">

<label>Project Name</label>

<input
name="name"
onChange={handleChange}
required
/>

</div>

<div className="full">

<label>Description</label>

<textarea
name="description"
onChange={handleChange}
/>

</div>

<div>

<label>Status</label>

<select
name="status"
onChange={handleChange}
>

<option>Planning</option>
<option>Active</option>
<option>Completed</option>

</select>

</div>

<div>

<label>Priority</label>

<select
name="priority"
onChange={handleChange}
>

<option>Low</option>
<option>Medium</option>
<option>High</option>

</select>

</div>

<div>

<label>Start Date</label>

<input
type="date"
name="startDate"
onChange={handleChange}
/>

</div>

<div>

<label>End Date</label>

<input
type="date"
name="endDate"
onChange={handleChange}
/>

</div>

<div>

<label>Team Members</label>

<input
type="number"
name="teamMembers"
min="1"
onChange={handleChange}
/>

</div>

<div>

<label>Progress</label>

<input
type="number"
name="progress"
min="0"
max="100"
onChange={handleChange}
/>

</div>

<div className="modal-buttons full">

<button
type="button"
className="cancel-btn"
onClick={close}
>

Cancel

</button>

<button
type="submit"
className="create-btn"
>

Create Project

</button>

</div>

</form>

</div>

</div>

);

}

export default CreateProjectModal;