import { useContext } from 'react';
import { PetsContext } from '../../context/PetsContext';
import { Card } from '../Card/Card';
import { CardProps } from '../Card/Card';
import './Cards.style.scss';
import { Loader } from '../Loader/Loader';

export const Cards = (): JSX.Element => {
  const { pets, filteredPets, isLoading } = useContext(PetsContext);

  return (
    <div className="cards">
      {isLoading ? <Loader /> : filteredPets.map((pet: CardProps) => <Card {...pet} key={pet.id} />)}
      {filteredPets.length === 0 && pets.length !== 0 && <p className="message">Not pets found with current filters</p>}
    </div>
  );
};
