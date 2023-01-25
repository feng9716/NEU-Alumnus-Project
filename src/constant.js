export const SERVER_ERRORS = {
  WEAK_AUTH: "weak-auth",
  AUTH_MISSING: "auth-missing",
  REQUIRE_USERNAME: "require-username",
};

export const CLIENT_ERRORS = {
  NETWORK_ERROR: "network-error",
  NO_SESSION: "no-session",
};

export const MESSAGES = {
  [SERVER_ERRORS.WEAK_AUTH]: "'dog' is not a weak username, please choose another username",
  [SERVER_ERRORS.AUTH_MISSING]: "Please login to continue",
  [SERVER_ERRORS.REQUIRE_USERNAME]: "Please enter a valid username, with characters and number",
  [CLIENT_ERRORS.NETWORK_ERROR]: "Please check you network connection and try again",
  default: "Something went wrong.  Please try again",
};
