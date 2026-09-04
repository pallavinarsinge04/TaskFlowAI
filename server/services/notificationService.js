import supabase from "../config/supabase.js";
import { getIO } from "../config/socket.js";

export const createNotification = async ({
  userId,
  projectId = null,
  type = "general",
  title,
  message = "",
}) => {
  try {
    if (!userId || !title) {
      console.warn("Notification skipped: userId or title missing.");
      return null;
    }

    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id: userId,
        project_id: projectId,
        type,
        title,
        message,
        read: false,
      })
      .select()
      .single();

    if (error) {
      console.error("Create notification error:", error);
      return null;
    }

    console.log("✅ Notification created:", data);

    try {
      getIO().emit("notificationCreated", data);
    } catch (socketError) {
      console.warn(
        "Notification socket event skipped:",
        socketError.message
      );
    }

    return data;
  } catch (error) {
    console.error("Notification service error:", error);
    return null;
  }
};