import './Filter.style.scss';

// interface FilterProps {}

export const Filter = (): JSX.Element => {
  return (
    <section className="filter">
      <h2 className="filter__title">Filter by:</h2>
      <div className="selects-container">
        <div className="select-container select-container--favorite">
          <label htmlFor="favorite">Favorite</label>
          <select name="favorite" id="favorite">
            <option value="any">Any</option>
            <option value="favorite">Favorite</option>
            <option value="not favorite">Not favorite</option>
          </select>
        </div>
        <div className="select-container select-container--gender">
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender">
            <option value="any">Any</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div className="select-container select-container--animal-type">
          <label htmlFor="animal-type">Woof or miau?</label>
          <select name="animal-type" id="animal-type">
            <option value="any">Any</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </div>
      </div>
    </section>
  );
};
