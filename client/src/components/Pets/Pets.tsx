import { Filter } from '../Filter/Filter';
import { Cards } from '../Cards/Cards';
import { CardProps } from '../Card/Card';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Pets.style.scss';

type PetsType = CardProps[];

type Response = {
  data: PetsType;
};

export const Pets = (): JSX.Element => {
  const [pets, setPets] = useState<PetsType>([] as PetsType);
  const [filteredPets, setFilteredPets] = useState<PetsType>([] as PetsType);

  const fetchPets = async (): Promise<void> => {
    const response: Response = await axios.get('http://localhost:4000/pets');
    setPets(response.data);
    setFilteredPets(response.data);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <section className="main">
      <Filter pets={pets} setFilteredPets={setFilteredPets} />
      <Cards pets={pets} filteredPets={filteredPets} setPets={setPets} />
    </section>
  );
};
