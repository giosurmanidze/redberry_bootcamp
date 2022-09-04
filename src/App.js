import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import EditPage from "./Pages/EditPage";
import Leading from "./Pages/Leading";
import { get_details_From_storage } from "./Storage/storageData";
import EmployeeInfo from "./Components/formInfo/EmployeeInfo";
import AboutLaptop from "./Components/formInfo/AboutLaptop";
import { formContext } from "./worker/formContext";
import Success from "./Pages/Success";


const App = () => {
  //This state stores all form input values
  const [storeInputDetails, setStoreInputDetails] = useState(
    get_details_From_storage
  );

  /// when (storeInputDetails) changes add new info in storage
  useEffect(() => {
    sessionStorage.setItem("DETAILS", JSON.stringify(storeInputDetails));
  }, [storeInputDetails]);

  return (
    <formContext.Provider value={{ storeInputDetails, setStoreInputDetails }}>
      <Routes >
        <Route path="/" element={<Leading />} />
        <Route path="/editPage" element={<EditPage />}>
          <Route index element={<EmployeeInfo />} />
          <Route path="employee" element={<EmployeeInfo />} />
          <Route path="laptop_info" element={<AboutLaptop />} />
        </Route>
        <Route path="success" element={<Success />} />
      </Routes>
    </formContext.Provider>
  );
};

export default App;
