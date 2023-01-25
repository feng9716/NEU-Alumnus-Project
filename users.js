const { v4: uuidv4 } = require("uuid");

// Random ids
const randomIdStudent = uuidv4();
const randomIdStudent2 = uuidv4();
const randomIdAdvisor = uuidv4();
const randomIdJohn = uuidv4();

const AUTHORITY = {
  student: "student",
  advisor: "advisor",
};

const INFO_FIELDS = [
  "name",
  "graduateTerm",
  "neuEmail",
  "alternamteEmail",
  "jobTitle",
  "company",
  "linkedinProfile",
];

const usersId = {
  "feng.zhen": {
    id: randomIdStudent,
  },
  "test.advisor": {
    id: randomIdAdvisor,
  },
  "magic.j": {
    id: randomIdStudent2,
  },
  "john.d": {
    id: randomIdJohn,
  },
};

const usersInfo = {
  [randomIdStudent]: {
    information: {
      name: "Zhening Feng",
      graduateTerm: "Spring 2023",
      neuEmail: "feng.zhen@northeastern.edu",
      alternateEmail: "mafeng9716@gmail.com",
      jobTitle: "Teaching Assistant",
      company: "Northeastern University",
      linkedinProfile: "https://www.linkedin.com/in/zheningfeng/",
    },
    authority: AUTHORITY["student"],
  },
  [randomIdStudent2]: {
    information: {
      name: "Magic Johnson",
      graduateTerm: "Autumn 2023",
      neuEmail: "magic.j@northeastern.edu",
      alternateEmail: "magicjohn@gmail.com",
      jobTitle: "Something",
      company: "AmaGoo",
      linkedinProfile: "https://www.linkedin.com/in/somemagic/",
    },
    authority: AUTHORITY["student"],
  },
  [randomIdAdvisor]: {
    information: {
      name: "Test Advisor",
      neuEmail: "test.test@northeastern.edu",
      alternateEmail: "test@gmail.com",
      linkedinProfile: "https://www.linkedin.com/in/test/",
    },
    authority: AUTHORITY["advisor"],
  },
  [randomIdJohn]: {
    information: {
      name: "John Doe",
      graduateTerm: "Spring 2021",
      neuEmail: "john.d@northeastern.edu",
      alternateEmail: "jd@gmail.com",
      jobTitle: "SWE",
      company: "Amazon",
      linkedinProfile: "https://www.linkedin.com/in/johnd/",
    },
    authority: AUTHORITY["student"],
  },
};
const newStudentTemplate = (username) => {
  return {
    information: {
      name: "",
      graduateTerm: "",
      neuEmail: `${username}@northeastern.edu`,
      alternateEmail: "",
      jobTitle: "",
      company: "",
      linkedinProfile: "",
    },
    authority: AUTHORITY["student"],
  };
};

const getAllStudents = () => {
  const users = Object.entries(usersInfo);
  const students = users.filter(([key, value]) => value.authority === "student");

  return students;
};

const getUserById = (id) => {
  return usersInfo[id]?.information;
};

const getUserUUID = (username) => {
  const record = userIsStored(username);
  if (record) {
    // if user has a uuid, return that id
    return record;
  }
  // we create a new user info and user id for this username
  const id = uuidv4();
  usersId[username] = { id };
  usersInfo[id] = newStudentTemplate(username);
  return id;
};

const userIsStored = (username) => {
  return usersId[username]?.id;
};

const patchUserById = (id, studentInfo) => {
  const keys = Object.keys(studentInfo);

  for (const keyName of keys) {
    if (INFO_FIELDS.includes(keyName)) {
      // we skip the fields that do not appear in template
      usersInfo[id].information[keyName] = studentInfo[keyName];
    }
  }
};

const isValidInput = (studentInfo) => {
  const keys = Object.keys(studentInfo);

  for (const keyName of keys) {
    // We do not allow input info has undefined fields
    if (!studentInfo[keyName] && studentInfo[keyName] !== "") {
      return false;
    }
  }

  return true;
};

const getUserAuthority = (id) => {
  return usersInfo[id]?.authority;
};

// we do not allow exist same username of student as faculty
const isExistingFaculty = (username) => {
  if (!usersId[username]) {
    return false;
  }

  const { id } = usersId[username];

  return usersInfo[id]?.authority === "faculty";
};

const deleteUserInfo = (id) => {
  if (!getUserById(id)) {
    return false;
  }

  delete usersInfo[id];

  let toDelete = "";
  for (const [key, value] of Object.entries(usersId)) {
    if (value === id) {
      toDelete = key;
      break;
    }
  }

  delete usersId[toDelete];
  return true;
};
module.exports = {
  getAllStudents,
  getUserUUID,
  getUserById,
  patchUserById,
  isValidInput,
  getUserAuthority,
  userIsStored,
  isExistingFaculty,
  deleteUserInfo,
};
