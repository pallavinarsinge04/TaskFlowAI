import supabase from "../config/supabase.js";
import { getIO } from "../config/socket.js";

// ========================================
// GET PROJECT TEAM MEMBERS
// ========================================

export const getProjectMembers = async (req, res) => {
  try {
    const { projectId } = req.params;

    const { data, error } = await supabase
      .from("team_members")
      .select(`
        id,
        user_id,
        project_id,
        role,
        name,
        status,
        profile_image,
        joined_at,
        created_at
      `)
      .eq("project_id", projectId)
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      console.error(
        "Get project members error:",
        error
      );

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
    console.error(
      "Get Project Members Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// ADD TEAM MEMBER
// ========================================

export const addTeamMember = async (req, res) => {
  try {
    const { projectId } = req.params;

    const {
      userId,
      name = "",
      role = "member",
      profileImage = "",
      status = "Offline",
    } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const allowedRoles = [
      "member",
      "viewer",
      "admin",
    ];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid role. Use member, viewer, or admin.",
      });
    }

    // ----------------------------------------
    // Check whether user already exists
    // ----------------------------------------

    const { data: existingMember, error: existingError } =
      await supabase
        .from("team_members")
        .select("id")
        .eq("project_id", projectId)
        .eq("user_id", userId)
        .maybeSingle();

    if (existingError) {
      return res.status(500).json({
        success: false,
        message: existingError.message,
      });
    }

    if (existingMember) {
      return res.status(409).json({
        success: false,
        message:
          "This user is already a member of the project.",
      });
    }

    // ----------------------------------------
    // Insert member
    // ----------------------------------------

    const { data, error } = await supabase
      .from("team_members")
      .insert({
        user_id: userId,
        project_id: projectId,
        role,
        name: name || "Team Member",
        status,
        profile_image:
          profileImage || null,
      })
      .select()
      .single();

    if (error) {
      console.error(
        "Add team member error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    // ----------------------------------------
    // Realtime event
    // ----------------------------------------

    try {
      getIO().emit("teamMemberAdded", data);
    } catch (socketError) {
      console.warn(
        "Team socket event skipped:",
        socketError.message
      );
    }

    return res.status(201).json({
      success: true,
      message: "Team member added successfully.",
      member: data,
    });
  } catch (error) {
    console.error(
      "Add Team Member Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// UPDATE TEAM MEMBER
// ========================================

export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      role,
      name,
      status,
      profileImage,
    } = req.body;

    const updateData = {};

    if (role !== undefined) {
      const allowedRoles = [
        "member",
        "viewer",
        "admin",
      ];

      if (!allowedRoles.includes(role)) {
        return res.status(400).json({
          success: false,
          message: "Invalid team role.",
        });
      }

      updateData.role = role;
    }

    if (name !== undefined) {
      updateData.name = name;
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    if (profileImage !== undefined) {
      updateData.profile_image =
        profileImage || null;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields to update.",
      });
    }

    // ----------------------------------------
    // Get member
    // ----------------------------------------

    const { data: existingMember, error: memberError } =
      await supabase
        .from("team_members")
        .select("*")
        .eq("id", id)
        .single();

    if (memberError || !existingMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found.",
      });
    }

    // Never change owner through this endpoint
    if (
      existingMember.role === "owner" &&
      updateData.role
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Project owner role cannot be changed.",
      });
    }

    const { data, error } = await supabase
      .from("team_members")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(
        "Update team member error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    try {
      getIO().emit("teamMemberUpdated", data);
    } catch (socketError) {
      console.warn(
        "Team socket event skipped:",
        socketError.message
      );
    }

    return res.status(200).json({
      success: true,
      message:
        "Team member updated successfully.",
      member: data,
    });
  } catch (error) {
    console.error(
      "Update Team Member Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// DELETE TEAM MEMBER
// ========================================

export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: member, error: memberError } =
      await supabase
        .from("team_members")
        .select("*")
        .eq("id", id)
        .single();

    if (memberError || !member) {
      return res.status(404).json({
        success: false,
        message: "Team member not found.",
      });
    }

    // Never delete owner
    if (member.role === "owner") {
      return res.status(403).json({
        success: false,
        message:
          "Project owner cannot be removed.",
      });
    }

    const { error } = await supabase
      .from("team_members")
      .delete()
      .eq("id", id);

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
      getIO().emit(
        "teamMemberRemoved",
        {
          id,
          projectId: member.project_id,
          userId: member.user_id,
        }
      );
    } catch (socketError) {
      console.warn(
        "Team socket event skipped:",
        socketError.message
      );
    }

    return res.status(200).json({
      success: true,
      message:
        "Team member removed successfully.",
      memberId: id,
    });
  } catch (error) {
    console.error(
      "Delete Team Member Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};