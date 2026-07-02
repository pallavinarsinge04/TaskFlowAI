
// TeamMembers.jsx
// Professional starter version. Extend as needed.

import { useState, useEffect } from "react";
import "./TeamMembers.css";
import {
  FaPlus, FaTrash, FaEye, FaEdit,
  FaEnvelope, FaPhone, FaTasks, FaCircle
} from "react-icons/fa";

export default function TeamMembers() {
  const [members,setMembers]=useState(()=>JSON.parse(localStorage.getItem("teamMembers")||"[]"));
  const [showForm,setShowForm]=useState(false);
  const [selected,setSelected]=useState(null);
  const [search,setSearch]=useState("");
  const [role,setRole]=useState("All");
  const [clock,setClock]=useState(new Date().toLocaleTimeString());
  const [form,setForm]=useState({
    name:"",role:"",email:"",phone:"",
    tasks:0,productivity:0,image:"",online:true
  });

  useEffect(()=>{
    localStorage.setItem("teamMembers",JSON.stringify(members));
  },[members]);

  useEffect(()=>{
    const t=setInterval(()=>setClock(new Date().toLocaleTimeString()),1000);
    return ()=>clearInterval(t);
  },[]);

  const change=e=>setForm({...form,[e.target.name]:e.target.value});

  const add=e=>{
    e.preventDefault();
    if(!form.name||!form.role) return alert("Fill required fields");
    setMembers([{id:Date.now(),...form},...members]);
    setForm({name:"",role:"",email:"",phone:"",tasks:0,productivity:0,image:"",online:true});
    setShowForm(false);
  };

  const remove=id=>{
    if(window.confirm("Delete member?"))
      setMembers(members.filter(m=>m.id!==id));
  };

  const toggle=id=>{
    setMembers(members.map(m=>m.id===id?{...m,online:!m.online}:m));
  };

  const filtered=members.filter(m=>
    m.name.toLowerCase().includes(search.toLowerCase()) &&
    (role==="All"||m.role===role)
  );

  return (
    <div className="team-members">
      <div className="team-header">
        <div>
          <h2>👥 Team Members</h2>
          <p>{clock}</p>
        </div>
        <button onClick={()=>setShowForm(true)}><FaPlus/> Add Member</button>
      </div>

      <div className="toolbar">
        <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} />
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option>All</option>
          {[...new Set(members.map(m=>m.role))].map(r=><option key={r}>{r}</option>)}
        </select>
      </div>

      {showForm && (
        <div className="add-member-card">
          <form onSubmit={add}>
            <input name="name" placeholder="Name" value={form.name} onChange={change}/>
            <input name="role" placeholder="Role" value={form.role} onChange={change}/>
            <input name="email" placeholder="Email" value={form.email} onChange={change}/>
            <input name="phone" placeholder="Phone" value={form.phone} onChange={change}/>
            <input name="tasks" type="number" placeholder="Tasks" value={form.tasks} onChange={change}/>
            <input name="productivity" type="number" placeholder="Productivity" value={form.productivity} onChange={change}/>
            <input name="image" placeholder="Image URL" value={form.image} onChange={change}/>
            <button type="submit">Save</button>
            <button type="button" onClick={()=>setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}

      <div className="team-grid">
        {filtered.map(m=>(
          <div className="member-card" key={m.id}>
            <img src={m.image||"https://i.pravatar.cc/150"} alt={m.name}/>
            <h3>{m.name}</h3>
            <p>{m.role}</p>
            <p><FaEnvelope/> {m.email}</p>
            <p><FaPhone/> {m.phone}</p>
            <p><FaTasks/> {m.tasks}</p>
            <div className="progress"><div className="progress-fill" style={{width:`${m.productivity}%`}}/></div>
            <p>{m.online?<><FaCircle/> Online</>:<>Offline</>}</p>
            <div className="member-buttons">
              <button onClick={()=>setSelected(m)}><FaEye/> View</button>
              <button onClick={()=>toggle(m.id)}>Toggle</button>
              <button onClick={()=>remove(m.id)}><FaTrash/> Delete</button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="profile-modal">
          <div className="profile-card">
            <img src={selected.image||"https://i.pravatar.cc/150"} alt=""/>
            <h2>{selected.name}</h2>
            <p>{selected.role}</p>
            <button onClick={()=>setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
