import "../styles/RadioBtn.css";

const RadioInput = (props) => {
  return (
    <div className="parent__div">
      <legend>{props.text}</legend>
      <div className="child__div">
        <div>
          <input
            type="radio"
            id={props.first}
            name={props.type}
            value={props.first}
            onChange={(e) => {
              props.state(e.target.value);
            }}
            defaultChecked={props.value === props.first}
          />
          <label htmlFor={props.first}>{props.first}</label>
        </div>

        <div>
          <input
            onChange={(e) => {
              props.state(e.target.value);
            }}
            type="radio"
            id={props.second}
            name={props.type}
            value={props.second}
            defaultChecked={props.value === props.second}
          />
          <label htmlFor={props.second}>{props.second}</label>
        </div>
      </div>
    </div>
  );
};
export default RadioInput;
