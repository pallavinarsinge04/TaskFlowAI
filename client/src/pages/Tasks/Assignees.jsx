import { useEffect, useState } from "react";
import "./Assignees.css";

function Assignees({ taskId }) {

  const storageKey = `assignees_${taskId}`;

  const [users, setUsers] = useState([]);

  const [input, setInput] = useState("");

  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem(storageKey)) || [];

    setUsers(saved);

  }, [storageKey]);

  useEffect(() => {

    localStorage.setItem(
      storageKey,
      JSON.stringify(users)
    );

  }, [users, storageKey]);

  const addUser = () => {

    if (!input.trim()) return;

    const newUser = {

      id: Date.now(),

      name: input,

      avatar: `https://ui-avatars.com/api/?name=${input}&background=random&color=fff`

    };

    setUsers([...users, newUser]);

    setInput("");

  };

  const removeUser = (id) => {

    setUsers(users.filter(user => user.id !== id));

  };

  return (

    <div className="assignees">

      <h2>👥 Assignees</h2>

      <div className="assignee-input">

        <input
          type="text"
          placeholder="Add user name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={addUser}>
          Add
        </button>

      </div>

      <div className="assignee-list">

        {users.length === 0 && (
          <p>No assignees</p>
        )}

        {users.map(user => (

          <div key={user.id} className="assignee-card">

            <img src={user.avatar} alt="" />

            <span>{user.name}</span>

            <button onClick={() => removeUser(user.id)}>
              ✕
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Assignees;