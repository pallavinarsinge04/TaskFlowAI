import supabase from "../config/supabase.js";

export const getCalendarEvents = async (req, res) => {

  try {

    const { data: projects } = await supabase
      .from("projects")
      .select("id,title,due_date");

    const { data: tasks } = await supabase
      .from("tasks")
      .select("id,title,due_date");

    const events = [
      ...(projects || []).map(project => ({
        id: project.id,
        title: `📁 ${project.title}`,
        date: project.due_date,
        type: "project"
      })),
      ...(tasks || []).map(task => ({
        id: task.id,
        title: `✅ ${task.title}`,
        date: task.due_date,
        type: "task"
      }))
    ];

    res.json(events);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};