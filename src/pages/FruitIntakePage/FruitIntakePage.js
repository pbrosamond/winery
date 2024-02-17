import DocketCard from '../../components/DocketCard/DocketCard';
import IntakeCard from '../../components/IntakeCard/IntakeCard';
import './FruitIntakePage.scss';

const { REACT_APP_API_BASE_PATH } = process.env;

function FruitIntakePage() {
  return (
    <main className='main'>
      <h1 className='main__title'>add new docket</h1>

      <form className='main__form1'>
        <div className='main__box1'>
          <label htmlFor="dropdownField">
            <p className='main__label'>vintage year</p>
          </label>
          <select className='main__dropdown' id="dropdownField" name="dropdownField">
            <option value="" disabled selected />
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <div className='main__box2'>
          <label htmlFor="dropdownField">
            <p className='main__label'>grower</p>
          </label>
          <select className='main__dropdown' id="dropdownField" name="dropdownField">
            <option value="" disabled selected />
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <div className='main__box3'>
          <label htmlFor="dropdownField">
            <p className='main__label'>varietal</p>
          </label>
          <select className='main__dropdown' id="dropdownField" name="dropdownField">
            <option value="" disabled selected />
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <div className='main__box4'>
          <label htmlFor="dropdownField">
            <p className='main__label'>vineyard</p>
          </label>
          <select className='main__dropdown' id="dropdownField" name="dropdownField">
            <option value="" disabled selected />
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <div className='main__box5'>
          <label htmlFor="dropdownField">
            <p className='main__label'>block</p>
          </label>
          <select className='main__dropdown' id="dropdownField" name="dropdownField">
            <option value="" disabled selected />
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <div className='main__box6'>
          <label htmlFor="dropdownField">
            <p className='main__label'>row</p>
          </label>
          <select className='main__dropdown' id="dropdownField" name="dropdownField">
            <option value="" disabled selected />
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <button className='main__button1'>+ add docket</button>

      </form>

      <h1 className='main__title'>add new intake</h1>

      <form className='main__form2 main__form2__row3'>
        <div className='main__box7'>
          <label htmlFor="filterDropdownField" />
          <select className='main__dropdown--filter' id="filterDropdownField" name="filterDropdownField">
            <option value="" disabled selected>filter</option>
            <option value="all">All</option>
            <option value="item1">Item 1</option>
            <option value="item2">Item 2</option>
            <option value="item3">Item 3</option>
            <option value="item4">Item 4</option>
          </select>
        </div>

        <div className='main__box7a'>
          <label htmlFor="filterDropdownField" />
          <input className='main__dropdown--search' id="filterDropdownField" name="filterDropdownField" placeholder='search' />
        </div>

        <section className='main__dockets'>
          <DocketCard />
        </section>

        <div className='main__box8 box-margin'>
          <label htmlFor="dropdownField">
            <p className='main__label'>date</p>
          </label>
          <select className='main__dropdown--date' id="dropdownField" name="dropdownField">
            <option value="today's date" disabled selected>01 | 03 | 2024</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <div className='main__box9 box-margin'>
          <label htmlFor="dropdownField">
            <p className='main__label'>bins</p>
          </label>
          <select className='main__dropdown' id="dropdownField" name="dropdownField">
            <option value="" disabled selected />
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <div className='main__box10 box-margin'>
          <label htmlFor="dropdownField">
            <p className='main__label'>total weight</p>
          </label>
          <select className='main__dropdown' id="dropdownField" name="dropdownField">
            <option value="" disabled selected />
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <div className='main__box11 box-margin'>
          <label htmlFor="dropdownField">
            <p className='main__label'>tare weight</p>
          </label>
          <select className='main__dropdown' id="dropdownField" name="dropdownField">
            <option value="" disabled selected />
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <button className='main__button2'>+ add intake</button>

      </form>

      <h1 className='main__title'>fruit intake report</h1>

      <section className='main__section'>

      <div className='main__box13'>
          <label htmlFor="dropdownField">
            <p className='main__label'>from</p>
          </label>
          <select className='main__dropdown--date' id="dropdownField" name="dropdownField">
            <option value="today's date" disabled selected>01 | 03 | 2024</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <div className='main__box14'>
          <label htmlFor="dropdownField">
            <p className='main__label'>to</p>
          </label>
          <select className='main__dropdown--date' id="dropdownField" name="dropdownField">
            <option value="today's date" disabled selected>01 | 03 | 2024</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <div className='main__box15'>
          <label htmlFor="filterDropdownField" />
          <select className='main__dropdown--filter' id="filterDropdownField" name="filterDropdownField">
            <option value="" disabled selected>filter</option>
            <option value="all">All</option>
            <option value="item1">Item 1</option>
            <option value="item2">Item 2</option>
            <option value="item3">Item 3</option>
            <option value="item4">Item 4</option>
          </select>
        </div>

        <div className='main__box16'>
          <label htmlFor="filterDropdownField" />
          <input className='main__dropdown--search' id="filterDropdownField" name="filterDropdownField" placeholder='search' />
        </div>

        <section className='main__intakes'>
          <IntakeCard />
        </section>

        <button className='main__button3'>download report</button>

      </section>

    </main>
  );
};

export default FruitIntakePage;
