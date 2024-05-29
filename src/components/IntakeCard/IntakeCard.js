import "./IntakeCard.scss";

import editIcon from "../../assets/icons/editIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import saveIcon from "../../assets/icons/saveIcon.svg";
import cancelIcon from "../../assets/icons/cancelIcon.svg";

import formatDate from "../../utils/formatDate";
import React, { useState } from "react";
import axios from "axios";

function IntakeCard({ intake, fetchIntakeList, fetchDocketList, docketList }) {
  const [showIntakeDeleteConfirmation, setShowIntakeDeleteConfirmation] =
    useState(false);
  const [showDocketDeleteConfirmation, setShowDocketDeleteConfirmation] =
    useState(false);

  const handleDeleteClick = () => {
    setShowIntakeDeleteConfirmation(true);
    setShowDocketDeleteConfirmation(false);
  };

  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({});
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
    setEditedValues({
      docket_name: intake.docket_name,
      bins: intake.bins,
      total_weight: intake.total_weight,
      tare_weight: intake.tare_weight,
    });
  };

  const handleSaveClick = () => {
    setShowSaveConfirmation(true);
  };

  const handleChange = (field, value) => {
    setEditedValues({ ...editedValues, [field]: value });
  };

  const handleSaveConfirmation = async (confirmed) => {
    if (confirmed) {
      // Save changes logic
      const updatedValues = {
        ...editedValues,
        fruit_weight: editedValues.total_weight - editedValues.tare_weight,
        predicted_volume:
          (editedValues.total_weight - editedValues.tare_weight) * 0.75,
      };
  
      delete updatedValues.docket_name;

      try {
        await axios.patch(
          `http://localhost:8080/api/intakes/${intake.intake_id}`,
          updatedValues
        );
        setEditMode(false);
        setShowSaveConfirmation(false);
        fetchIntakeList();
      } catch (error) {
        console.error("Error updating intake:", error);
      }
    } else {
      // Cancel changes
      setEditMode(false);
      setEditedValues({}); // Reset edited values
      setShowSaveConfirmation(false);
    }
  };
  
  const handleCancelClick = () => {
    setEditMode(false);
    setEditedValues({}); // Reset edited values
    setShowSaveConfirmation(false);
    // Optionally reset other values or perform additional actions
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
          {editMode ? (
            <select
            className="intake__edit"
            onChange={(e) =>
              setEditedValues({
                ...editedValues,
                docket_id: e.target.value,
              })
            }
          >
            {docketList
              .sort((a, b) => a.vintage - b.vintage) // Sort docketList by vintage year
              .map((docket) => (
                <option key={docket.docket_id} value={docket.docket_id}>
                  {docket.docket_name}
                </option>
              ))}
            </select>
          ) : (
            <p className="intake__details--right">{intake.docket_name}</p>
          )}
        </div>

        <div className="intake__intake">
          <p className="intake__details">bins</p>
          {editMode ? (
            <input
              className="intake__edit"
              type="text"
              value={editedValues.bins}
              onChange={(e) => handleChange("bins", e.target.value)}
              placeholder={intake.bins}
            />
          ) : (
            <p className="intake__details--right">{intake.bins}</p>
          )}
        </div>

        <div className="intake__intake">
          <p className="intake__details">total weight</p>
          {editMode ? (
            <input
              className="intake__edit"
              type="text"
              value={editedValues.total_weight}
              onChange={(e) => handleChange("total_weight", e.target.value)}
              placeholder={intake.total_weight}
            />
          ) : (
            <p className="intake__details--right">{intake.total_weight} kg</p>
          )}
        </div>

        <div className="intake__intake">
          <p className="intake__details">tare weight</p>
          {editMode ? (
            <input
              className="intake__edit"
              type="text"
              value={editedValues.tare_weight}
              onChange={(e) => handleChange("tare_weight", e.target.value)}
              placeholder={intake.tare_weight}
            />
          ) : (
            <p className="intake__details--right">{intake.tare_weight} kg</p>
          )}
        </div>

        <div className="intake__intake">
          <p className="intake__details">fruit weight</p>
          {editMode ? (
            <input
              className="intake__calculated"
              type="text"
              value={editedValues.fruit_weight}
              onChange={(e) =>
                setEditedValues({
                  ...editedValues,
                })
              }
            />
          ) : (
            <p className="intake__details--right">{intake.fruit_weight} kg</p>
          )}
        </div>

        <div className="intake__intake">
          <p className="intake__details">predicted volume</p>
          {editMode ? (
            <input
              className="intake__calculated"
              type="text"
              value={editedValues.predicted_volume}
              onChange={(e) =>
                setEditedValues({
                  ...editedValues,
                })
              }
            />
          ) : (
            <p className="intake__details--right">
              {intake.predicted_volume} L
            </p>
          )}
        </div>
      </section>

      <section className="intake__icons">
      {editMode ? (
          <>
            <img
              className="intake__icon"
              src={saveIcon}
              alt="Save Icon"
              onClick={handleSaveClick}
            />
            <img
              className="intake__icon--cancel"
              src={cancelIcon}
              alt="Cancel Icon"
              onClick={handleCancelClick}
            />
          </>
        ) : (
          <>
            <img
              className="intake__icon"
              src={editIcon}
              alt="Edit Icon"
              onClick={handleEditClick}
            />
            <img
              className="intake__icon--delete"
              src={deleteIcon}
              alt="Delete Icon"
              onClick={handleDeleteClick}
            />
          </>
        )}
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

      {showDocketDeleteConfirmation && <div className="intake__overlay" />}

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

      {showSaveConfirmation && <div className="intake__overlay" />}

      {showSaveConfirmation && (
        <div className="intake__delete">
          <p className="intake__delete--text">
            Would you like to save your changes for intake {intake.intake_id}?
          </p>
          <div className="intake__buttons">
            <button
              className="intake__button--save"
              onClick={() => handleSaveConfirmation(true)}
            >
              save
            </button>
            <button
              className="intake__button--cancel"
              onClick={() => handleSaveConfirmation(false)}
            >
              cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default IntakeCard;
