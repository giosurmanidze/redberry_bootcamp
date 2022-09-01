import React, { useState, useEffect } from "react";
import "./EmployeeInfo.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton } from "@mui/material";
import { getTeamData, getPositionData } from "../Apis/apiCall";
import { useContext } from "react";
import { FormContext } from "../utils/FormContext";
import { useNavigate } from "react-router-dom";
import { validate } from "../validation/validateForm";
import { STEPS } from "../utils/constants";

const EmployeeInfo = () => {
  const { storeInputDetails, setStoreInputDetails, setStep } =useContext(FormContext);

  // States
  const [teams, setTeams] = useState([]);
  const [positions, setPositions] = useState([]);
  const [selectVal, setSelectVal] = useState(storeInputDetails.team);
  const [activeId, setActiveId] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [checkFormEl, setCheckFormEl] = useState({});


  // Team details
  // This function is called every time the components are rendered for the first time
  useEffect(() => {
    getTeamData(setTeams);
  }, []);

  // Receives position data
  useEffect(() => {
    getPositionData(setPositions);
  }, [teams]);


  /// stored all valid inputs in state
  const handleChange = (e) => {
    setStoreInputDetails({
      ...storeInputDetails,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "team") {
      setSelectVal(e.target.value);
    }
  };
  // The function checks if the value is equal to the appropriate then assigns it an id,
  //  which helps us in team select by displaying the appropriate positions.
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setCheckFormEl(validate(storeInputDetails));
    setIsSubmit(true);
  };

  validate(storeInputDetails);

  useEffect(() => {
    if (Object.keys(checkFormEl).length === 0 && isSubmit) {
      console.log(storeInputDetails);
    }
  }, [checkFormEl]);

  // next form display checking
  // if all values stored in checkFormEl fulfills the conditions,
  // then update (setStep) state and go to next form
  const checkNextForm = () => {
    const isEmpty = Object.entries(checkFormEl);
    console.log(isEmpty);

    for (let i = 0; i < isEmpty.length; i++) {
      if (isEmpty.every((element) => element[1] === "")) {
        setStep(STEPS.form2);
      }
    }
  };

  return (
    <div className="emploee__page__div">
      <IconButton
        onClick={() => navigate("/")}
        style={{ position: "fixed", top: "23px", left: "40px" }}
      >
        <KeyboardArrowLeftIcon
          style={{ width: "33px", height: "33px" }}
          className="arrow__btn"
        />
      </IconButton>
      <form  onSubmit={handleSubmit}>
        <div className="first_inputs">
          <div className="name">
            <label
              style={{ color: `${checkFormEl.name ? "red" : ""}` }}
              htmlFor="name"
            >
              სახელი
            </label>
            <input
              onChange={handleChange}
              name="name"
              value={storeInputDetails.name}
              type="text"
              id="name"
              style={{
                outline: `${checkFormEl.name ? "1px solid red" : ""}`,
              }}
            />
            {checkFormEl.name === "" && (
              <CheckCircleIcon
                style={{ top: "43px", right: "8px", fontSize: "28px" }}
                className="done__icon"
              />
            )}
            <p style={{ color: `${checkFormEl.name ? "red" : ""}` }}>
              მინიმუმ 2 სიმბოლო, ქართული ასოები
            </p>
          </div>
          <div className="lastname">
            <label
              style={{ color: `${checkFormEl.surname ? "red" : ""}` }}
              htmlFor="lastname"
            >
              გვარი
            </label>
            <input
              style={{
                outline: `${checkFormEl.surname ? "1px solid red" : ""}`,
              }}
              value={storeInputDetails.surname}
              onChange={handleChange}
              name="surname"
              type="text"
              id="lastname"
            />
            {checkFormEl.surname === "" && (
              <CheckCircleIcon
                style={{ top: "43px", right: "8px", fontSize: "28px" }}
                className="done__icon"
              />
            )}
            <p style={{ color: `${checkFormEl.surname ? "red" : ""}` }}>
              {" "}
              მინიმუმ 2 სიმბოლო,ქართული ასოები
            </p>
          </div>
        </div>
        <div className="selection">
          <select
            style={{
              outline: `${checkFormEl.position ? "1px solid red" : ""}`,
            }}
            onChange={handleChange}
            value={storeInputDetails.team}
            name="team"
            id="select__option"
          >
            <option style={{ display: "none" }} disabled selected>
              თიმი
            </option>
            {/* render each team option */}

            {teams.map((team) => {
              return <option  key={team.id}> {team.name} </option>;
            })}
          </select>
          <span className="custom__arrow"></span>
        </div>
        <div className="selection">
          <select
            style={{
              outline: `${checkFormEl.position ? "1px solid red" : "none"}`,
            }}
            onChange={handleChange}
            value={storeInputDetails.position}
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
                return <option  key={pos.id}> {pos.name} </option>;
              })}
          </select>
          <span className="custom__arrow"></span>
        </div>
        <div className="email">
          <label
            style={{ color: `${checkFormEl.email ? "red" : ""}` }}
            htmlFor="email"
          >
            მეილი
          </label>
          <input
            style={{
              outline: `${checkFormEl.email ? "1px solid red" : ""}`,
            }}
            value={storeInputDetails.email}
            onChange={handleChange}
            name="email"
            type="email"
            id="email"
          />
          {checkFormEl.email === "" && (
            <CheckCircleIcon
              style={{ top: "43px", right: "8px", fontSize: "28px" }}
              className="done__icon"
            />
          )}

          <p style={{ color: `${checkFormEl.email ? "red" : ""}` }}>
            უნდა მთავრდებოდეს @redberry.ge-ით
          </p>
        </div>
        <div className="phone">
          <label
            style={{
              color: `${checkFormEl.phone_number ? "red" : ""}`,
            }}
            htmlFor="phone"
          >
            ტელეფონის ნომერი
          </label>
          <input
            style={{
              outline: `${checkFormEl.phone_number ? "1px solid red" : ""}`,
            }}
            value={storeInputDetails.phone_number}
            onChange={handleChange}
            name="phone_number"
            type="number"
            id="phone"
          />
          {checkFormEl.phone_number === "" && (
            <CheckCircleIcon
              style={{ top: "43px", right: "8px", fontSize: "28px" }}
              className="done__icon"
            />
          )}
          <p
            style={{
              color: `${checkFormEl.phone_number ? "red" : ""}`,
            }}
          >
            უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს
          </p>
        </div>
        <button type="submit" onClick={checkNextForm} className="next__btn">
          შემდეგი
        </button>
      </form>
    </div>
  );
};

export default EmployeeInfo;
