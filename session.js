/**
 * Store users's data and session(cookie)data
 */
const { v4: uuidv4 } = require("uuid");

const session = {
  userSids: {}, //
  countUserSession: {}, // remember session
};

const getUsernameBySid = (sid) => {
  return session.userSids[sid]?.username;
};

const addUserSession = (username, res) => {
  const sid = uuidv4(); // create random uuid for cookie
  res.cookie("sid", sid); // add cookie to browser
  session.userSids[sid] = { username }; // pair cookie and user

  if (!session.countUserSession[username]) {
    session.countUserSession[username] = { count: 1 };
  } else {
    session.countUserSession[username].count += 1;
  }
};

const removeUserSession = (sid) => {
  if (!sid) {
    return;
  }
  const username = getUsernameBySid(sid);
  if (!username) {
    return;
  }
  delete session.userSids[sid]; // remove sid from session

  session.countUserSession[username].count -= 1;
  if (session.countUserSession[username].count === 0) {
    delete session.countUserSession[username];
  }
};

const isValidUsername = (username) => {
  let valid = true;
  valid = valid && username.trim();
  valid = valid && username.match(/^[a-z]\S*\.[a-z0-9]\S*$/);
  return valid;
};

module.exports = { getUsernameBySid, addUserSession, removeUserSession, isValidUsername };
