import supabase from "../config/supabase.js";
import { getIO } from "../config/socket.js";

/*
|--------------------------------------------------------------------------
| Get all team members
|--------------------------------------------------------------------------
*/

export const getMembers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Get team members error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      members: data || [],
    });
  } catch (error) {
    console.error("Get team members error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to fetch team members.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Add team member
|--------------------------------------------------------------------------
*/

export const addMember = async (req, res) => {
  try {
    const {
      name,
      email,
      role,
      user_id,
      avatar,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Member name is required.",
      });
    }

    const memberData = {
      name: name.trim(),
      email: email || null,
      role: role || "Member",
      user_id: user_id || null,
      avatar: avatar || null,
    };

    const { data: member, error } = await supabase
      .from("team_members")
      .insert([memberData])
      .select("*")
      .single();

    if (error) {
      console.error("Add team member error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Create notification
    |--------------------------------------------------------------------------
    */

    const { data: notification, error: notificationError } =
      await supabase
        .from("notifications")
        .insert([
          {
            title: "New Team Member",
            message: `${member.name} joined the team.`,
            type: "team",
            receiver: user_id || null,
          },
        ])
        .select("*")
        .single();

    if (notificationError) {
      console.error(
        "Create team notification error:",
        notificationError
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Real-time notification
    |--------------------------------------------------------------------------
    */

    try {
      const io = getIO();

      if (user_id && notification) {
        io.to(String(user_id)).emit(
          "notification",
          notification
        );
      }

      if (notification) {
        io.emit("teamMemberAdded", {
          member,
          notification,
        });
      }
    } catch (socketError) {
      console.error(
        "Team socket error:",
        socketError.message
      );
    }

    return res.status(201).json({
      success: true,
      message: "Team member added successfully.",
      member,
    });
  } catch (error) {
    console.error("Add team member error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to add team member.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Delete team member
|--------------------------------------------------------------------------
*/

export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Member ID is required.",
      });
    }

    const { data: deletedMember, error } = await supabase
      .from("team_members")
      .delete()
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error(
        "Delete team member error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    try {
      getIO().emit("teamMemberDeleted", {
        id,
      });
    } catch (socketError) {
      console.error(
        "Team delete socket error:",
        socketError.message
      );
    }

    return res.status(200).json({
      success: true,
      message: "Member removed successfully.",
      member: deletedMember,
    });
  } catch (error) {
    console.error(
      "Delete team member error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to delete team member.",
    });
  }
};