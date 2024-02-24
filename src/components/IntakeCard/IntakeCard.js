import "./IntakeCard.scss";

import editIcon from "../../assets/icons/editIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";

import formatDate from "../../utils/formatDate";
import React, { useState } from "react";
import axios from "axios";

function IntakeCard({ intake, fetchIntakeList, fetchDocketList }) {
  const [showIntakeDeleteConfirmation, setShowIntakeDeleteConfirmation] =
    useState(false);
  const [showDocketDeleteConfirmation, setShowDocketDeleteConfirmation] =
    useState(false);

  const handleDeleteClick = () => {
    setShowIntakeDeleteConfirmation(true);
    setShowDocketDeleteConfirmation(false);
  };

  const handleIntakeDeleteConfirmation = async (deleted) => {
    if (deleted) {
      try {
        // Make delete API call for intake
        await axios.delete(
          `http://localhost:8080/api/intakes/${intake.intake_id}`
        );
        setShowIntakeDeleteConfirmation(false);
        setShowDocketDeleteConfirmation(true);
      } catch (error) {
        console.error("Error deleting intake:", error);
      }
    } else {
      // Close both delete confirmation pop-ups
      setShowIntakeDeleteConfirmation(false);
    }
  };

  const handleDocketDeleteConfirmation = async (deleted) => {
    if (deleted) {
      try {
        // Make delete API call for docket
        await axios.delete(
          `http://localhost:8080/api/dockets/${intake.docket_id}`
        );
        setShowDocketDeleteConfirmation(false);
        fetchDocketList();
      } catch (error) {
        console.error("Error deleting docket:", error);
      }
    } else {
      // Close both delete confirmation pop-ups
      setShowDocketDeleteConfirmation(false);   
    }
    fetchIntakeList();
  };

  return (
    <section className="intake__subcontainer">
      <div className="intake__intake--border">
        <h2 className="intake__text">intake {intake.intake_id}</h2>
        <h2 className="intake__text">{formatDate(intake.intake_date)}</h2>
      </div>

      <section className="intake__info">
        <div className="intake__intake">
          <p className="intake__details">docket</p>
          <p className="intake__details--right">{intake.docket_name}</p>
        </div>

        <div className="intake__intake">
          <p className="intake__details">bins</p>
          <p className="intake__details--right">{intake.bins}</p>
        </div>

        <div className="intake__intake">
          <p className="intake__details">total weight</p>
          <p className="intake__details--right">{intake.total_weight} kg</p>
        </div>

        <div className="intake__intake">
          <p className="intake__details">tare weight</p>
          <p className="intake__details--right">{intake.tare_weight} kg</p>
        </div>

        <div className="intake__intake">
          <p className="intake__details">fruit weight</p>
          <p className="intake__details--right">{intake.fruit_weight} kg</p>
        </div>

        <div className="intake__intake">
          <p className="intake__details">predicted volume</p>
          <p className="intake__details--right">{intake.predicted_volume} L</p>
        </div>
      </section>

      <section className="intake__icons">
        <img className="intake_icon" src={editIcon} alt="Edit Icon" />
        <img
          className="intake_icon"
          src={deleteIcon}
          alt="Delete Icon"
          onClick={handleDeleteClick}
        />
      </section>

      {showIntakeDeleteConfirmation && <div className="intake__overlay" />}

      {showIntakeDeleteConfirmation && (
        <div className="intake__delete">
          <p className="intake__delete--text">
            do you want to delete intake {intake.intake_id}?
          </p>
          <div className="intake__buttons">
            <button
              className="intake__button--delete"
              onClick={() => handleIntakeDeleteConfirmation(true)}
            >
              delete
            </button>
            <button
              className="intake__button--cancel"
              onClick={() => handleIntakeDeleteConfirmation(false)}
            >
              cancel
            </button>
          </div>
        </div>
      )}

      {showDocketDeleteConfirmation && (
        <div className="intake__delete">
          <p className="intake__delete--text">
            do you want to delete the corresponding docket {intake.docket_name}?
          </p>
          <div className="intake__buttons">
            <button
              className="intake__button--delete"
              onClick={() => handleDocketDeleteConfirmation(true)}
            >
              delete
            </button>
            <button
              className="intake__button--cancel"
              onClick={() => handleDocketDeleteConfirmation(false)}
            >
              keep docket
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default IntakeCard;
