import supabase from "../config/supabase.js";
import { getIO } from "../config/socket.js";

/* ============================
   Get Comments by Task
============================ */

export const getComments = async (req, res) => {

  try {

    const { data, error } = await supabase

      .from("comments")

      .select("*")

      .eq("task_id", req.params.taskId)

      .order("created_at", { ascending: true });

    if (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }

    res.json({

      success: true,

      comments: data

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message

    });

  }

};

/* ============================
   Add Comment
============================ */

export const addComment = async (req, res) => {

  try {

    const { data, error } = await supabase

      .from("comments")

      .insert([req.body])

      .select()

      .single();

    if (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }

    getIO().emit("commentCreated", data);

    res.status(201).json({

      success: true,

      comment: data

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message

    });

  }

};