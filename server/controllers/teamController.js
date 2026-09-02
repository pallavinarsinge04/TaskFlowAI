import supabase from "../config/supabase.js";
import { getIO } from "../config/socket.js";

/*
========================================================
GET PROJECT MEMBERS
========================================================
*/
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
    console.error("Get Project Members Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load team members.",
    });
  }
};


/*
========================================================
ADD TEAM MEMBER
========================================================
*/
export const addTeamMember = async (req, res) => {
  try {
    const { projectId } = req.params;

    const {
      userId,
      name = "",
      role = "member",
      profileImage = "",
      status = "Offline",
    } = req.body || {};

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

    /*
    ----------------------------------------------------
    Verify user exists in Supabase Auth
    ----------------------------------------------------
    */

    const {
      data: authData,
      error: authError,
    } = await supabase.auth.admin.getUserById(userId);

    if (authError || !authData?.user) {
      return res.status(404).json({
        success: false,
        message:
          "The Supabase user was not found.",
      });
    }

    /*
    ----------------------------------------------------
    Check duplicate
    ----------------------------------------------------
    */

    const {
      data: existingMember,
      error: existingError,
    } = await supabase
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

    /*
    ----------------------------------------------------
    Insert member
    ----------------------------------------------------
    */

    const user = authData.user;

    const finalName =
      name.trim() ||
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "Team Member";

    const finalProfileImage =
      profileImage ||
      user.user_metadata?.avatar_url ||
      user.user_metadata?.picture ||
      null;

    const { data, error } = await supabase
      .from("team_members")
      .insert({
        user_id: userId,
        project_id: projectId,
        role,
        name: finalName,
        status,
        profile_image: finalProfileImage,
      })
      .select()
      .single();

    if (error) {
      console.error(
        "Insert team member error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    /*
    ----------------------------------------------------
    REALTIME
    ----------------------------------------------------
    */

    try {
      getIO().emit(
        "teamMemberAdded",
        data
      );
    } catch (socketError) {
      console.warn(
        "Team socket event skipped:",
        socketError.message
      );
    }

    return res.status(201).json({
      success: true,
      message:
        "Team member added successfully.",
      member: data,
    });
  } catch (error) {
    console.error(
      "Add Team Member Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to add team member.",
    });
  }
};


/*
========================================================
UPDATE TEAM MEMBER
========================================================
*/
export const updateTeamMember = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      role,
      name,
      status,
      profileImage,
    } = req.body || {};

    const updateData = {};

    /*
    ----------------------------------------------------
    ROLE
    ----------------------------------------------------
    */

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

    /*
    ----------------------------------------------------
    NAME
    ----------------------------------------------------
    */

    if (name !== undefined) {
      updateData.name =
        String(name).trim();
    }

    /*
    ----------------------------------------------------
    STATUS
    ----------------------------------------------------
    */

    if (status !== undefined) {
      const allowedStatuses = [
        "Online",
        "Away",
        "Busy",
        "Offline",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status.",
        });
      }

      updateData.status = status;
    }

    /*
    ----------------------------------------------------
    PROFILE IMAGE
    ----------------------------------------------------
    */

    if (profileImage !== undefined) {
      updateData.profile_image =
        profileImage || null;
    }

    if (
      Object.keys(updateData).length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "No fields provided for update.",
      });
    }

    /*
    ----------------------------------------------------
    FIND MEMBER
    ----------------------------------------------------
    */

    const {
      data: existingMember,
      error: memberError,
    } = await supabase
      .from("team_members")
      .select("*")
      .eq("id", id)
      .single();

    if (memberError || !existingMember) {
      return res.status(404).json({
        success: false,
        message:
          "Team member not found.",
      });
    }

    /*
    ----------------------------------------------------
    OWNER PROTECTION
    ----------------------------------------------------
    */

    if (
      existingMember.role === "owner" &&
      updateData.role !== undefined
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Project owner role cannot be changed.",
      });
    }

    /*
    ----------------------------------------------------
    UPDATE
    ----------------------------------------------------
    */

    const {
      data,
      error,
    } = await supabase
      .from("team_members")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    /*
    ----------------------------------------------------
    REALTIME
    ----------------------------------------------------
    */

    try {
      getIO().emit(
        "teamMemberUpdated",
        data
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
      message:
        "Failed to update team member.",
    });
  }
};


/*
========================================================
DELETE TEAM MEMBER
========================================================
*/
export const deleteTeamMember = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      data: member,
      error: memberError,
    } = await supabase
      .from("team_members")
      .select("*")
      .eq("id", id)
      .single();

    if (memberError || !member) {
      return res.status(404).json({
        success: false,
        message:
          "Team member not found.",
      });
    }

    /*
    ----------------------------------------------------
    OWNER PROTECTION
    ----------------------------------------------------
    */

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
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    /*
    ----------------------------------------------------
    REALTIME
    ----------------------------------------------------
    */

    try {
      getIO().emit(
        "teamMemberRemoved",
        {
          id,
          projectId:
            member.project_id,
          userId:
            member.user_id,
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
      message:
        "Failed to remove team member.",
    });
  }
};