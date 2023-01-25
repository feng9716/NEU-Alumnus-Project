import "./Header.css";
import { fetchLogout } from "./services";

function Header(props) {
  const { isLoggedIn, onLogout, setErrorMessage, authority, setPageStatus, setIsLoading } = props;

  function logoutUser(event) {
    event.preventDefault();
    setIsLoading(true);
    fetchLogout()
      .then((body) => {
        onLogout();
      })
      .catch((err) => {
        console.log(err);
        if (err.error !== "network-error") {
          onLogout();
        } else {
          setErrorMessage(err.error);
        }
      })
      .finally(
        setTimeout(() => {
          setIsLoading(false);
        }, 500)
      );
  }

  function showAllStudents() {
    setPageStatus("studentList");
  }
  return (
    <div className="header">
      <h2 className="header-title"> NEU Alumni Database</h2>
      {isLoggedIn && authority === "advisor" && (
        <button className="header-button" type="button" onClick={showAllStudents}>
          All students
        </button>
      )}
      {isLoggedIn && (
        <button className="header-button logout-button" type="button" onClick={logoutUser}>
          Logout
        </button>
      )}
    </div>
  );
}

export default Header;
