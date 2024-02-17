import './IntakeCard.scss';

import editIcon from '../../assets/icons/editIcon.svg'
import deleteIcon from '../../assets/icons/deleteIcon.svg'

function IntakeCard() {
    return (
        <section className='intake__subcontainer'>
        <div className='intake__intake--border'>
          <h2 className='intake__text'>intake 1</h2>
          <h2 className='intake__text'>date</h2>
        </div>

        <section className='intake__info'>
          <div className='intake__intake'>
            <p className='intake__details'>docket</p>
            <p className='intake__details--right'>id</p>
          </div>

          <div className='intake__intake'>
            <p className='intake__details'>bins</p>
            <p className='intake__details--right'>id</p>
          </div>

          <div className='intake__intake'>
            <p className='intake__details'>total weight</p>
            <p className='intake__details--right'>id</p>
          </div>

          <div className='intake__intake'>
            <p className='intake__details'>tare weight</p>
            <p className='intake__details--right'>id</p>
          </div>

          <div className='intake__intake'>
            <p className='intake__details'>fruit weight</p>
            <p className='intake__details--right'>id</p>
          </div>

          <div className='intake__intake'>
            <p className='intake__details'>predicted volume</p>
            <p className='intake__details--right'>id</p>
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