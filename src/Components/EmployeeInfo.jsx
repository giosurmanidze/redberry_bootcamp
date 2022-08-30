import React, { useState, useEffect } from "react";
import "./EmployeeInfo.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { IconButton } from "@mui/material";
import { getTeamData, getPositionData } from "../Apis/apiCall";
import { useContext } from "react";
import { FormContext } from "../context/FormContext";
import { useNavigate } from "react-router-dom";

const EmployeeInfo = () => {
  // get states with contextApi
  const { storeInputDetails, setStoreInputDetails } = useContext(FormContext);

  // States
  const [teams, setTeams] = useState([]);
  const [positions, setPositions] = useState([]);
  const [selectVal, setSelectVal] = useState("");
  const [activeId, setActiveId] = useState(0);

  // Team details
  // This function is called every time the components are rendered for the first time
  useEffect(() => {
    getTeamData(setTeams);
  }, []);

  // Receives position data
  useEffect(() => {
    getPositionData(setPositions);
  }, [teams]);

  // get all form input values and sets the value to state
  const saveInputs = (e) => {
    setStoreInputDetails({
      ...storeInputDetails,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "team") {
      setSelectVal(e.target.value);
    }
  };

  // The function checks if the value is equal to the appropriate then assigns it an id, which helps us in team select by displaying the appropriate positions.
  // This function is called on every selectVal changე.

  const checkFunc = () => {
    switch (selectVal) {
      case "დეველოპერი":
        setActiveId(1);
        break;
      case "HR":
        setActiveId(2);
        break;
      case "გაყიდვები":
        setActiveId(3);
        break;
      case "დიზაინი":
        setActiveId(4);
        break;
      case "მარკეტინგი":
        setActiveId(5);
        break;
    }
  };
  useEffect(() => {
    checkFunc();
  }, [selectVal]);

  const navigate = useNavigate();




  //  Validation


  

  return (
    <div className="emploee__page__div">
      <IconButton style={{ position: "fixed", top: "23px", left: "40px" }}>
        <KeyboardArrowLeftIcon
          style={{ width: "33px", height: "33px" }}
          className="arrow__btn"
          onClick={() => navigate("/")}
        />
      </IconButton>
      <form>
        <div className="first_inputs">
          <div className="name">
            <label htmlFor="name">სახელი</label>
            <input
              onChange={saveInputs}
              name="name"
              value={storeInputDetails.name}
              type="text"
              id="name"
            />

            <p> გამოიყენე ქართული ასოები </p>
          </div>
          <div className="lastname">
            <label htmlFor="lastname">გვარი</label>
            <input
              value={storeInputDetails.surname}
              onChange={saveInputs}
              name="surname"
              type="text"
              id="lastname"
            />
            <p> მინიმუმ 2 სიმბოლო,ქართული ასოები</p>
          </div>
        </div>
        <div className="selection">
          <select
            // value={storeInputDetails.team}
            onChange={saveInputs}
            name="team"
            id="select__option"
          >
            <option style={{ display: "none" }} disabled selected>
              თიმი
            </option>
            {/* render each team option */}

            {teams.map((team) => {
              return <option key={team.id}> {team.name} </option>;
            })}
            
          </select>
          <span className="custom__arrow"></span>
        </div>
        <div className="selection">
          <select
            value={storeInputDetails.position}
            onChange={saveInputs}
            name="position"
            id="select__option"
          >
            <option style={{ display: "none" }} disabled selected>
              პოზიცია
            </option>

            {/* filter and get specific position data*/}

            {positions
              .filter((position) => {
                return position.team_id === activeId;
              })
              .map((pos) => {
                return <option key={pos.id}> {pos.name} </option>;
              })}
          </select>
          <span className="custom__arrow"></span>
        </div>
        <div className="email">
          <label htmlFor="email">მეილი</label>
          <input
            value={storeInputDetails.email}
            onChange={saveInputs}
            name="email"
            type="email"
            id="email"
          />
          <p>უნდა მთავრდებოდეს @redberry.ge-ით</p>
        </div>
        <div className="phone">
          <label htmlFor="phone">ტელეფონის ნომერი</label>
          <input
            value={storeInputDetails.phone_number}
            onChange={saveInputs}
            name="phone_number"
            type="number"
            id="phone"
          />
          <p>უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს</p>
        </div>
        <button className="next__btn">შემდეგი</button>
      </form>
    </div>
  );
};

export default EmployeeInfo;
