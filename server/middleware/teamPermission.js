import supabase from "../config/supabase.js";

const ROLE_LEVELS = {
  viewer: 1,
  member: 2,
  admin: 3,
  owner: 4,
};

export const checkProjectPermission = (minimumRole = "viewer") => {
  return async (req, res, next) => {
    try {
      const userId = req.user?.id;
      const projectId =
        req.params.projectId ||
        req.body.projectId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Authentication required.",
        });
      }

      if (!projectId) {
        return res.status(400).json({
          success: false,
          message: "Project ID is required.",
        });
      }

      // -----------------------------------
      // Check if current user owns project
      // -----------------------------------

      const { data: project, error: projectError } =
        await supabase
          .from("projects")
          .select("id, owner")
          .eq("id", projectId)
          .single();

      if (projectError && projectError.code !== "PGRST116") {
        console.error(
          "Project permission error:",
          projectError
        );

        return res.status(500).json({
          success: false,
          message: projectError.message,
        });
      }

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found.",
        });
      }

      // Owner from projects table
      if (project.owner === userId) {
        req.teamRole = "owner";
        req.projectId = projectId;

        return next();
      }

      // -----------------------------------
      // Check team_members
      // -----------------------------------

      const { data: membership, error: memberError } =
        await supabase
          .from("team_members")
          .select("id, user_id, project_id, role, name, status")
          .eq("user_id", userId)
          .eq("project_id", projectId)
          .single();

      if (memberError && memberError.code !== "PGRST116") {
        console.error(
          "Team membership error:",
          memberError
        );

        return res.status(500).json({
          success: false,
          message: memberError.message,
        });
      }

      if (!membership) {
        return res.status(403).json({
          success: false,
          message: "You are not a member of this project.",
        });
      }

      const userRole = membership.role || "member";

      const userLevel =
        ROLE_LEVELS[userRole] || 0;

      const requiredLevel =
        ROLE_LEVELS[minimumRole] || 0;

      if (userLevel < requiredLevel) {
        return res.status(403).json({
          success: false,
          message:
            "You do not have permission to perform this action.",
        });
      }

      req.teamRole = userRole;
      req.projectId = projectId;
      req.membership = membership;

      next();
    } catch (error) {
      console.error(
        "Team permission middleware error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Permission check failed.",
      });
    }
  };
};
export const checkMemberProjectPermission = (
  minimumRole = "admin"
) => {
  return async (req, res, next) => {
    try {
      const userId = req.user?.id;
      const memberId = req.params.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Authentication required.",
        });
      }

      if (!memberId) {
        return res.status(400).json({
          success: false,
          message: "Member ID is required.",
        });
      }

      // Find target member
      const { data: member, error: memberError } =
        await supabase
          .from("team_members")
          .select(
            "id, user_id, project_id, role, name"
          )
          .eq("id", memberId)
          .single();

      if (memberError || !member) {
        return res.status(404).json({
          success: false,
          message: "Team member not found.",
        });
      }

      // Check project owner
      const { data: project, error: projectError } =
        await supabase
          .from("projects")
          .select("id, owner")
          .eq("id", member.project_id)
          .single();

      if (projectError || !project) {
        return res.status(404).json({
          success: false,
          message: "Project not found.",
        });
      }

      if (project.owner === userId) {
        req.teamRole = "owner";
        req.targetMember = member;
        req.projectId = member.project_id;

        return next();
      }

      // Check current user's membership
      const {
        data: currentMembership,
        error: currentError,
      } = await supabase
        .from("team_members")
        .select("role")
        .eq("user_id", userId)
        .eq("project_id", member.project_id)
        .single();

      if (currentError || !currentMembership) {
        return res.status(403).json({
          success: false,
          message:
            "You are not a member of this project.",
        });
      }

      const roleLevels = {
        viewer: 1,
        member: 2,
        admin: 3,
        owner: 4,
      };

      const currentLevel =
        roleLevels[currentMembership.role] || 0;

      const requiredLevel =
        roleLevels[minimumRole] || 0;

      if (currentLevel < requiredLevel) {
        return res.status(403).json({
          success: false,
          message:
            "You do not have permission to perform this action.",
        });
      }

      // Admin cannot modify another admin
      if (
        currentMembership.role === "admin" &&
        member.role === "admin"
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Admins cannot modify another admin.",
        });
      }

      req.teamRole = currentMembership.role;
      req.targetMember = member;
      req.projectId = member.project_id;

      next();
    } catch (error) {
      console.error(
        "Member permission error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Member permission check failed.",
      });
    }
  };
};