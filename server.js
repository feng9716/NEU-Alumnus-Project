const express = require("express");
const cookieParser = require("cookie-parser");

const {
  getUsernameBySid,
  addUserSession,
  removeUserSession,
  isValidUsername,
} = require("./session");

const { SERVER_ERROR } = require("./serverErrors");

const users = require("./users");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.static("./build"));

app.get("/", (req, res) => {
  res.send("index.html");
});

// Retrieve current user's session
// and determine if the user is logged in by cookie[sid]
app.get("/api/v1/session", (req, res) => {
  const sid = req.cookies["sid"];
  const username = getUsernameBySid(sid);

  // 401 Error, Users are not logged in
  if (!sid || !username) {
    res.status(401).json({ error: SERVER_ERROR.AUTH_MISSING });
    return;
  }

  // if current session exists,
  //we can be sure that there is an UUID for that user
  const id = users.getUserUUID(username); // get user uuid
  const authority = users.getUserAuthority(id); //get user authority

  res.json({ username, id, authority });
});

//
app.post("/api/v1/session", (req, res) => {
  const { username, isStudentLogin } = req.body;

  if (!username || username === "") {
    res.status(400).json({ error: SERVER_ERROR.REQUIRE_USERNAME });
    return;
  }

  if (!isValidUsername(username)) {
    // username is not valid, e.g. Empty username -> 400 Unprocessable
    res.status(400).json({ error: SERVER_ERROR.INVALID_USERNAME });
    return;
  }

  if (username === "dog.dog") {
    // 'dog' is not strong enough, 403 error
    res.status(403).json({ error: SERVER_ERROR.WEAK_AUTH });
    return;
  }

  if (users.isExistingFaculty(username)) {
    res.status(405).json({ error: SERVER_ERROR.DUPLICATE_USERNAME });
    return;
  }
  let id = "";
  if (isStudentLogin) {
    // If login is a student login, we always assume there is a student
    // if not, we are creating a new student
    id = users.getUserUUID(username);
  } else {
    // if login is a faculty login, we do not create a new faculty
    // We only check if there is a faculty user
    id = users.userIsStored(username);
    if (!id) {
      res.status(403).json({ error: SERVER_ERROR.WRONG_AUTHORIZATION });
      return;
    }
  }
  const authority = users.getUserAuthority(id);

  // check if the user's authority is same with login authority
  if ((isStudentLogin && authority === "advisor") || (!isStudentLogin && authority === "student")) {
    res.status(403).json({ error: SERVER_ERROR.WRONG_AUTHORIZATION });
    return;
  }

  addUserSession(username, res); // add a session sid with username
  res.json({ username, id, authority });
});

app.delete("/api/v1/session", (req, res) => {
  const sid = req.cookies["sid"];
  if (sid) {
    // remove cookie from browser
    res.clearCookie("sid");
    removeUserSession(sid);
  }

  res.json({ wasLoggedIn: !!sid });
});

// get all students as an array
app.get("/api/v1/students", (req, res) => {
  const sid = req.cookies["sid"];
  const username = getUsernameBySid(sid);

  if (!sid || !username) {
    res.status(401).json({ error: SERVER_ERROR.AUTH_MISSING });
    return;
  }
  const id = users.getUserUUID(username);
  const authority = users.getUserAuthority(id);

  if (!authority || authority !== "advisor") {
    res.status(403).json({ error: SERVER_ERROR.UNAUTHORIZED });
    return;
  }

  const students = users.getAllStudents();

  res.json({ students });
});

app.get("/api/v1/students/:id", (req, res) => {
  const sid = req.cookies["sid"];
  const username = getUsernameBySid(sid);

  if (!sid || !username) {
    res.status(401).json({ error: SERVER_ERROR.AUTH_MISSING });
    return;
  }

  const { id } = req.params;
  const student = users.getUserById(id);

  // console.log(student);

  if (!student) {
    res.status(404).json({ error: SERVER_ERROR.STUDENT_NOT_FOUND });
    return;
  }

  res.json({ student });
});

app.post("/api/v1/students/:id", (req, res) => {
  const sid = req.cookies["sid"];
  const username = getUsernameBySid(sid);

  if (!sid || !username) {
    res.status(401).json({ error: SERVER_ERROR.AUTH_MISSING });
    return;
  }

  const { id } = req.params;
  const { studentInfo } = req.body;

  if (!users.getUserById(id)) {
    res.status(404).json({ error: SERVER_ERROR.STUDENT_NOT_FOUND });
    return;
  }

  if (!users.isValidInput(studentInfo)) {
    res.status(400).json({ error: SERVER_ERROR.INVALID_REQUEST });
    return;
  }

  if (studentInfo.name === "") {
    res.status(400).json({ error: SERVER_ERROR.MISSING_FIELDS });
    return;
  }
  users.patchUserById(id, studentInfo);

  res.json({ id, studentInfo });
});

app.delete("/api/v1/students/:id", (req, res) => {
  const sid = req.cookies["sid"];
  const username = getUsernameBySid(sid);

  if (!sid || !username) {
    res.status(401).json({ error: SERVER_ERROR.AUTH_MISSING });
    return;
  }

  const { id } = req.params;

  if (!users.deleteUserInfo(id)) {
    res.status(404).json({ error: SERVER_ERROR.STUDENT_NOT_FOUND });
    return;
  }

  res.json({ deleted: id });
});

app.listen(PORT, () => {
  console.log(`listening on: http://localhost:${PORT}/`);
});
