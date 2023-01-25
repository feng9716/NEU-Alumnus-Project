import { useState, useEffect } from "react";
import "./App.css";
import Login from "./Login";
import InfoPage from "./InfoPage";
import Header from "./Header";
import Footer from "./Footer";
import StudentList from "./StudentList";
import Loader from "./Loader";

import { fetchCurrentSession } from "./services";
import { SERVER_ERROR, CLIENT_ERROR } from "./errors";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [id, setId] = useState("");
  const [authority, setAuthority] = useState("");
  const [pageStatus, setPageStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  function setLogin({ username, id, authority }) {
    setIsLoggedIn(true);
    setUsername(username);
    setId(id);
    setErrorMessage("");
    setAuthority(authority);
    setPageStatus(authority.toLowerCase() === "advisor" ? "studentList" : "info");
  }

  function setLogout() {
    setIsLoggedIn(false);
    setUsername("");
    setErrorMessage("");
    setId(""); // we also remove error message when we are logging out
    setAuthority("");
    setPageStatus("");
  }

  function renderMainPart() {
    if (isLoggedIn && authority.toLowerCase() === "student") {
      return (
        <InfoPage
          username={username}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          id={id}
          onLogout={setLogout}
          authority={authority}
        ></InfoPage>
      );
    } else if (
      isLoggedIn &&
      authority.toLowerCase() === "advisor" &&
      pageStatus === "studentList"
    ) {
      return (
        <StudentList
          onLogout={setLogout}
          setErrorMessage={setErrorMessage}
          setPageStatus={setPageStatus}
          setId={setId}
          setIsLoading={setIsLoading}
        ></StudentList>
      );
    } else if (isLoggedIn && authority.toLowerCase() === "advisor" && pageStatus === "info") {
      return (
        <InfoPage
          username={username}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          id={id}
          onLogout={setLogout}
          authority={authority}
        ></InfoPage>
      );
    }

    // return login panel
    return (
      <Login
        username={username}
        onLogin={setLogin}
        onLogout={setLogout}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        setAuthority={setAuthority}
        setIsLoading={setIsLoading}
      ></Login>
    );
  }

  function renderByLoggedInStatus() {
    return (
      <>
        <Header
          isLoggedIn={isLoggedIn}
          onLogout={setLogout}
          setErrorMessage={setErrorMessage}
          authority={authority}
          setPageStatus={setPageStatus}
          setIsLoading={setIsLoading}
        ></Header>
        {isLoading && <Loader></Loader>}
        {!isLoading && <div className="main">{renderMainPart()}</div>}

        <Footer></Footer>
      </>
    );
  }

  useEffect(() => {
    fetchCurrentSession()
      .then((body) => {
        setLogin(body);
      })
      .catch((err) => {
        if (err?.error === SERVER_ERROR["AUTH_MISSING"]) {
          return Promise.reject({ error: CLIENT_ERROR["NO_SESSION"] });
        }
        return Promise.reject(err);
      })
      .catch((err) => {
        if (err?.error === CLIENT_ERROR.NO_SESSION) {
          console.log("We are logging user out");
          setLogout(); // If No-Session Error, we just log user out
          return;
        }
        setErrorMessage(err.error); // For Other Error, we show it to user
      })
      .finally(
        setTimeout(() => {
          setIsLoading(false);
        }, 1500)
      );
  }, []);

  return <div className="App">{renderByLoggedInStatus()}</div>;
}

export default App;
