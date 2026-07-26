const chats = new Map();

function getHistory(userId = "guest") {
  if (!chats.has(userId)) {
    chats.set(userId, []);
  }

  return chats.get(userId);
}

function addMessage(userId, role, text) {
  const history = getHistory(userId);

  history.push({
    role,
    parts: [{ text }],
  });

  if (history.length > 30) {
    history.shift();
  }
}

function clearHistory(userId = "guest") {
  chats.delete(userId);
}

module.exports = {
  getHistory,
  addMessage,
  clearHistory,
};