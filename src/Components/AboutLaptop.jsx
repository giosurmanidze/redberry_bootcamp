import { useState, useEffect } from "react";
import "./AboutPage.css";
import { IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { getBrandData, getCpusData } from "../Apis/apiCall";
import { useContext } from "react";
import { FormContext } from "../context/FormContext";
import { useNavigate } from "react-router-dom";

const AboutLaptop = () => {
  const {setStoreInputDetails,storeInputDetails} = useContext(FormContext)

  const [brands, setBrands] = useState([]);
  const [cpus, setCpus] = useState([]);

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


  const navigate = useNavigate()


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
      <form>
        <input
          onChange={saveLaptopDetails}
          className="upload__image"
          type="file"
          name="image"
        />
        <div className="name__brand">
          <div className="name">
            <label htmlFor="laptname"> ლეპტოპის სახელი</label>
            <input
              value={storeInputDetails.laptop_name}
              name="laptop_name"
              onChange={saveLaptopDetails}
              type="text"
              id="laptname"
            />
            <p> ლათინური ასოები, ციფრები, !@#$%^&*()_+= </p>
          </div>
          <div className="select selection_2">
            <select
              value={storeInputDetails.brand}
              onChange={saveLaptopDetails}
              name="brand"
              id="select__option"
            >
              <option style={{ display: "none" }} disabled selected>
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
            >
              <option style={{ display: "none" }} disabled selected>
                CPU
              </option>
              {cpus.map((cpu) => {
                return <option key={cpu.id}> {cpu.name}</option>;
              })}
            </select>
            <span className="custom__arrow"></span>
          </div>
          <div className="name">
            <label htmlFor="laptname"> CPU-ს ბირთვი</label>
            <input
              value={storeInputDetails.cpu_cores}
              name="cpu_cores"
              onChange={saveLaptopDetails}
              type="text"
              id="laptname"
            />
            <p> მხოლოდ ციფრები </p>
          </div>
          <div className="name">
            <label htmlFor="laptname"> CPU-ს ნაკადი</label>
            <input
              value={storeInputDetails.cpu_threads}
              name="cpu_threads"
              onChange={saveLaptopDetails}
              type="text"
              id="laptname"
            />
            <p>მხოლოდ ციფრები </p>
          </div>
        </div>
        <div className="below__side">
          <div className="name">
            <label htmlFor="laptname"> ლეპტოპის RAM (GB)</label>
            <input
              value={storeInputDetails.ram}
              name="ram"
              onChange={saveLaptopDetails}
              type="text"
              id="laptname"
            />
            <p>მხოლოდ ციფრები </p>
          </div>
          <div className="radio">
            <h3> მეხსიერების ტიპი </h3>
            <input id="first" name="hard_drive_type" type="radio" value="SSD" />
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
              <label htmlFor="name">შეძენის რიცხვი (არჩევითი)</label>
              <input
                value={storeInputDetails.purchase_date}
                name="purchase_date"
                onChange={saveLaptopDetails}
                type="date"
                id="name"
              />
            </div>
            <div className="name lastname">
              <label htmlFor="lastname">ლეპტოპის ფასი</label>
              <input
                value={storeInputDetails.price}
                name="price"
                onChange={saveLaptopDetails}
                type=""
                id="lastname"
                placeholder="0000"
              />
              <p> მხოლოდ ციფრები </p>
            </div>
          </div>
          <div className="radio__2">
            <h3>ლეპტოპის მდგომარეობა</h3>
            <input
              onChange={saveLaptopDetails}
              id="first"
              name="state"
              type="radio"
              value='ახალი'
            />
            ახალი
            <input
              onChange={saveLaptopDetails}
              id="second"
              name="state"
              type="radio"
              value='მეორადი'
            />
            მეორადი
          </div>
        </div>

        <button
          className="back__btn"
        >
          უკან
        </button>
        <button className="save__btn">
          დამახსოვრება
        </button>
      </form>
    </div>
  );
};

export default AboutLaptop;
