import { useState, useEffect } from "react";
import Form from "./Form";
import Error from "./Error";
import { fetchUserById } from "./services";
import { CLIENT_ERROR, MESSAGE, SERVER_ERROR } from "./errors";

function InfoPage(props) {
  const { username, errorMessage, setErrorMessage, id, onLogout, authority } = props;

  const [studentInfo, setStudentInfo] = useState({});

  useEffect(() => {
    fetchUserById(id)
      .then((body) => {
        console.log(body);
        setStudentInfo(body.student);
      })
      .catch((err) => {
        console.log(err.error);
        if (err.error === SERVER_ERROR.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT_ERROR.NO_SESSION });
        }
        return Promise.reject(err);
      })
      .catch((err) => {
        if (err.error === CLIENT_ERROR.NO_SESSION) {
          onLogout();
          return;
        }

        setErrorMessage(err.error);
      });
  }, []);

  return (
    <>
      <div className="user-info">
        <h2>Detail Information</h2>
        <Form
          studentInfo={studentInfo}
          id={id}
          onLogout={onLogout}
          setErrorMessage={setErrorMessage}
          authority={authority}
        ></Form>
      </div>
      {errorMessage && <Error errorMessage={errorMessage}></Error>}
    </>
  );
}

export default InfoPage;
