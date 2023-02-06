import { Card } from '../Card/Card';
import { CardProps } from '../Card/Card';
import './Cards.style.scss';

type CardsProps = {
  pets: CardProps[];
};

export const Cards = ({ pets }: CardsProps) => {
  return (
    <div className="cards">
      {pets.map((pet: CardProps) => (
        <Card {...pet} key={pet.id} />
      ))}
    </div>
  );
};
