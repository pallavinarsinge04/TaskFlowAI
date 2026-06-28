function AddTaskModal({ addTask }) {

  const submit = (e) => {

    e.preventDefault();

    const title = e.target.title.value;

    const description = e.target.description.value;

    addTask(title, description);

    e.target.reset();

  };

  return (

    <form
      onSubmit={submit}
      className="bg-white p-4 rounded-xl shadow mb-6"
    >

      <input
        name="title"
        placeholder="Task Title"
        className="border p-2 mr-2"
      />

      <input
        name="description"
        placeholder="Description"
        className="border p-2 mr-2"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Task
      </button>

    </form>

  );

}

export default AddTaskModal;