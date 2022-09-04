import { NavLink } from "react-router-dom";
import '../styles/Navbar.css'

const Navbar = () => {

  return (
    <div className="active__status">
      <NavLink  to="/editPage/employee"> თანამშრომლის ინფო </NavLink>
      <NavLink  to="/editPage/laptop_info"> ლეპტოპის მახასიათებლები </NavLink>
    </div>
  );
};

export default Navbar;
