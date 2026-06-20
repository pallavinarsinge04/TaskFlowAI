function getAISuggestion(task) {
  if (!task) return "Low";

  const text = task.toLowerCase();

  if (
    text.includes("bug") ||
    text.includes("urgent") ||
    text.includes("critical")
  ) {
    return "High";
  }

  if (
    text.includes("api") ||
    text.includes("backend") ||
    text.includes("database")
  ) {
    return "Medium";
  }

  return "Low";
}

module.exports = {
  getAISuggestion,
};