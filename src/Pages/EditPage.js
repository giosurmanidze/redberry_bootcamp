import Logo from "../assets/images/LOGO-10 2.svg";
import "./styless/EditPage.css";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Layout/Navbar";

const EditPage = () => {
  return (
    <div className="main">
      <div className="navbar">
        <Navbar />
      </div>
      <Outlet />
      <div className="footer">
        <img className="logo__bellow" src={Logo} />
      </div>
    </div>
  );
};

export default EditPage;
