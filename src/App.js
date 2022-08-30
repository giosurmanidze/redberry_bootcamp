import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import EditPage from "./Pages/EditPage";
import Leading from "./Pages/Leading";
import { FormContext } from "./context/FormContext";

function App() {
  //This state stores all form input values
  const [storeInputDetails, setStoreInputDetails] = useState({
    brand: "",
    cpu: "",
    cpu_cores: "",
    cpu_threads: "",
    email: "",
    hard_drive_type: "",
    image: "",
    laptop_name: "",
    name: "",
    phone_number: "",
    position: "",
    price: "",
    purchase_date: "",
    ram: "",
    state: "",
    team: "",
    surname: "",
  });

  //set all input values in sessionStorage
  // useEffect(() => {
  //   sessionStorage.setItem("details", JSON.stringify(storeInputDetails));
  // }, [storeInputDetails]);

  return (
    <FormContext.Provider value={{ storeInputDetails, setStoreInputDetails }}>
      <Routes>
        <Route path="/" element={<Leading />} />
        <Route path="/editPage" element={<EditPage />} />
      </Routes>
    </FormContext.Provider>
  );
}

export default App;
