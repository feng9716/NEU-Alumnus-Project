import "./StudentList.css";

import { useEffect } from "react";
import { useState } from "react";

import { fetchAllStudents } from "./services";

function StudentList(props) {
  const { onLogout, setErrorMessage, setPageStatus, setId, setIsLoading } = props;
  const [students, setStudent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [queried, setQueried] = useState([]);

  useEffect(() => {
    fetchAllStudents()
      .then((body) => {
        console.log(body);
        setStudent(body.students);
        setQueried(body.students);
      })
      .catch((err) => {
        console.log(err);
        if (err.error === "auth-missing") {
          return Promise.reject({ error: "no-session" });
        }

        return Promise.reject(err);
      })
      .catch((err) => {
        if (err.error === "no-session") {
          onLogout();
          return;
        }

        setErrorMessage(err.error);
      });
  }, []);

  function onClickStudent(event) {
    event.preventDefault();
    const { id } = event.target.dataset;
    setIsLoading(true);
    setTimeout(() => {
      setPageStatus("info");
      setId(id);
      setIsLoading(false);
    }, 1000);
  }

  return (
    <div>
      <div className="search-query">
        <label htmlFor="search-input">Search: </label>
        <input
          type="text"
          className="search-input"
          id="search-input"
          value={searchQuery}
          placeholder="Search By Name"
          onInput={(event) => {
            const query = event.target.value;
            console.log(query);
            setSearchQuery(query);
            if (query === "") {
              setQueried(students);
              return;
            }

            const queried = students.filter((student) =>
              student[1].information.name.toLowerCase().includes(query)
            );
            setQueried(queried);
          }}
        />
      </div>

      <ul className="student-list">
        {queried.map((student) => {
          return (
            <li
              className="student-item"
              key={student[0]}
              data-id={student[0]}
              onClick={onClickStudent}
            >
              {student[1].information.name || "New Student"}&#10148;
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default StudentList;
