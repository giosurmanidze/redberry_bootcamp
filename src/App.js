import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import EditPage from "./Pages/EditPage";
import Leading from "./Pages/Leading";
import { FormContext } from "./utils/FormContext";
import { get_details_From_storage, saveStep } from "./Storage/storageData";

function App() {
  //This state stores all form input values
  const [storeInputDetails, setStoreInputDetails] = useState(
    get_details_From_storage
  );

  // Get current component (form to renderd)
  const [step, setStep] = useState(saveStep);

  /// when (storeInputDetails) changes add new info in storage
  useEffect(() => {
    sessionStorage.setItem("DETAILS", JSON.stringify(storeInputDetails));
  }, [storeInputDetails]);

  useEffect(() => {
    sessionStorage.setItem("STEP", step);
  }, [step]);

  return (
    <FormContext.Provider
      value={{ storeInputDetails, setStoreInputDetails, setStep, step }}
    >
      <Routes>
        <Route path="/" element={<Leading />} />
        <Route path="/editPage" element={<EditPage />} />
      </Routes>
    </FormContext.Provider>
  );
}

export default App;
