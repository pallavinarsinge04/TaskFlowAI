import supabase from "../config/supabase.js";
import { getIO } from "../config/socket.js";
import { sendEmail } from "../services/emailService.js";
await sendEmail(

assignedUser.email,

"New Task Assigned",


<div>
<h2>${task.title}</h2>

<p>

Deadline:

${task.deadline}

</p>
</div>


);
// Get all tasks
export const getTasks = async (req, res) => {
  try {

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      tasks: data,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// Get single task
export const getTaskById = async (req, res) => {

  try {

    const { data, error } = await supabase

      .from("tasks")

      .select("*")

      .eq("id", req.params.id)

      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.json({
      success: true,
      task: data,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// Create task
export const createTask = async (req, res) => {

  try {

    const { data, error } = await supabase

      .from("tasks")

      .insert([req.body])

      .select()

      .single();

    if (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

    // Notification

    await supabase

      .from("notifications")

      .insert([
        {
          title: "New Task",
          message: `${data.title} assigned.`,
          type: "task",
        },
      ]);

    getIO().emit("taskCreated", data);

    if (req.user?.email) {

      await sendEmail(

        req.user.email,

        "Task Assigned",

        `
          <h2>${data.title}</h2>

          <p>

          Deadline:

          ${data.deadline || "No Deadline"}

          </p>
        `

      );

    }

    res.status(201).json({
      success: true,
      task: data,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};
const notification=await Notification.create({

title:"Task Assigned",

message:`${task.title} assigned.`,

type:"task",

receiver:task.assignedTo

});

getIO()

.to(

task.assignedTo.toString()

)

.emit(

"notification",

notification

);
// Update task
export const updateTask = async (req, res) => {

  try {

    const { data, error } = await supabase

      .from("tasks")

      .update(req.body)

      .eq("id", req.params.id)

      .select()

      .single();

    if (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

    getIO().emit("taskUpdated", data);

    res.json({
      success: true,
      task: data,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// Update task status
export const updateStatus = async (req, res) => {

  try {

    const { data, error } = await supabase

      .from("tasks")

      .update({
        status: req.body.status,
      })

      .eq("id", req.params.id)

      .select()

      .single();

    if (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

    getIO().emit("taskUpdated", data);

    res.json({
      success: true,
      task: data,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};