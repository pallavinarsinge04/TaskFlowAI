<div className="row">

  <div className="input-group">

    <label>Progress (%)</label>

    <input
      type="number"
      name="progress"
      min="0"
      max="100"
      value={task.progress || 0}
      onChange={handleChange}
    />

  </div>

  <div className="input-group">

    <label>Category</label>

    <select
      name="category"
      value={task.category}
      onChange={handleChange}
    >
      <option>Frontend</option>
      <option>Backend</option>
      <option>Database</option>
      <option>Testing</option>
      <option>Deployment</option>
      <option>General</option>
    </select>

  </div>

</div>