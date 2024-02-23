import './IntakeCard.scss';

import editIcon from '../../assets/icons/editIcon.svg'
import deleteIcon from '../../assets/icons/deleteIcon.svg'

import formatDate from '../../utils/formatDate';

function IntakeCard({intake}) {
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
          <img className='intake_icon' src={deleteIcon} alt='Delete Icon'/>
        </section>

      </section>
    );
  };
  
  export default IntakeCard;