import React, { useState, useEffect } from "react";
import axios from "axios";
import convert from "convert-units";
import DocketCard from "../../components/DocketCard/DocketCard";
import IntakeCard from "../../components/IntakeCard/IntakeCard";
import exportToCSV from "../../utils/exportToCSV";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./FruitIntakePage.scss";

// const { REACT_APP_API_BASE_PATH } = process.env;

function FruitIntakePage() {
  // Docket State and Functions
  const [docketList, setDocketList] = useState([]);
  const [docketData, setDocketData] = useState({
    vintage: "",
    grower: "",
    varietal: "",
    vineyard: "",
    block: "",
    row: "",
  });
  const [selectedDocket, setSelectedDocket] = useState("");
  const [intakeDate, setIntakeDate] = useState(new Date());
  const [formErrors, setFormErrors] = useState({});

  // Docket API Request
  const fetchDocketList = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/dockets`);
      setDocketList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDocketList();
  }, []);

  const handleSelectedDocketChange = (docket_name) => {
    setSelectedDocket(docket_name);

    // Clear the error message for the selected docket
    setFormErrors((prevErrors) => ({ ...prevErrors, docket_name: "" }));
  };

  const handleInputChangeDocket = (e) => {
    const { name, value } = e.target;

    // Clear the error message for the changed field
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    setDocketData({ ...docketData, [name]: value });
  };

  const handleSubmitDocket = async (e) => {
    e.preventDefault();

    if (handleSubmitDocketValidation()) {
      try {
        await axios.post("http://localhost:8080/api/dockets", docketData);
        setDocketData({
          vintage: "",
          grower: "",
          varietal: "",
          vineyard: "",
          block: "",
          row: "",
        });
        fetchDocketList();
        // Handle successful response
      } catch (error) {
        console.error("Error submitting data:", error.message);
      }
    }
  };

  // Intake State and Functions
  const [intakeList, setIntakeList] = useState([]);
  const [intakeData, setIntakeData] = useState({
    docket_name: "",
    intake_date: "",
    bins: "",
    total_weight: "",
    tare_weight: "",
    block: "",
    row: "",
  });

  // Intake API Request
  const fetchIntakeList = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/intakes`);
      setIntakeList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchIntakeList();
  }, []);

  const handleInputChangeIntake = (e) => {
    const { name, value } = e.target;
    
    // Clear the error message for the changed field
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    setIntakeData({ ...intakeData, [name]: value });
  };

  // Unit Conversion (tare_weight and total_weight)

  const convertUnit = (weight) => {
    try {
      const [,amount, units] = weight.match(/^(\d+)\s*([a-zA-Z]+)$/)
      console.log(amount,units)
      return weight;

    } catch (error) {
      return weight;
    }
  }

  const handleInputChangeIntakeWeight = (e) => {
    let { name, value } = e.target;
    
    // Clear the error message for the changed field
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    value = convertUnit(value);

    setIntakeData({ ...intakeData, [name]: value });

  };


  const handleSubmitIntake = async (e) => {
    e.preventDefault();

    
    const docketData = docketList.find(
      (el) => el.docket_name === selectedDocket
      );
      console.log("docketList:", docketList);
      console.log("docketData:", docketData);
      console.log("selectedDocket:", selectedDocket);


    const newIntakeData = Object.assign({}, intakeData, docketData);
    newIntakeData.intake_date = new Date(intakeDate)
      .toISOString()
      .slice(0, 10);

      console.log("newIntakeData:", newIntakeData);


    if (handleSubmitIntakeValidation()) {
      console.log("submitting")
    try {
      await axios.post("http://localhost:8080/api/intakes", newIntakeData);
      setSelectedDocket("");
      setIntakeData({
        docket_name: "",
        intake_date: "",
        bins: "",
        total_weight: "",
        tare_weight: "",
        block: "",
        row: "",
      });
      fetchIntakeList();
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  }};

  // Date Picker
  const handleDateChange = (date) => {
    setIntakeDate(date);
  };

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(null);

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  // Dockets Search
  const [docketSearchQuery, setDocketSearchQuery] = useState("");
  const [searchedDocketCards, setSearchedDocketCards] = useState(docketList);

  const handleDocketSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setDocketSearchQuery(query);
    searchDocketCards(query);
  };

  const searchDocketCards = (query) => {
    if (query.trim() === "") {
      setSearchedDocketCards(docketList);
    } else {
      const searched = docketList.filter(
        (docket) =>
          docket.docket_name.toLowerCase().includes(query) ||
          docket.vintage.toString().includes(query) ||
          docket.grower.toLowerCase().includes(query) ||
          docket.varietal.toLowerCase().includes(query) ||
          docket.vineyard.toLowerCase().includes(query) ||
          docket.block.toLowerCase().includes(query) ||
          docket.row.toLowerCase().includes(query)
      );
      setSearchedDocketCards(searched);
    }
  };

  useEffect(() => {
    searchDocketCards(docketSearchQuery);
  }, [docketSearchQuery, docketList]);

  // Intakes Search
  const [intakeSearchQuery, setIntakeSearchQuery] = useState("");
  const [searchedIntakeCards, setSearchedIntakeCards] = useState(intakeList);

  const handleIntakeSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setIntakeSearchQuery(query);
    searchIntakeCards(query);
  };

  const searchIntakeCards = (query) => {
    if (query.trim() === "") {
      setSearchedIntakeCards(intakeList);
    } else {
      const searched = intakeList.filter(
        (intake) =>
          intake.intake_id.toString().includes(query) ||
          intake.docket_name.toLowerCase().includes(query) ||
          intake.vintage.toString().includes(query) ||
          intake.grower.toLowerCase().includes(query) ||
          intake.varietal.toLowerCase().includes(query) ||
          intake.vineyard.toLowerCase().includes(query) ||
          intake.block.toLowerCase().includes(query) ||
          intake.row.toLowerCase().includes(query)
      );
      setSearchedIntakeCards(searched);
    }
  };

  useEffect(() => {
    searchIntakeCards(intakeSearchQuery);
  }, [intakeSearchQuery, intakeList]);

  // Sorting
  const [docketSortOrder, setDocketSortOrder] = useState("asc");
  const [docketSortKey, setDocketSortKey] = useState("docket_name");

  const [intakeSortOrder, setIntakeSortOrder] = useState("asc");
  const [intakeSortKey, setIntakeSortKey] = useState("intake_id");

  // Dockets Sorting Logic
  const sortedDockets = [...searchedDocketCards].sort((a, b) => {
    const valueA = a[docketSortKey];
    const valueB = b[docketSortKey];

    if (valueA < valueB) {
      return docketSortOrder === "asc" ? -1 : 1;
    } else if (valueA > valueB) {
      return docketSortOrder === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  });

  // Intakes Sorting Logic
  const sortedIntakes = [...searchedIntakeCards].sort((a, b) => {
    const valueA = a[intakeSortKey];
    const valueB = b[intakeSortKey];

    if (valueA < valueB) {
      return intakeSortOrder === "asc" ? -1 : 1;
    } else if (valueA > valueB) {
      return intakeSortOrder === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  });

  // Submit Validation for Docket
  const handleSubmitDocketValidation = () => {
    const formFields = { ...docketData };
    const formErrors = {};
    let formIsValid = true;

    const requiredFormField = [
      "vintage",
      "grower",
      "varietal",
      "vineyard",
      "block",
      "row",
    ];

    requiredFormField.forEach((field) => {
      if (!formFields[field]) {
        formIsValid = false;
        formErrors[field] = "required field";
      }
    });

    setFormErrors(formErrors);

    return formIsValid;
  };

  // Submit Validation for Intake
const handleSubmitIntakeValidation = () => {
  const formFields = { ...intakeData };
  const formErrors = {};
  let formIsValid = true;

  const requiredFormField = [
    "bins",
    "total_weight",
    "tare_weight"
  ];

  if (!selectedDocket) {
    formIsValid = false;
    formErrors["docket_name"] = "required field";
  }

  requiredFormField.forEach((field) => {
    if (!formFields[field]) {
      formIsValid = false;
      console.log("field", field)
      formErrors[field] = "required field";
    }
  });

  setFormErrors(formErrors);

  return formIsValid;
};

  return (
    <main className="main">
      <h1 className="main__title">add new docket</h1>

      <form onSubmit={handleSubmitDocket} className="main__form1">
      <div className="main__box1">
          <label htmlFor="vintage">
            <p className="main__label">vintage year</p>
          </label>
          <select
            className={`main__dropdown ${formErrors.vintage ? 'invalid' : ''}`}
            id="vintage"
            name="vintage"
            value={docketData.vintage}
            onChange={handleInputChangeDocket}
          >
            <option value="" disabled />
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
          {formErrors.vintage && <span className="invalid__text">{formErrors.vintage}</span>}
        </div>

        <div className="main__box2">
          <label htmlFor="grower">
            <p className="main__label">grower</p>
          </label>
          <select
            className={`main__dropdown ${formErrors.grower ? 'invalid' : ''}`}
            id="grower"
            name="grower"
            value={docketData.grower}
            onChange={handleInputChangeDocket}
          >
            <option value="" disabled />
            <option value="Blue Grouse">Blue Grouse</option>
            <option value="Unsworth">Unsworth</option>
            <option value="Sonoma Mill">Sonoma Mill</option>
          </select>
          {formErrors.grower && <span className="invalid__text">{formErrors.grower}</span>}
        </div>

        <div className="main__box3">
          <label htmlFor="varietal">
            <p className="main__label">varietal</p>
          </label>
          <select
            className={`main__dropdown ${formErrors.varietal ? 'invalid' : ''}`}
            id="varietal"
            name="varietal"
            value={docketData.varietal}
            onChange={handleInputChangeDocket}
          >
            <option value="" disabled />
            <option value="Chardonnay">Chardonnay</option>
            <option value="Pinot Noir">Pinot Noir</option>
            <option value="Furmint">Furmint</option>
          </select>
          {formErrors.varietal && <span className="invalid__text">{formErrors.varietal}</span>}
        </div>

        <div className="main__box4">
          <label htmlFor="vineyard">
            <p className="main__label">vineyard</p>
          </label>
          <select
            className={`main__dropdown ${formErrors.vineyard ? 'invalid' : ''}`}
            id="vineyard"
            name="vineyard"
            value={docketData.vineyard}
            onChange={handleInputChangeDocket}
          >
            <option value="" disabled />
            <option value="Imhof">Imhof</option>
            <option value="Carlos">Carlos</option>
            <option value="Syracuse">Syracuse</option>
          </select>
          {formErrors.vineyard && <span className="invalid__text">{formErrors.vineyard}</span>}

        </div>

        <div className="main__box5">
          <label htmlFor="block">
            <p className="main__label">block</p>
          </label>
          <select
            className={`main__dropdown ${formErrors.block ? 'invalid' : ''}`}
            id="block"
            name="block"
            value={docketData.block}
            onChange={handleInputChangeDocket}
          >
            <option value="" disabled />
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          {formErrors.block && <span className="invalid__text">{formErrors.block}</span>}
        </div>

        <div className="main__box6">
          <label htmlFor="row">
            <p className="main__label">row</p>
          </label>
          <select
            className={`main__dropdown ${formErrors.row ? 'invalid' : ''}`}
            id="row"
            name="row"
            value={docketData.row}
            onChange={handleInputChangeDocket}
          >
            <option value="" disabled />
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          {formErrors.row && <span className="invalid__text">{formErrors.row}</span>}
        </div>

        <button className="main__button1" type="submit">
          add docket
        </button>
      </form>

      <h1 className="main__title">add new intake</h1>

      <form
        className="main__form2 main__form2__row3"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="main__box8 box-margin">
          <label htmlFor="intake_date">
            <p className="main__label">date</p>
          </label>
          <DatePicker
            selected={intakeDate}
            onChange={handleDateChange}
            dateFormat="yyyy | MM | dd"
            className="main__dropdown--date"
            id="intake_date"
          />
        </div>

        <div className="main__box7">
          <label htmlFor="sort_dockets" />
          <select
            className="main__dropdown--sort"
            id="sort_dockets"
            name="sort_dockets"
            value={docketSortKey}
            onChange={(e) => {
              setDocketSortKey(e.target.value);
              setDocketSortOrder("asc"); // Reset order when changing the key
            }}
          >
            <option value="" disabled>
              Sort by
            </option>
            <option value="docket_name">docket</option>
            <option value="vintage">vintage</option>
            <option value="grower">grower</option>
            <option value="varietal">varietal</option>
            <option value="vineyard">vineyard</option>
            <option value="block">block</option>
            <option value="row">row</option>
          </select>
        </div>

        <div className="main__box7a">
          <label htmlFor="search_dockets" />
          <input
            className="main__dropdown--search"
            id="search_dockets"
            name="search_dockets"
            placeholder="search"
            value={docketSearchQuery}
            onChange={handleDocketSearchChange}
          />
        </div>

        <section className="main__dockets">
          {(sortedDockets.length > 0 ? sortedDockets : searchedDocketCards).map(
            (docket) => {
              if (
                !intakeList.find((el) => el.docket_name === docket.docket_name)
              ) {
                return (
                  <DocketCard
                    key={docket.docket_id}
                    docket={docket}
                    selectedDocket={selectedDocket}
                    onClick={() =>
                      handleSelectedDocketChange(docket.docket_name)
                    }
                  />
                );
              }
            }
          )}
          {formErrors.docket_name && <span className="invalid__text--docket">{formErrors.docket_name}</span>}
        </section>

        <div className="main__box9 box-margin">
          <label htmlFor="bins">
            <p className="main__label">bins</p>
          </label>
          <input
            className={`main__dropdown--text ${formErrors.bins ? 'invalid' : ''}`}
            id="bins"
            name="bins"
            value={intakeData.bins}
            onChange={handleInputChangeIntake}
          />
          {formErrors.bins && <span className="invalid__text">{formErrors.bins}</span>}
        </div>

        <div className="main__box10 box-margin">
          <label htmlFor="total_weight">
            <p className="main__label">total weight</p>
          </label>
          <input
            className={`main__dropdown--text ${formErrors.total_weight ? 'invalid' : ''}`}
            id="total_weight"
            name="total_weight"
            value={intakeData.total_weight}
            onChange={handleInputChangeIntakeWeight}
          />
          {formErrors.total_weight && <span className="invalid__text">{formErrors.total_weight}</span>}
        </div>

        <div className="main__box11 box-margin">
          <label htmlFor="tare_weight">
            <p className="main__label">tare weight</p>
          </label>
          <input
            className={`main__dropdown--text ${formErrors.tare_weight ? 'invalid' : ''}`}
            id="tare_weight"
            name="tare_weight"
            value={intakeData.tare_weight}
            onChange={handleInputChangeIntakeWeight}
          />
          {formErrors.tare_weight && <span className="invalid__text">{formErrors.tare_weight}</span>}
        </div>

        <button
          className="main__button2"
          type="submit"
          onClick={handleSubmitIntake}
        >
          add intake
        </button>
      </form>

      <h1 className="main__title">fruit intake report</h1>

      <section className="main__section">
        <div className="main__box13">
          <label htmlFor="date_range">
            <p className="main__label">date range</p>
          </label>
          <DatePicker
            id="date_range"
            selected={startDate}
            onChange={onDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            dateFormat="yyyy | MM | dd"
            className="main__dropdown--date range"
          />
        </div>

        <div className="main__box14">
          <label htmlFor="sort_intake" />
          <select
            className="main__dropdown--sort"
            id="sort_intake"
            name="sort_intake"
            value={intakeSortKey}
            onChange={(e) => {
              setIntakeSortKey(e.target.value);
              setIntakeSortOrder("asc"); // Reset order when changing the key
            }}
          >
            <option value="" disabled>
              Sort by
            </option>
            <option value="intake_id">intake</option>
            <option value="docket_name">docket</option>
            <option value="vintage">vintage</option>
            <option value="grower">grower</option>
            <option value="varietal">varietal</option>
            <option value="vineyard">vineyard</option>
            <option value="block">block</option>
            <option value="row">row</option>
            <option value="bins">bins</option>
            <option value="total_weight">total weight</option>
            <option value="tare_weight">tare weight</option>
            <option value="fruit_weight">fruit weight</option>
            <option value="predicted_volume">predicted volume</option>
          </select>
        </div>

        <div className="main__box15">
          <label htmlFor="search_intake" />
          <input
            className="main__dropdown--search"
            id="search_intake"
            name="search_intake"
            placeholder="search"
            value={intakeSearchQuery}
            onChange={handleIntakeSearchChange}
          />
        </div>

        <section className="main__intakes">
          {(sortedIntakes.length > 0 ? sortedIntakes : searchedIntakeCards)
            .filter((intake) => {
              if (!endDate) return true;
              const intakeDate = new Date(intake.intake_date);
              return intakeDate >= startDate && intakeDate <= endDate;
            })
            .map((intake) => {
              return (
                <IntakeCard
                  key={intake.intake_id}
                  intake={intake}
                  fetchIntakeList={fetchIntakeList}
                  fetchDocketList={fetchDocketList}
                  docketList={docketList}
                />
              );
            })}
        </section>

        <button
          className="main__button3"
          onClick={() => exportToCSV(intakeList)}
        >
          download report
        </button>
      </section>
    </main>
  );
}

export default FruitIntakePage;
