import React, { useContext } from "react";
import "./Leading.css";
import Logo from "../Icons/LOGO-02 1.svg";
import large_icon from "../Icons/Group 1.png";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../utils/FormContext";
import { STEPS } from "../utils/constants";

const Leading = () => {
  const { setStep } = useContext(FormContext);
  const navigate = useNavigate();

  // When we click the button, the step state will be updated
  //  and we navigate to the first form
  
  const start_app = () => {
    setStep(STEPS.form1);
    return navigate("/editPage");
  };
  return (
    <div className="leading__page">
      <img className="logo" src={Logo} />
      <img className="larg__icon" src={large_icon} />
      <div className="btns">
        <button className="next__btn" onClick={() => start_app()}>
          ჩანაწერების დამატება
        </button>
        <button className="next__btn"> ჩანაწერების სია </button>
      </div>
    </div>
  );
};

export default Leading;
