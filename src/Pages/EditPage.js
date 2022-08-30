import Logo from "../Icons/LOGO-10 2.svg";
import "./EditPage.css";
import EmployeeInfo from '../Components/EmployeeInfo'
import AboutLaptop from '../Components/AboutLaptop'
import Sucsess from "../Components/Sucsess";

const EditPage = () => {
  
  return (
    <div className="main">
      <div className="form__step">
        <EmployeeInfo />
        {/* <AboutLaptop /> */}
      </div>
      <img className="logo__bellow" src={Logo} />
    </div>
  );
};

export default EditPage;
