
import { useState, useEffect, useMemo } from "react";
import "./Tasks.css";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import KanbanBoard from "../../components/kanban/KanbanBoard";
import { FaPlus, FaSearch, FaList, FaColumns } from "react-icons/fa";
import socket from "../../socket/socket";

function Tasks() {
  const [tasks,setTasks]=useState([]);
  const [search,setSearch]=useState("");
  const [status,setStatus]=useState("All");
  const [priority,setPriority]=useState("All");
  const [sort,setSort]=useState("Newest");
  const [view,setView]=useState("list");
  const [showFav,setShowFav]=useState(false);
  const [openModal,setOpenModal]=useState(false);
  const [editTask,setEditTask]=useState(null);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const t=setTimeout(()=>setLoading(false),700);

    socket.on("task_created",task=>setTasks(p=>[...p,task]));
    socket.on("task_updated",u=>setTasks(p=>p.map(x=>x.id===u.id?u:x)));
    socket.on("task_deleted",id=>setTasks(p=>p.filter(x=>x.id!==id)));

    return ()=>{
      clearTimeout(t);
      socket.off("task_created");
      socket.off("task_updated");
      socket.off("task_deleted");
    };
  },[]);

  const handleSaveTask=(task)=>{
    if(editTask){
      const updated={...task,id:editTask.id};
      socket.emit("task_updated",updated);
      setTasks(p=>p.map(t=>t.id===updated.id?updated:t));
    }else{
      const created={...task,id:Date.now()};
      socket.emit("task_created",created);
      setTasks(p=>[...p,created]);
    }
    setOpenModal(false);
    setEditTask(null);
  };

  const handleDelete=id=>{
    socket.emit("task_deleted",id);
    setTasks(p=>p.filter(t=>t.id!==id));
  };

  const filteredTasks=useMemo(()=>tasks.filter(task=>{
    const matches=task.title.toLowerCase().includes(search.toLowerCase()) &&
      (status==="All"||task.status===status) &&
      (priority==="All"||task.priority===priority);
    if(!showFav) return matches;
    return matches && JSON.parse(localStorage.getItem(`favorite_${task.id}`));
  }).sort((a,b)=>{
    if(sort==="Priority"){
      const o={High:3,Medium:2,Low:1};
      return o[b.priority]-o[a.priority];
    }
    if(sort==="Status") return a.status.localeCompare(b.status);
    return sort==="Newest"?b.id-a.id:a.id-b.id;
  }),[tasks,search,status,priority,showFav,sort]);

  if(loading) return <div className="loading">Loading Tasks...</div>;

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <div>
          <h1>Task Management</h1>
          <p>Manage project tasks professionally</p>
        </div>
        <span className="task-count">{filteredTasks.length} Tasks</span>
        <div className="header-buttons">
          <button className="add-btn" onClick={()=>{setEditTask(null);setOpenModal(true);}}><FaPlus/> Add Task</button>
          <button className="refresh-btn" onClick={()=>setTasks([...tasks])}>Refresh</button>
        </div>
      </div>

      <div className="task-filters">
        <div className="search-box">
          <FaSearch/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search task..."/>
        </div>

        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option>All</option><option>Pending</option><option>In Progress</option><option>Completed</option>
        </select>

        <select value={priority} onChange={e=>setPriority(e.target.value)}>
          <option>All</option><option>High</option><option>Medium</option><option>Low</option>
        </select>

        <select value={sort} onChange={e=>setSort(e.target.value)}>
          <option>Newest</option><option>Oldest</option><option>Priority</option><option>Status</option>
        </select>
      </div>

      <div className="view-toggle">
        <button onClick={()=>setShowFav(!showFav)}>⭐ {showFav?"Show All":"Favorites"}</button>
        <button className={view==="list"?"active":""} onClick={()=>setView("list")}><FaList/> List</button>
        <button className={view==="kanban"?"active":""} onClick={()=>setView("kanban")}><FaColumns/> Kanban</button>
      </div>

      {view==="list" ? (
        <div className="task-list">
          {filteredTasks.length===0 ? (
            <div className="empty-task">
              <img src="https://cdn-icons-png.flaticon.com/512/7486/7486754.png" width="180" />
              <h2>No Tasks Yet</h2>
              <p>Create your first task.</p>
            </div>
          ) : filteredTasks.map(task=>(
            <TaskCard key={task.id} task={task}
              onEdit={(t)=>{setEditTask(t);setOpenModal(true);}}
              onDelete={handleDelete}/>
          ))}
        </div>
      ) : <KanbanBoard tasks={tasks} setTasks={setTasks}/>}

      <button className="floating-add" onClick={()=>{setEditTask(null);setOpenModal(true);}}>+</button>

      <TaskModal open={openModal} editTask={editTask}
        onClose={()=>{setOpenModal(false);setEditTask(null);}}
        onSave={handleSaveTask}/>
    </div>
  );
}
export default Tasks;
