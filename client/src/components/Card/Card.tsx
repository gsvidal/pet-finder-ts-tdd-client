import './Card.style.scss';
import outlinedHeartIcon from '../../assets/icons/heartOutlined.svg';
import filledHeartIcon from '../../assets/icons/heartFilled.svg';
import { useState, MouseEvent } from 'react';

type ImageObj = {
  url: string;
  alt: string;
};

export type CardProps = {
  id: number;
  name: string;
  phone: string;
  email: string;
  image: ImageObj;
  isFavorite: boolean;
  color: string;
  gender: string;
  animalType: string;
  updateFavorite?: (id: number, isFavoriteUpdate: boolean) => void;
};

export const Card = ({ id, name, phone, email, image, isFavorite, updateFavorite }: CardProps): JSX.Element => {
  const [isHeartFavorite, setIsHeartFavorite] = useState<boolean>(isFavorite);

  const toggleHeartFavorite: (event: MouseEvent<HTMLButtonElement>) => void = (event) => {
    updateFavorite!(id, !isHeartFavorite);
    setIsHeartFavorite((isHeartFavorite) => !isHeartFavorite);
  };
  return (
    <article className="card">
      <div className="card__header">
        <img className="card__image" src={image.url} alt={image.alt} />
        <button className="heart" onClick={toggleHeartFavorite}>
          {isHeartFavorite ? (
            <img src={filledHeartIcon} alt="filled heart" className="heart__image" />
          ) : (
            <img src={outlinedHeartIcon} alt="outlined heart" className="heart__image" />
          )}
        </button>
      </div>
      <div className="card__body">
        <h2 className="card__title">{name}</h2>
        <p className="card__subtitle">{phone}</p>
        <p className="card__subtitle">{email}</p>
      </div>
      {/* <div className="card__footer"></div> */}
    </article>
  );
};
