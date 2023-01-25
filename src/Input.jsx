import "./Input.css";

function Input(props) {
  const { part, value, setValue, placeholder, disabled } = props;

  const divClass = `div-${part} input-cell`;
  const inputClassId = `input-${part}`;
  const label = part[0].toUpperCase() + part.slice(1) + ": ";
  return (
    <div className={divClass}>
      <label htmlFor={inputClassId}>{label}</label>
      <input
        type="text"
        className={inputClassId}
        id={inputClassId}
        name={part}
        value={value || ""}
        placeholder={placeholder}
        onInput={(event) => {
          const input = event.target.value;
          setValue(input);
        }}
        disabled={disabled}
        size="30"
      />
    </div>
  );
}

export default Input;
