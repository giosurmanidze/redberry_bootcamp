import React, { useState, useEffect } from "react";
import "../styles/EmployeeInfo.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton } from "@mui/material";
import { getTeamData, getPositionData } from "../../Apis/apiCall";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "../../validation/validateForm";
import CustomSelect from "../Layout/CustomSelect";
import { formContext } from "../../worker/formContext";
import { useSessionStorage } from "../../Storage/CustomStorage";



const EmployeeInfo = () => {
  // get states with contextApi
  const { storeInputDetails, setStoreInputDetails } = useContext(formContext);

  // States
  const [teams, setTeams] = useState([]);
  const [positions, setPositions] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [checkFormEl, setCheckFormEl] = useState({});
  const [teamId, setTeamId] = useState(0);
  const [Filtered_positions, setFiltered_positions] = useSessionStorage("filtered_positions", []);
  const [move, setMove] = useState('/editPage/employee')

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
  };

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
        return setMove('/editPage/laptop_info')
      }
    }
  };

  const filterPositionsByTeams = positions.filter(
    (position) => position.team_id === teamId
  );

  useEffect(() => {
    setFiltered_positions(filterPositionsByTeams);
  }, [teamId]);

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
      <form onSubmit={handleSubmit}>
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

        <CustomSelect
            text="თიმი"
            name="team"
            data={teams}
            changeTeamId={(teamId) => setTeamId(teamId)} />

          <CustomSelect
            text="პოზიცია"
            name="position"
            data={Filtered_positions}
          />

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
        <div className="btn" >
          <button type="submit" onClick={() => navigate(move)}  className="next__btn">
            შემდეგი
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeInfo;
