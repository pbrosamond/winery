import "./CrushOrderPage.scss";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import IntakeCard from "../../components/IntakeCard/IntakeCard";

function CrushOrderPage() {
  const [intakeDate, setIntakeDate] = useState(new Date());

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

  // Intakes Sorting Logic

  const [intakeSortOrder, setIntakeSortOrder] = useState("asc");
  const [intakeSortKey, setIntakeSortKey] = useState("intake_id");

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

  return (
    <main className="main">
      <h1 className="main__title">add new crush</h1>

      <form className="main__form1">
        <div className="main__box1">
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
                  // fetchDocketList={fetchDocketList}
                  // docketList={docketList}
                />
              );
            })}
        </section>

        <section className="main__dockets">
        <div className="main__box3">
          <label htmlFor="intake">
            <p className="main__label">intake 1</p>
          </label>
          <select
            className="main__dropdown"
            id="intake"
            name="intake"
          >
            <option value="" disabled />
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        </section>

        <button className="main__button1">+ vessels</button>

        <button className="main__button2" type="submit">
          add crush
        </button>
      </form>
    </main>
  );
}

export default CrushOrderPage;
