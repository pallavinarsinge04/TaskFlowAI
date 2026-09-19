const { data, error } = await supabase
  .from("ai_automation_history")
  .select(`
    id,
    project_id,
    action_type,
    entity_type,
    entity_id,
    action_data,
    previous_data,
    result_data,
    status,
    can_undo,
    undone,
    undone_at,
    created_at
  `)

  .eq("project_id", projectId)
  .eq("user_id", userId)
  .order("created_at", { ascending: false })
  .limit(50);
  const [undoingId, setUndoingId] = useState(null);
  const undoAction = async (historyId) => {
  try {
    setUndoingId(historyId);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      throw new Error("Authentication session expired.");
    }

    await axios.post(
      `${API_BASE}/automation-history/${historyId}/undo`,
      {},
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    await loadHistory();
  } catch (error) {
    console.error("Undo automation error:", error);

    alert(
      error.response?.data?.message ||
        error.message ||
        "Failed to undo automation."
    );
  } finally {
    setUndoingId(null);
  }
};
{item.can_undo && !item.undone && (
  <button
    type="button"
    className="automation-undo-btn"
    onClick={() => undoAction(item.id)}
    disabled={undoingId === item.id}
  >
    {undoingId === item.id ? "Undoing..." : "↩ Undo"}
  </button>
)}

{item.undone && (
  <span className="automation-undone-badge">
    ↩ Undone
  </span>
)}