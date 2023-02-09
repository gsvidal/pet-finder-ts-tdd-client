import { Card } from '../Card/Card';
import { CardProps } from '../Card/Card';
import './Cards.style.scss';

type CardsProps = {
  pets: CardProps[];
  filteredPets: CardProps[];
  setPets: (pets: CardProps[]) => void;
};

export const Cards = ({ pets, filteredPets, setPets }: CardsProps): JSX.Element => {
  const updateFavorite = (id: number, isFavoriteUpdate: boolean): void => {
    const updatePets = [...pets];
    const petToUpdateIndex = updatePets.findIndex((pet) => pet.id === id);
    updatePets[petToUpdateIndex].isFavorite = isFavoriteUpdate;
    setPets(updatePets);
  };
  return (
    <div className="cards">
      {filteredPets.map((pet: CardProps) => (
        <Card {...pet} key={pet.id} updateFavorite={updateFavorite} />
      ))}
    </div>
  );
};
