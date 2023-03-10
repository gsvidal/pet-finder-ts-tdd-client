import './Filter.style.scss';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { PetsContext } from '../../context/PetsContext';

interface SelectValueObj {
  favorite: string;
  gender: string;
  'animal-type': string;
}

export const Filter = (): JSX.Element => {
  const { pets, setFilteredPets } = useContext(PetsContext);
  const [selectValue, setSelectValue] = useState<SelectValueObj>({
    favorite: 'any',
    gender: 'any',
    'animal-type': 'any',
  });
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue({
      ...selectValue,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  useEffect(() => {
    let filtered = [...pets];

    if (selectValue.favorite !== 'any') {
      filtered = filtered.filter((pet) => pet.isFavorite === (selectValue.favorite === 'favorite'));
    }
    if (selectValue.gender !== 'any') {
      filtered = filtered.filter((pet) => pet.gender === selectValue.gender);
    }
    if (selectValue['animal-type'] !== 'any') {
      filtered = filtered.filter((pet) => pet.animalType === selectValue['animal-type']);
    }

    setFilteredPets(filtered);
  }, [selectValue, pets, setFilteredPets]);

  return (
    <section className="filter">
      <h2 className="filter__title">Filter by:</h2>
      <div className="selects-container">
        <div className="select-container select-container--favorite">
          <label htmlFor="favorite">Favorite</label>
          <select name="favorite" id="favorite" onChange={handleSelect}>
            <option value="any">Any</option>
            <option value="favorite">Favorite</option>
            <option value="not favorite">Not favorite</option>
          </select>
        </div>
        <div className="select-container select-container--gender">
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender" onChange={handleSelect}>
            <option value="any">Any</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div className="select-container select-container--animal-type">
          <label htmlFor="animal-type">Woof or miau?</label>
          <select name="animal-type" id="animal-type" onChange={handleSelect}>
            <option value="any">Any</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </div>
      </div>
    </section>
  );
};
