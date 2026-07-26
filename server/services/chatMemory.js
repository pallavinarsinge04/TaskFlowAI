const chats = new Map();

function createChat(userId) {

  if (!chats.has(userId)) {

    chats.set(userId, []);

  }

  return chats.get(userId);

}

function getHistory(userId) {

  return chats.get(userId) || [];

}

function addMessage(
  userId,
  role,
  text
) {

  const history =
    createChat(userId);

  history.push({

    role,

    parts: [

      {

        text,

      },

    ],

  });

}

function clearChat(userId) {

  chats.delete(userId);

}

module.exports = {

  createChat,

  getHistory,

  addMessage,

  clearChat,

};