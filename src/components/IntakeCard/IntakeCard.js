import './IntakeCard.scss';

import editIcon from '../../assets/icons/editIcon.svg'
import deleteIcon from '../../assets/icons/deleteIcon.svg'

function IntakeCard() {
    return (
        <section className='main__subcontainer'>
        <div className='main__intake--border'>
          <h2 className='main__text'>intake 1</h2>
          <h2 className='main__text'>date</h2>
        </div>

        <section className='main__info'>
          <div className='main__intake'>
            <p className='main__details'>docket</p>
            <p className='main__details--right'>id</p>
          </div>

          <div className='main__intake'>
            <p className='main__details'>docket</p>
            <p className='main__details--right'>id</p>
          </div>

          <div className='main__intake'>
            <p className='main__details'>docket</p>
            <p className='main__details--right'>id</p>
          </div>

          <div className='main__intake'>
            <p className='main__details'>docket</p>
            <p className='main__details--right'>id</p>
          </div>

          <div className='main__intake'>
            <p className='main__details'>docket</p>
            <p className='main__details--right'>id</p>
          </div>

          <div className='main__intake'>
            <p className='main__details'>docket</p>
            <p className='main__details--right'>id</p>
          </div>
        </section>

        <section className='main__icons'>
          <img className='main_icon' src={editIcon} alt='Edit Icon'/>
          <img className='main_icon' src={deleteIcon} alt='Delete Icon'/>
        </section>

      </section>
    );
  };
  
  export default IntakeCard;