import Input from "./Input";
import { useState, useEffect } from "react";
import { fetchPatchUserById } from "./services";
import { SERVER_ERROR, CLIENT_ERROR } from "./errors";

function Form(props) {
  const { studentInfo, id, onLogout, setErrorMessage, authority } = props;

  const [nameInput, setNameInput] = useState("");
  const [gradTerm, setGradTerm] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [alternateEmailInput, setAlternateEmailInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [jobInput, setJobInput] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setNameInput(studentInfo.name);
    setGradTerm(studentInfo.graduateTerm);
    setEmailInput(studentInfo.neuEmail);
    setAlternateEmailInput(studentInfo.alternateEmail);
    setCompanyInput(studentInfo.company);
    setJobInput(studentInfo.jobTitle);
    setLinkedIn(studentInfo.linkedinProfile);
  }, [props.studentInfo]);

  function onUpdate(event) {
    event.preventDefault();

    const studentInfo = getFormObject();
    fetchPatchUserById({ id, studentInfo })
      .then((body) => {
        console.log(body);
        setMessage("Update Success");
      })
      .catch((err) => {
        setMessage("");
        console.log(err);
        if (err.error === SERVER_ERROR.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT_ERROR.NO_SESSION });
        }

        return Promise.reject(err);
      })
      .catch((err) => {
        console.log(err);
        if (err.error === CLIENT_ERROR.NO_SESSION) {
          onLogout();
          return;
        }

        setErrorMessage(err.error);
      });
  }

  function getFormObject() {
    const response = {};

    response.name = nameInput;
    response.graduateTerm = gradTerm;
    response.neuEmail = emailInput;
    response.alternateEmail = alternateEmailInput;
    response.company = companyInput;
    response.jobTitle = jobInput;
    response.linkedinProfile = linkedIn;

    return response;
  }

  return (
    <>
      <form className="user-info-form">
        <Input
          part="name"
          value={nameInput}
          setValue={setNameInput}
          placeholder="Legal Name"
          disabled={authority !== "student"}
        ></Input>
        <Input
          part="graduate-term"
          value={gradTerm}
          setValue={setGradTerm}
          placeholder="e.g. Spring 2023"
          disabled={authority !== "student"}
        ></Input>
        <Input
          part="email"
          value={emailInput}
          setValue={setEmailInput}
          placeholder="***@northeastern.edu"
          disabled={true} // we do not allow change of username
        ></Input>
        <Input
          part="alternate-email"
          value={alternateEmailInput}
          setValue={setAlternateEmailInput}
          placeholder="another email"
          disabled={authority !== "student"}
        ></Input>
        <Input
          part="company"
          value={companyInput}
          setValue={setCompanyInput}
          placeholder=""
          disabled={authority !== "student"}
        ></Input>
        <Input
          part="job"
          value={jobInput}
          setValue={setJobInput}
          placeholder=""
          disabled={authority !== "student"}
        ></Input>
        <Input
          part="linkedin"
          value={linkedIn}
          setValue={setLinkedIn}
          placeholder="Linkedin url"
          disabled={authority !== "student"}
        ></Input>
        {authority === "student" && (
          <button type="submit" className="update-button" onClick={onUpdate}>
            Update
          </button>
        )}
      </form>
      {message && (
        <div className="update-message">
          <p>{message}</p>
        </div>
      )}
    </>
  );
}

export default Form;
