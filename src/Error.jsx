import { MESSAGE } from "./errors";

function Error(props) {
  const { errorMessage } = props;

  return (
    <div className="error">
      <p>Error: {MESSAGE[errorMessage]}</p>
    </div>
  );
}

export default Error;
