import { useContext } from "react";
import Logo from "../Icons/LOGO-10 2.svg";
import "./EditPage.css";
import { getCurrentForm } from "../utils/helpers";
import { FormContext } from "../utils/FormContext";
import { STEPS } from "../utils/constants";


const EditPage = () => {
  const { step } = useContext(FormContext);

  return (
    <div className="main">
      <div className="active__status">

        {/* Check which form components are active and set them to the
         "active" classname with a specific style */}
        <span className={`${step === STEPS.form1 && "active"}`}>
          თანამშრომლის ინფო
        </span>
        <span className={`${step === STEPS.form2 && "active"}`}>
          ლეპტოპის მახასიათებლები
        </span>
      </div>
      <div className="form__step">{getCurrentForm(step)}</div>
      <img className="logo__bellow" src={Logo} />
    </div>
  );
};

export default EditPage;
