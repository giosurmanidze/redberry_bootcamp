import { useState, useEffect, useContext } from "react";
import "./AboutPage.css";
import money_Icon from "../Icons/Vector.svg";
import warning_icon from "../Icons/Vector2.svg";
import { IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { getBrandData, getCpusData } from "../Apis/apiCall";
import { FormContext } from "../utils/FormContext";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { validate2 } from "../validation/validationForm2";
import { STEPS } from "../utils/constants";

const AboutLaptop = () => {
  const { setStoreInputDetails, storeInputDetails, setStep } = useContext(FormContext);
  
  // states
  const [brands, setBrands] = useState([]);
  const [cpus, setCpus] = useState([]);
  const [checkFormEl2, setCheckFormEl2] = useState({});
  const [isSubmit2, setIsSubmit2] = useState("");

  //Getting brands details
  useEffect(() => {
    getBrandData(setBrands);
  }, []);

  // get all form input values and sets the value to state
  const saveLaptopDetails = (e) => {
    setStoreInputDetails({
      ...storeInputDetails,
      [e.target.name]: e.target.value,
    });
  };

  //Getting cpus details
  useEffect(() => {
    getCpusData(setCpus);
  }, []);

  const navigate = useNavigate();

  //  Validation
  const handleSubmit = (e) => {
    e.preventDefault();
    setCheckFormEl2(validate2(storeInputDetails));
    setIsSubmit2(true);
  };

  validate2(storeInputDetails);

  useEffect(() => {
    if (Object.keys(checkFormEl2).length === 0 && isSubmit2) {
      console.log(storeInputDetails);
    }
  }, [checkFormEl2]);


  //go back to first form
  const goBack = () => {
    setStep(STEPS.form1);
  };

  return (
    <div className="laptop__page__div">
      <IconButton
        onClick={() => navigate('/')}
        style={{ position: "fixed", zIndex: "5", top: "23px", left: "40px" }}
      >
        <KeyboardArrowLeftIcon
          style={{ width: "33px", height: "33px" }}
          className="arrow__btn"
        />
      </IconButton>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="container">
          <figure className="image-contaier">
            <img
              id="chosen-image"
              src="https://cdn.vox-cdn.com/thumbor/6kuFLvSPKdL551BBRsjM2MTtGy8=/36x0:983x631/920x613/filters:focal(36x0:983x631):format(webp)/cdn.vox-cdn.com/assets/1114614/earth-russia.jpg"
            />
            <figcaption id="file-name">demo file name</figcaption>
          </figure>
        </div>
        <div className="name__brand">
          <div className="name">
            <label
              style={{
                color: `${checkFormEl2.laptop_name ? "red" : ""}`,
              }}
              htmlFor="laptname"
            >
              {" "}
              ლეპტოპის სახელი
            </label>
            <input
              value={storeInputDetails.laptop_name}
              name="laptop_name"
              onChange={saveLaptopDetails}
              type="text"
              id="laptname"
              style={{
                outline: `${
                  checkFormEl2.laptop_name === true ? "1px solid red" : ""
                }`,
              }}
            />
            {checkFormEl2.laptop_name === "" && (
              <CheckCircleIcon
                style={{ top: "43px", right: "8px", fontSize: "28px" }}
                className="done__icon"
              />
            )}
            <p
              style={{
                color: `${checkFormEl2.laptop_name === true ? "red" : ""}`,
              }}
            >
              {" "}
              ლათინური ასოები, ციფრები, !@#$%^&*()_+={" "}
            </p>
          </div>
          <div className="select selection_2">
            <select
              value={storeInputDetails.brand}
              onChange={saveLaptopDetails}
              name="brand"
              id="select__option"
              defaultValue="ლეპტოპის ბრენდი"
              style={{
                alignSelf: "stretch",
                outline: `${
                  checkFormEl2.brand === true ? "1px solid red" : ""
                }`,
              }}
            >
              <option style={{ display: "none" }} disabled>
                ლეპტოპის ბრენდი
              </option>

              {/* render each laptop brand option */}
              {brands.map((brand) => {
                return <option key={brand.id}> {brand.name} </option>;
              })}
            </select>
            <span className="custom__arrow"></span>
          </div>
        </div>
        <div className="devide__line"></div>
        <div className="Cpu__info">
          <div className="select selection_3">
            <select
              value={storeInputDetails.cpu}
              onChange={saveLaptopDetails}
              name="cpu"
              id="select__option"
              defaultValue="CPU"
              style={{
                outline: `${checkFormEl2.cpu === true ? "1px solid red" : ""}`,
              }}
            >
              <option style={{ display: "none" }} disabled>
                CPU
              </option>
              {cpus.map((cpu) => {
                return <option key={cpu.id}> {cpu.name}</option>;
              })}
            </select>
            <span className="custom__arrow"></span>
          </div>
          <div className="name">
            <label
              style={{
                color: `${checkFormEl2.cpu_cores ? "red" : ""}`,
              }}
              htmlFor="laptname"
            >
              {" "}
              CPU-ს ბირთვი
            </label>
            <input
              style={{
                outline: `${checkFormEl2.cpu_cores ? "1px solid red" : ""}`,
              }}
              value={storeInputDetails.cpu_cores}
              name="cpu_cores"
              onChange={saveLaptopDetails}
              type="text"
              id="laptname"
            />
            {checkFormEl2.cpu_cores === "" && (
              <CheckCircleIcon
                style={{ top: "43px", right: "8px", fontSize: "28px" }}
                className="done__icon"
              />
            )}
            <p
              style={{
                color: `${checkFormEl2.cpu_cores ? "red" : ""}`,
              }}
            >
              {" "}
              მხოლოდ ციფრები{" "}
            </p>
          </div>
          <div className="name">
            <label
              style={{
                color: `${checkFormEl2.cpu_threads ? "red" : ""}`,
              }}
              htmlFor="laptname"
            >
              {" "}
              CPU-ს ნაკადი
            </label>
            <input
              value={storeInputDetails.cpu_threads}
              name="cpu_threads"
              onChange={saveLaptopDetails}
              type="text"
              id="laptname"
              style={{
                outline: `${checkFormEl2.cpu_threads ? "1px solid red" : ""}`,
              }}
            />
            {checkFormEl2.cpu_threads === "" && (
              <CheckCircleIcon
                style={{ top: "43px", right: "8px", fontSize: "28px" }}
                className="done__icon"
              />
            )}
            <p
              style={{
                color: `${checkFormEl2.cpu_threads ? "red" : ""}`,
              }}
            >
              მხოლოდ ციფრები{" "}
            </p>
          </div>
        </div>
        <div className="below__side">
          <div className="name">
            <label
              style={{ color: `${checkFormEl2.ram ? "red" : ""}` }}
              htmlFor="laptname"
            >
              {" "}
              ლეპტოპის RAM (GB)
            </label>
            <input
              value={storeInputDetails.ram}
              name="ram"
              onChange={saveLaptopDetails}
              type="text"
              id="laptname"
              style={{
                outline: `${checkFormEl2.ram ? "1px solid red" : ""}`,
              }}
            />
            {checkFormEl2.ram === "" && (
              <CheckCircleIcon
                style={{ top: "43px", right: "8px", fontSize: "28px" }}
                className="done__icon"
              />
            )}
            <p style={{ color: `${checkFormEl2.ram ? "red" : ""}` }}>
              მხოლოდ ციფრები{" "}
            </p>
          </div>
          <div className="radio">
            <div>
              <h5
                style={{
                  fontSize: "18px",
                  color: `${checkFormEl2.hard_drive_type ? "red" : "black"}`,
                }}
                htmlFor="laptname"
              >
                {" "}
                მეხსიერების ტიპი{" "}
              </h5>
              {checkFormEl2.hard_drive_type && (
                <img
                  style={{
                    position: "absolute",
                    width: "22.11px",
                    height: "20px",
                    left: "calc(10% - 22.11px/2 + 185.05px)",
                  }}
                  src={warning_icon}
                />
              )}
            </div>
            <input
              onChange={saveLaptopDetails}
              id="first"
              name="hard_drive_type"
              type="radio"
              value="SSD"
            />
            SSD
            <input
              onChange={saveLaptopDetails}
              id="second"
              name="hard_drive_type"
              type="radio"
              value="HDD"
            />
            HDD
          </div>
        </div>
        <div className="devide__line"></div>
        <div className="last__div">
          <div className="price__date">
            <div className="name">
              <label
                style={{
                  fontSize: "18px",
                  color: `${checkFormEl2.purchase_date ? "red" : "black"}`,
                }}
                htmlFor="name"
              >
                შეძენის რიცხვი (არჩევითი)
              </label>
              <input
                value={storeInputDetails.purchase_date}
                name="purchase_date"
                onChange={saveLaptopDetails}
                id="name"
                type="date"
                style={{
                  outline: `${
                    checkFormEl2.purchase_date ? "1px solid red" : ""
                  }`,
                }}
              />
              {checkFormEl2.purchase_date === "" && (
                <CheckCircleIcon
                  style={{ top: "43px", right: "8px", fontSize: "28px" }}
                  className="done__icon"
                />
              )}
            </div>
            <div className="name lastname">
              <label
                style={{ color: `${checkFormEl2.price ? "red" : ""}` }}
                htmlFor="lastname"
              >
                ლეპტოპის ფასი
              </label>
              <input
                style={{
                  outline: `${checkFormEl2.price ? "1px solid red" : ""}`,
                }}
                value={storeInputDetails.price}
                name="price"
                onChange={saveLaptopDetails}
                type="text"
                id="lastname"
                placeholder="0000"
              />
              {checkFormEl2.price === "" && (
                <CheckCircleIcon
                  style={{ top: "43px", right: "25px", fontSize: "28px" }}
                  className="done__icon"
                />
              )}
              <img className="money_icon" src={money_Icon} />
              <p style={{ color: `${checkFormEl2.price ? "red" : ""}` }}>
                {" "}
                მხოლოდ ციფრები{" "}
              </p>
            </div>
          </div>
          <div className="radio__2">
            <div>
              <h3
                style={{
                  fontSize: "18px",
                  color: `${checkFormEl2.state ? "red" : "black"}`,
                }}
              >
                ლეპტოპის მდგომარეობა
              </h3>
              {checkFormEl2.state && (
                <img
                  style={{
                    position: "absolute",
                    width: "22.11px",
                    height: "20px",
                    left: "calc(10% - 22.11px/2 + 185.05px)",
                  }}
                  src={warning_icon}
                />
              )}
            </div>
            <input
              onChange={saveLaptopDetails}
              id="first"
              name="state"
              type="radio"
              value="ახალი"
            />
            ახალი
            <input
              onChange={saveLaptopDetails}
              id="second"
              name="state"
              type="radio"
              value="მეორადი"
            />
            მეორადი
          </div>
        </div>

        <button type="button" onClick={goBack} className="back__btn">
          უკან
        </button>
        <button type="submit" className="save__btn">
          დამახსოვრება
        </button>
      </form>
    </div>
  );
};

export default AboutLaptop;
