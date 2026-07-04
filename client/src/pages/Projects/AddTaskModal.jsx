const addTask = async (e) => {

  e.preventDefault();

  const { error } = await supabase
    .from("tasks")
    .insert([
      {
        project_id,
        title,
        description,
        priority,
        status,
        due_date,
      },
    ]);

  if (error) {
    alert(error.message);
    return;
  }

  reload();

  close();
};