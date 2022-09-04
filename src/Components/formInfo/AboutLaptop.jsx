import { useState, useEffect, useContext } from "react";
import "../styles/AboutPage.css";
import money_Icon from "../../assets/images/Vector.svg";
import warning_icon from "../../assets/images/Vector2.svg";
import { IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { validate2 } from "../../validation/validationForm2";
import { formContext } from "../../worker/formContext";
import { getBrandData, getCpusData } from "../../Apis/apiCall";
import RadioBtn from "../Layout/RadioBtn";

const getState = () => {
  const state = sessionStorage.getItem("state");
  if (state) {
    return state;
  }
};
const getDataType = () => {
  const dataType = sessionStorage.getItem("datatype");
  if (dataType) {
    return dataType;
  }
};

const AboutLaptop = () => {
  const { setStoreInputDetails, storeInputDetails } = useContext(formContext);

  const [brands, setBrands] = useState([]);
  const [cpus, setCpus] = useState([]);
  const [checkFormEl2, setCheckFormEl2] = useState({});
  // const [isSubmit2, setIsSubmit2] = useState("");
  const [img, setImg] = useState(null);
  const [laptopState, setLaptopState] = useState(getState);
  const [dataType, setDataType] = useState(getDataType);

  //Getting brands details
  useEffect(() => {
    getBrandData(setBrands);
  }, []);

  // get all form input values and sets the value to state
  const saveLaptopDetails = (e) => {
    setStoreInputDetails({
      ...storeInputDetails,
      [e.target.name]: e.target.value
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

  // useEffect(() => {
  //   if (Object.keys(checkFormEl2).length === 0 && isSubmit2) {
  //     console.log(storeInputDetails);
  //   }
  // }, [checkFormEl2]);

  const handleImageChange = (event) => {
    setImg(event.target.files[0]);
  };

  useEffect(() => {
    sessionStorage.setItem("state", laptopState);
  }, [laptopState]);
  useEffect(() => {
    sessionStorage.setItem("datatype", dataType);
  }, [dataType]);

  return (
    <div className="laptop__page__div">
      <IconButton
        onClick={() => navigate("/")}
        style={{ position: "fixed", zIndex: "5", top: "23px", left: "40px" }}
      >
        <KeyboardArrowLeftIcon
          style={{ width: "33px", height: "33px" }}
          className="arrow__btn"
        />
      </IconButton>
      <form autoComplete="off" onSubmit={handleSubmit}>
        {!img ? (
          <div
            className="head"
            style={{
              border: `${checkFormEl2.image === true ? "2px dashed red" : ""}`,
            }}
          >
            <span className="txt">
              ჩააგდე ან ატვირთე <br /> ლეპტოპის ფოტო
            </span>
            <label htmlFor="file-upload">
              <div className="input__file">
                <input
                  type="file"
                  id="file-upload"
                  name="file-upload"
                  className="sr-only"
                  onClick={handleImageChange}
                />
                ატვირთე
              </div>
            </label>
          </div>
        ) : (
          <div className="head2">
            <div className="inside__div">
              <img
                className="img"
                alt="uploaded"
                src={URL.createObjectURL(img)}
              />
            </div>

            <div className="div__2">
              <div className="div__3">
                <CheckCircleIcon style={{ color: "#BED918" }} />
                <span className="span__2"> {img.name} </span>
                <span className="span__3">
                  {Math.trunc(img.size / 1024)} mb
                </span>
              </div>

              <div className="label__info">
                <label htmlFor="file-upload">
                  <div className="data">
                    <input
                      type="file"
                      id="file-upload"
                      name="file-upload"
                      onChange={handleImageChange}
                    />
                    თავიდან ატვირთე
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

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
            <RadioBtn
              state={setDataType}
              text={"მეხსიერების ტიპი"}
              first={"SSD"}
              second={"HDD"}
              value={dataType}
              type={"datatype"}
            ></RadioBtn>
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

          <RadioBtn
            state={setLaptopState}
            text={"ლეპტოპის მდგომარეობა"}
            first={"ახალი"}
            second={"მეორადი"}
            value={laptopState}
            type={"state"}
          ></RadioBtn>
        </div>

        <div className="Btns">
          <button onClick={() => navigate(-1)} className="next__btn">
            შემდეგი
          </button>
          <button type="submit" className="next__btn">
            შემდეგი
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutLaptop;
