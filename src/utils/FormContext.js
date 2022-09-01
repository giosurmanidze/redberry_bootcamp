import { createContext } from "react";
import { STEPS } from "./constants";

export const FormContext = createContext({
    step:STEPS.form1,
    setStep: () => {}
})