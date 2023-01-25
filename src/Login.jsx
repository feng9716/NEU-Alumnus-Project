import { fetchLoginByUsername } from "./services";
import { useState } from "react";
import Error from "./Error";
import { useEffect } from "react";

function Login(props) {
  const { onLogin, setErrorMessage, errorMessage, setIsLoading } = props;

  const [usernameInput, setUsernameInput] = useState("");
  const [isStudentLogin, setIsStudentLogin] = useState(true);

  function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    fetchLoginByUsername(usernameInput, isStudentLogin)
      .then((body) => {
        onLogin(body);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.error);
      })
      .finally(
        setTimeout(() => {
          setIsLoading(false);
        }, 1500)
      );
  }

  function handleInput(e) {
    const input = e.target.value;
    setUsernameInput(input);
  }

  useEffect(() => {}, []);
  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-username">
          <label htmlFor="username">Username: </label>
          <input id="username" name="username" value={usernameInput} onInput={handleInput}></input>
        </div>

        <button type="submit">{`${isStudentLogin ? "Student" : "Faculty"}`} Login</button>
        <button
          type="button"
          className="switch-authority"
          onClick={() => {
            setIsStudentLogin(!isStudentLogin);
          }}
        >
          Switch Identity
        </button>
      </form>
      {errorMessage && <Error errorMessage={errorMessage}></Error>}
    </div>
  );
}

export default Login;
