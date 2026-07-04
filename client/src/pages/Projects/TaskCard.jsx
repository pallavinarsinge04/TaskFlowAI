const deleteTask = async () => {

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", task.id);

  if (error) {
    alert(error.message);
    return;
  }

  reload();
};
<button onClick={deleteTask}>
    Delete
</button>
const completeTask = async () => {

  const { error } = await supabase
    .from("tasks")
    .update({
      completed: true,
      status: "Completed",
    })
    .eq("id", task.id);

  if (error) {
    alert(error.message);
    return;
  }

  reload();
};

<button onClick={completeTask}>
    Complete
</button>