/**
 * Contains the service calls to APIs.
 * The fetch functions will call targeting API and return the result based on API.
 * If there is error, the error will be returned
 *
 */

import { CLIENT_ERROR } from "./errors";

export const fetchCurrentSession = () => {
  return fetch("/api/v1/session", {
    method: "GET",
    headers: new Headers({
      "content-type": "application/json",
    }),
  })
    .catch((err) => {
      return Promise.reject({ error: CLIENT_ERROR.NETWORK_ERROR }); // network issue
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }

      return response.json();
    });
};

export const fetchLoginByUsername = (username, isStudentLogin) => {
  return fetch("/api/v1/session", {
    method: "POST",
    credentials: "include",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({ username, isStudentLogin }),
  })
    .catch((err) => {
      return Promise.reject({ error: CLIENT_ERROR.NETWORK_ERROR });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
};

export const fetchLogout = () => {
  return fetch("/api/v1/session", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .catch((err) => {
      return Promise.reject({ error: CLIENT_ERROR.NETWORK_ERROR });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }

      return response.json();
    });
};

export const fetchUserById = (id) => {
  return fetch(`/api/v1/students/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  })
    .catch((err) => {
      return Promise.reject({ error: CLIENT_ERROR.NETWORK_ERROR });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }

      return response.json();
    });
};

export const fetchPatchUserById = ({ id, studentInfo }) => {
  return fetch(`/api/v1/students/${id}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ studentInfo }),
  })
    .catch((err) => {
      return Promise.reject({ error: CLIENT_ERROR.NETWORK_ERROR });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }

      return response.json();
    });
};

export const fetchAllStudents = () => {
  return fetch("/api/v1/students", {
    method: "GET",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  })
    .catch((err) => {
      return Promise.reject({ error: CLIENT_ERROR.NETWORK_ERROR });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }

      return response.json();
    });
};

export const fetchDeleteStudent = (id) => {
  return fetch(`/api/v1/student/${id}`, {
    method: "Delete",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  })
    .catch((err) => {
      return Promise.reject({ err: CLIENT_ERROR.NETWORK_ERROR });
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }

      return response.json();
    });
};
