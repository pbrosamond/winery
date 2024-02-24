import DocketCard from "../../components/DocketCard/DocketCard";
import IntakeCard from "../../components/IntakeCard/IntakeCard";
import exportToCSV from "../../utils/exportToCSV";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./FruitIntakePage.scss";

import React, { useState, useEffect } from "react";
import axios from "axios";

// const { REACT_APP_API_BASE_PATH } = process.env;

function FruitIntakePage() {
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

  const initialDocketData = {
    vintage: "",
    grower: "",
    varietal: "",
    vineyard: "",
    block: "",
    row: "",
  };

  const [docketData, setDocketData] = useState(initialDocketData);
  const [docketList, setDocketList] = useState([]);
  const [intakeDate, setIntakeDate] = useState(new Date());
  const [selectedDocket, setSelectedDocket] = useState("");

  const handleSelectedDocketChange = (docket_name) => {
    setSelectedDocket(docket_name);
  }

  const handleInputChangeDocket = (e) => {
    const { name, value } = e.target;
    setDocketData({ ...docketData, [name]: value });
  };

  const handleSubmitDocket = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/dockets",
        docketData
      );
      setDocketData(initialDocketData);
      fetchDocketList();
      // Handle successful response
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };

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

  const initialIntakeData = {
    docket_name: "",
    intake_date: "",
    bins: "",
    total_weight: "",
    tare_weight: "",
    block: "",
    row: "",
  };

  const [intakeData, setIntakeData] = useState(initialIntakeData);
  const [intakeList, setIntakeList] = useState([]);

  const handleInputChangeIntake = (e) => {
    const { name, value } = e.target;
    setIntakeData({ ...intakeData, [name]: value });
  };

  const handleSubmitIntake = async (e) => {
    e.preventDefault();

    const docketData = docketList.find((el) => el.docket_name === selectedDocket)
    
    const newIntakeData = Object.assign({}, intakeData, docketData);
    newIntakeData.intake_date = new Date(intakeDate).toISOString().slice(0, 10);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/intakes",
        newIntakeData
      );
      setSelectedDocket("");
      setIntakeData(initialIntakeData);
      fetchIntakeList();
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };

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

  // Search Bar Dockets

  const [docketSearchQuery, setDocketSearchQuery] = useState("");
  const [searchedDocketCards, setSearchedDocketCards] = useState(docketList);

  const [intakeSearchQuery, setIntakeSearchQuery] = useState("");
  const [searchedIntakeCards, setSearchedIntakeCards] = useState(intakeList);

// Function to handle search input change
const handleDocketSearchChange = (event) => {
  const query = event.target.value;
  setDocketSearchQuery(query);
  // Call a function to filter docket cards based on the search query
  searchDocketCards(query);
};

const searchDocketCards = (query) => {
  // If the search query is empty, show all dockets
  if (query.trim() === '') {
    setSearchedDocketCards(docketList);
  } else {
    // Otherwise, filter based on the search query
    const searched = docketList.filter((docket) =>
      docket.docket_name.includes(query) ||
      docket.vintage.toString().includes(query) ||
      docket.grower.includes(query) ||
      docket.varietal.includes(query) ||
      docket.vineyard.includes(query) ||
      docket.block.includes(query) ||
      docket.row.includes(query)
    );
    setSearchedDocketCards(searched);
  }
};

useEffect(() => {
  searchDocketCards(docketSearchQuery);
}, [docketSearchQuery, docketList]);

// Search Bar Intakes

// Function to handle search input change
const handleIntakeSearchChange = (event) => {
const query = event.target.value;
  setIntakeSearchQuery(query);
// Call a function to filter docket cards based on the search query
searchIntakeCards(query);
};

const searchIntakeCards = (query) => {
// If the search query is empty, show all intakes
if (query.trim() === '') {
  setSearchedIntakeCards(intakeList);
} else {
  // Otherwise, filter based on the search query
  const searched = intakeList.filter((intake) =>
    intake.intake_id.toString().includes(query) ||
    intake.docket_name.includes(query) ||
    intake.vintage.toString().includes(query) ||
    intake.grower.includes(query) ||
    intake.varietal.includes(query) ||
    intake.vineyard.includes(query) ||
    intake.block.includes(query) ||
    intake.row.includes(query)
  );
  setSearchedIntakeCards(searched);
}
};

useEffect(() => {
  searchIntakeCards(intakeSearchQuery);
}, [intakeSearchQuery, intakeList]);

  return (
    <main className="main">
      <h1 className="main__title">add new docket</h1>

      <form onSubmit={handleSubmitDocket} className="main__form1">
        <div className="main__box1">
          <label htmlFor="vintage">
            <p className="main__label">vintage year</p>
          </label>
          <select
            className="main__dropdown"
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
        </div>

        <div className="main__box2">
          <label htmlFor="grower">
            <p className="main__label">grower</p>
          </label>
          <select
            className="main__dropdown"
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
        </div>

        <div className="main__box3">
          <label htmlFor="varietal">
            <p className="main__label">varietal</p>
          </label>
          <select
            className="main__dropdown"
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
        </div>

        <div className="main__box4">
          <label htmlFor="vineyard">
            <p className="main__label">vineyard</p>
          </label>
          <select
            className="main__dropdown"
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
        </div>

        <div className="main__box5">
          <label htmlFor="block">
            <p className="main__label">block</p>
          </label>
          <select
            className="main__dropdown"
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
        </div>

        <div className="main__box6">
          <label htmlFor="row">
            <p className="main__label">row</p>
          </label>
          <select
            className="main__dropdown"
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
          />
        </div>

        <div className="main__box7">
          <label htmlFor="filter_dockets" />
          <select
            className="main__dropdown--filter"
            id="filter_dockets"
            name="filter_dockets"
          >
            <option value="" disabled>
              filter
            </option>
            <option value="all">All</option>
            <option value="item1">Item 1</option>
            <option value="item2">Item 2</option>
            <option value="item3">Item 3</option>
            <option value="item4">Item 4</option>
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
          {searchedDocketCards.map((docket) => {
            if (!intakeList.find(el => el.docket_name === docket.docket_name)) {
            return (
              <DocketCard
                key={docket.docket_id}
                docket={docket}
                selectedDocket={selectedDocket}
                onClick={() => handleSelectedDocketChange(docket.docket_name)}
              />
            );}
          })}
        </section>

        <div className="main__box9 box-margin">
          <label htmlFor="bins">
            <p className="main__label">bins</p>
          </label>
          <input
            className="main__dropdown--text"
            id="bins"
            name="bins"
            value={intakeData.bins}
            onChange={handleInputChangeIntake}
          />
        </div>

        <div className="main__box10 box-margin">
          <label htmlFor="total_weight">
            <p className="main__label">total weight</p>
          </label>
          <input
            className="main__dropdown--text"
            id="total_weight"
            name="total_weight"
            value={intakeData.total_weight}
            onChange={handleInputChangeIntake}
          />
        </div>

        <div className="main__box11 box-margin">
          <label htmlFor="tare_weight">
            <p className="main__label">tare weight</p>
          </label>
          <input
            className="main__dropdown--text"
            id="tare_weight"
            name="tare_weight"
            value={intakeData.tare_weight}
            onChange={handleInputChangeIntake}
          />
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
          <label htmlFor="filter_intake" />
          <select
            className="main__dropdown--filter"
            id="filter_intake"
            name="filter_intake"
          >
            <option value="" disabled>
              filter
            </option>
            <option value="all">All</option>
            <option value="item1">Item 1</option>
            <option value="item2">Item 2</option>
            <option value="item3">Item 3</option>
            <option value="item4">Item 4</option>
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
          {searchedIntakeCards
            .filter((intake) => {
              if (!endDate) return true;
              const intakeDate = new Date(intake.intake_date);
              return intakeDate >= startDate && intakeDate <= endDate;
            })
            .map((intake) => {
              return <IntakeCard key={intake.intake_id} intake={intake} />;
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
