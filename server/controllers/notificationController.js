import supabase from "../config/supabase.js";
import { getIO } from "../config/socket.js";

/* ======================================
   GET NOTIFICATIONS
====================================== */

export const getNotifications = async (req, res) => {

  try {

    const { role, userId } = req.query;

    const { data, error } = await supabase

      .from("notifications")

      .select("*")

      .or(
        `role.eq.All,role.eq.${role},user_id.eq.${userId}`
      )

      .order("created_at", {
        ascending: false,
      });

    if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

/* ======================================
   CREATE NOTIFICATION
====================================== */

export const createNotification = async (req, res) => {

  try {

    const { data, error } = await supabase

      .from("notifications")

      .insert([req.body])

      .select()

      .single();

    if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }

    const io = getIO();

    if (data.user_id) {

      io.to(data.user_id)
        .emit("notification", data);

    }

    else if (data.role !== "All") {

      io.to(data.role)
        .emit("notification", data);

    }

    else {

      io.emit("notification", data);

    }

    res.status(201).json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

/* ======================================
   MARK READ
====================================== */

export const markRead = async (req, res) => {

  try {

    const { data, error } = await supabase

      .from("notifications")

      .update({
        is_read: true,
      })

      .eq("id", req.params.id)

      .select()

      .single();

    if (error) {

      return res.status(500).json({
        message: error.message,
      });

    }

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

/* ======================================
   ARCHIVE
====================================== */

export const archiveNotification = async (req, res) => {

  try {

    const { data, error } = await supabase

      .from("notifications")

      .update({
        archived: true,
      })

      .eq("id", req.params.id)

      .select()

      .single();

    if (error) {

      return res.status(500).json({
        message: error.message,
      });

    }

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

/* ======================================
   MARK ALL READ
====================================== */

export const markAllRead = async (req, res) => {

  try {

    const { error } = await supabase

      .from("notifications")

      .update({
        is_read: true,
      })

      .neq("id", "");

    if (error) {

      return res.status(500).json({
        message: error.message,
      });

    }

    res.json({
      message: "Done",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

/* ======================================
   DELETE
====================================== */

export const deleteNotification = async (req, res) => {

  try {

    const { error } = await supabase

      .from("notifications")

      .delete()

      .eq("id", req.params.id);

    if (error) {

      return res.status(500).json({
        message: error.message,
      });

    }

    res.json({
      message: "Deleted",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

/* ======================================
   DELETE ALL
====================================== */

export const deleteAllNotifications = async (req, res) => {

  try {

    const { error } = await supabase

      .from("notifications")

      .delete()

      .neq("id", "");

    if (error) {

      return res.status(500).json({
        message: error.message,
      });

    }

    res.json({
      message: "Deleted",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};