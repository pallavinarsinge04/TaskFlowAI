import supabase from "../config/supabase.js";

export const startTimer = async (req, res) => {
  try {
    const { user_id, project_id, task_id } = req.body;

    const { data, error } = await supabase
      .from("time_entries")
      .insert([
        {
          user_id,
          project_id,
          task_id,
          start_time: new Date(),
        },
      ])
      .select()
      .single();

    if (error) return res.status(500).json(error);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const stopTimer = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: entry, error } = await supabase
      .from("time_entries")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return res.status(500).json(error);

    const end = new Date();

    const duration = Math.floor(
      (end - new Date(entry.start_time)) / 1000
    );

    const { data, error: updateError } = await supabase
      .from("time_entries")
      .update({
        end_time: end,
        duration,
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) return res.status(500).json(updateError);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEntries = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("time_entries")
      .select("*")
      .eq("user_id", req.params.userId)
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json(error);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};