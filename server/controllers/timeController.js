const TimeLog = require("../models/TimeLog");

exports.startTimer = async (req, res) => {
  const log = await TimeLog.create({
    taskId: req.body.taskId,
    userId: req.body.userId,
    startTime: new Date(),
  });

  res.json({
    success: true,
    log,
  });
};
export const startTimer = async (req, res) => {

  const { user_id, project_id, task_id } = req.body;

  const { data, error } = await supabase

    .from("time_entries")

    .insert([{

      user_id,

      project_id,

      task_id,

      start_time: new Date()

    }])

    .select()

    .single();

  if (error)
    return res.status(500).json(error);

  res.json(data);

};

export const stopTimer = async (req, res) => {

  const { id } = req.params;

  const { data: entry } = await supabase

    .from("time_entries")

    .select("*")

    .eq("id", id)

    .single();

  const end = new Date();

  const duration = Math.floor(

    (end - new Date(entry.start_time)) / 1000

  );

  const { data } = await supabase

    .from("time_entries")

    .update({

      end_time: end,

      duration

    })

    .eq("id", id)

    .select()

    .single();

  res.json(data);

};
exports.getLogs = async (req, res) => {
  const logs = await TimeLog.find();

  res.json({
    success: true,
    logs,
  });
};
export const getEntries = async (req, res) => {

  const { data } = await supabase

    .from("time_entries")

    .select("*")

    .eq("user_id", req.params.userId)

    .order("created_at", {

      ascending: false

    });

  res.json(data);

};