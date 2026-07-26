const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function saveMessage(userId, sender, text) {
  const { error } = await supabase
    .from("messages")
    .insert({
      user_id: userId,
      sender,
      text,
    });

  if (error) throw error;
}

async function loadMessages(userId) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: true,
    });

  if (error) throw error;

  return data;
}

async function deleteMessages(userId) {
  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("user_id", userId);

  if (error) throw error;
}

module.exports = {
  saveMessage,
  loadMessages,
  deleteMessages,
};