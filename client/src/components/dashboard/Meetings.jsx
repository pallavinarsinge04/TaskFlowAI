// Meetings.jsx
// This file combines the structure discussed earlier.
// NOTE: Replace or extend the handlers/UI as needed for your project.

import { useState, useEffect } from "react";
import "./Meetings.css";
import {
  FaVideo, FaClock, FaUsers, FaCalendarAlt,
  FaMapMarkerAlt, FaPlus, FaTrash,
  FaEdit, FaPlay, FaSearch, FaFilter
} from "react-icons/fa";

function Meetings() {
  const [meetings, setMeetings] = useState(() => {
    const saved = localStorage.getItem("meetings");
    return saved ? JSON.parse(saved) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  const [meeting, setMeeting] = useState({
    title:"",
    date:"",
    time:"",
    platform:"",
    location:"",
    members:"",
    status:"Upcoming"
  });

  useEffect(()=>{
    const t=setInterval(()=>setCurrentTime(new Date().toLocaleTimeString()),1000);
    return ()=>clearInterval(t);
  },[]);

  useEffect(()=>{
    localStorage.setItem("meetings",JSON.stringify(meetings));
  },[meetings]);

  const handleChange=(e)=>{
    setMeeting({...meeting,[e.target.name]:e.target.value});
  };

  const saveMeeting=(e)=>{
    e.preventDefault();
    if(!meeting.title||!meeting.date||!meeting.time){
      alert("Fill required fields");
      return;
    }
    if(editingId){
      setMeetings(meetings.map(m=>m.id===editingId?{...meeting,id:editingId}:m));
    }else{
      setMeetings([{id:Date.now(),...meeting},...meetings]);
    }
    setMeeting({
      title:"",date:"",time:"",
      platform:"",location:"",
      members:"",status:"Upcoming"
    });
    setEditingId(null);
    setShowForm(false);
  };

  const deleteMeeting=(id)=>{
    if(window.confirm("Delete meeting?")){
      setMeetings(meetings.filter(m=>m.id!==id));
    }
  };

  const editMeeting=(m)=>{
    setMeeting(m);
    setEditingId(m.id);
    setShowForm(true);
  };

  const joinMeeting=(m)=>{
    alert(`Joining ${m.title}`);
  };

  const filteredMeetings=meetings.filter(m=>{
    const s=m.title.toLowerCase().includes(search.toLowerCase());
    const f=filter==="All"||m.status===filter;
    return s&&f;
  });

  return (
    <div className="meeting-page">
      <div className="meeting-header">
        <div>
          <h1>🎥 Team Meetings</h1>
          <p>Current Time: {currentTime}</p>
        </div>
        <button className="create-btn" onClick={()=>setShowForm(true)}>
          <FaPlus/> Create Meeting
        </button>
      </div>

      <div className="meeting-toolbar">
        <div className="search-box">
          <FaSearch/>
          <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search"/>
        </div>
        <div className="filter-box">
          <FaFilter/>
          <select value={filter} onChange={(e)=>setFilter(e.target.value)}>
            <option>All</option>
            <option>Live</option>
            <option>Upcoming</option>
            <option>Scheduled</option>
          </select>
        </div>
      </div>

      {showForm && (
        <div className="meeting-modal">
          <form className="meeting-form-card" onSubmit={saveMeeting}>
            <h2>{editingId?"Edit":"Create"} Meeting</h2>
            <input name="title" placeholder="Title" value={meeting.title} onChange={handleChange}/>
            <input name="date" placeholder="Date" value={meeting.date} onChange={handleChange}/>
            <input name="time" placeholder="Time" value={meeting.time} onChange={handleChange}/>
            <input name="platform" placeholder="Platform" value={meeting.platform} onChange={handleChange}/>
            <input name="location" placeholder="Location" value={meeting.location} onChange={handleChange}/>
            <input name="members" placeholder="Members" value={meeting.members} onChange={handleChange}/>
            <select name="status" value={meeting.status} onChange={handleChange}>
              <option>Upcoming</option><option>Live</option><option>Scheduled</option>
            </select>
            <button type="submit">Save</button>
            <button type="button" onClick={()=>setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}

      <div className="meeting-list">
        {filteredMeetings.map(item=>(
          <div className="meeting-item" key={item.id}>
            <div>
              <h3>{item.title}</h3>
              <p><FaCalendarAlt/> {item.date}</p>
              <p><FaClock/> {item.time}</p>
              <p><FaUsers/> {item.members}</p>
              <p><FaMapMarkerAlt/> {item.location}</p>
              <p>{item.platform}</p>
            </div>
            <div>
              <span>{item.status}</span>
              <button onClick={()=>joinMeeting(item)}><FaPlay/> Join</button>
              <button onClick={()=>editMeeting(item)}><FaEdit/> Edit</button>
              <button onClick={()=>deleteMeeting(item.id)}><FaTrash/> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Meetings;
