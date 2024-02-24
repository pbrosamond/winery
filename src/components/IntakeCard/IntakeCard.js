import './IntakeCard.scss';

import editIcon from '../../assets/icons/editIcon.svg'
import deleteIcon from '../../assets/icons/deleteIcon.svg'

import formatDate from '../../utils/formatDate';
import React, { useState, useEffect } from "react";

function IntakeCard({intake}) {

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = (confirmed) => {
    if (confirmed) {
      // Perform delete action here, e.g., call a delete API or update state
      console.log(`Intake ID ${intake.intake_id} will be deleted.`);
    }

    // Close the delete confirmation pop-up
    setShowDeleteConfirmation(false);
  };


    return (
        <section className='intake__subcontainer'>
        <div className='intake__intake--border'>
          <h2 className='intake__text'>intake {intake.intake_id}</h2>
          <h2 className='intake__text'>{formatDate(intake.intake_date)}</h2>
        </div>

        <section className='intake__info'>
          <div className='intake__intake'>
            <p className='intake__details'>docket</p>
            <p className='intake__details--right'>{intake.docket_name}</p>
          </div>

          <div className='intake__intake'>
            <p className='intake__details'>bins</p>
            <p className='intake__details--right'>{intake.bins}</p>
          </div>

          <div className='intake__intake'>
            <p className='intake__details'>total weight</p>
            <p className='intake__details--right'>{intake.total_weight} kg</p>
          </div>

          <div className='intake__intake'>
            <p className='intake__details'>tare weight</p>
            <p className='intake__details--right'>{intake.tare_weight} kg</p>
          </div>

          <div className='intake__intake'>
            <p className='intake__details'>fruit weight</p>
            <p className='intake__details--right'>{intake.fruit_weight} kg</p>
          </div>

          <div className='intake__intake'>
            <p className='intake__details'>predicted volume</p>
            <p className='intake__details--right'>{intake.predicted_volume} L</p>
          </div>
        </section>

        <section className='intake__icons'>
          <img className='intake_icon' src={editIcon} alt='Edit Icon'/>
          <img className='intake_icon' src={deleteIcon} alt='Delete Icon' onClick={handleDeleteClick}/>
        </section>

        {showDeleteConfirmation && <div className='intake__overlay' />}

        {showDeleteConfirmation && (
        <div className='intake__delete'>
          <p className='intake__delete--text'>are you sure you want to delete intake {intake.intake_id}?</p>
          <div className='intake__buttons'>
            <button className="intake__button--delete" onClick={() => handleDeleteConfirmation(true)}>delete</button>
            <button className="intake__button--cancel" onClick={() => handleDeleteConfirmation(false)}>cancel</button>
          </div>
        </div>
      )}

      </section>
    );
  };
  
  export default IntakeCard;