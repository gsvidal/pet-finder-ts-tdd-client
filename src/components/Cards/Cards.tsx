import { useContext } from 'react';
import { PetsContext } from '../../context/PetsContext';
import { Card } from '../Card/Card';
import { CardProps } from '../Card/Card';
import './Cards.style.scss';

export const Cards = (): JSX.Element => {
  const { filteredPets } = useContext(PetsContext);

  return (
    <div className="cards">
      {filteredPets.length !== 0 ? (
        filteredPets.map((pet: CardProps) => <Card {...pet} key={pet.id} />)
      ) : (
        <p className="empty">Not pets found with current filters</p>
      )}
    </div>
  );
};
