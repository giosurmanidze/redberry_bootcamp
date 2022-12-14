import "./styless/Leading.css";
import Logo from "../assets/images/LOGO-02 1.svg";
import large_icon from "../assets/images/Group 1.png";
import { useNavigate } from "react-router-dom";

const Leading = () => {
  const navigate = useNavigate()


  return (
    <div className="leading__page">
      <img className="logo" src={Logo} />
      <img className="larg__icon" src={large_icon} />
      <div className="btns">
        <button className="next__btn" onClick={() => navigate('/editPage/employee')}>
          ჩანაწერების დამატება
        </button>
        <button className="next__btn"> ჩანაწერების სია </button>
      </div>
    </div>
  );
};

export default Leading;
