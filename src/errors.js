export const SERVER_ERROR = {
  AUTH_MISSING: "auth-missing",
  REQUIRE_USERNAME: "require-username",
  INVALID_USERNAME: "invalid-username",
  WEAK_AUTH: "weak-auth",
  UNAUTHORIZED: "unauthorized-identity",
  STUDENT_NOT_FOUND: "student-not-found",
  INVALID_REQUEST: "invalid-request",
  WRONG_AUTHENTICATION: "wrong-authentication",
  MISSING_FIELDS: "missing-fields",
  DUPLICATE_USERNAME: "duplicate-username",
};

export const CLIENT_ERROR = {
  NETWORK_ERROR: "network-error",
  NO_SESSION: "no-session",
};

export const MESSAGE = {
  [SERVER_ERROR.REQUIRE_USERNAME]: " Please enter the username",
  [SERVER_ERROR.INVALID_USERNAME]: "Please enter a username in xxx.xxxx(NEU style)",
  [SERVER_ERROR.WEAK_AUTH]: "'dog.dog' is a too weak username",
  [SERVER_ERROR.UNAUTHORIZED]: "Current user does not have authority to perform this action.",
  [SERVER_ERROR.STUDENT_NOT_FOUND]: "We cannot find the student",
  [SERVER_ERROR.INVALID_REQUEST]: "Your input is missing value. Please check and submit again",
  [CLIENT_ERROR.NETWORK_ERROR]: "Connection error, please check connection and try again",
  [SERVER_ERROR.WRONG_AUTHENTICATION]: "You are not allowed to login with current authority",
  [SERVER_ERROR.MISSING_FIELDS]: "Name cannot be empty",
  [SERVER_ERROR.DUPLICATE_USERNAME]:
    "One of faculties already owned the username, please choose another one.",
  default: "Unknown error, please try again",
};

// module.exports = {
//   SERVER_ERROR,
//   CLIENT_ERROR,
//   MESSAGE,
// };
