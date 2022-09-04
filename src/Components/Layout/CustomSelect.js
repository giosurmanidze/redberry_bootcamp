import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useEffect, useState, useRef } from "react";
import { useSessionStorage } from "../../Storage/CustomStorage";
import "../styles/CustomSelect.css";

const CustomSelect = ({ data, text, changeTeamId, name }) => {
  const node = useRef();

  const [selected, setSelected] = useSessionStorage(name, "");
  const [isOpen, setIsOpen] = useState(false);

  const show = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (selectedValue) => {
    setSelected(selectedValue);
    setIsOpen(false);

    if (!selectedValue.team_id && name === "team")
      changeTeamId(selectedValue.id);
  };

  return (
    <div ref={node} onClick={show} className="main__div">
      {selected ? selected.name : text}
      <button type="button">
        <ArrowDropDownIcon style={{ fontSize: "30px" }} />
      </button>

      {isOpen && (
        <ul className="select__box">
          {data.map((data) => (
            <li
              key={data.id}
              onClick={() => {
                handleChange(data);
                setIsOpen(false);
              }}
            >
              <span>{data.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
