import AboutLaptop from "../Components/AboutLaptop"
import EmployeeInfo from "../Components/EmployeeInfo"
import { STEPS } from "./constants"


export const getCurrentForm = (step) => {
    switch(step) {
        case STEPS.form1:
            return <EmployeeInfo />
        case STEPS.form2:
            return <AboutLaptop />
    }
}
