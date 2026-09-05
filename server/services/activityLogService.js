import supabase from "../config/supabase.js";
import { getIO } from "../config/socket.js";

export const createActivityLog = async ({
  userId,
  projectId = null,
  action,
  entityType = null,
  entityId = null,
  description = "",
  metadata = {},
}) => {
  try {
    if (!userId || !action) {
      console.warn("Activity log skipped: userId or action missing.");
      return null;
    }

    const { data, error } = await supabase
      .from("activity_logs")
      .insert({
        user_id: userId,
        project_id: projectId,
        action,
        entity_type: entityType,
        entity_id: entityId,
        description,
        metadata,
      })
      .select()
      .single();

    if (error) {
      console.error("Create activity log error:", error);
      return null;
    }

    console.log("✅ Activity log created:", data);

    // Realtime notification
    try {
      const io = getIO();

      io.emit("activityCreated", data);
    } catch (socketError) {
      console.warn(
        "Activity socket event skipped:",
        socketError.message
      );
    }

    return data;
  } catch (error) {
    console.error("Activity log service error:", error);
    return null;
  }
};