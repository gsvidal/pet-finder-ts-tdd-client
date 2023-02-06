import './Card.style.scss';
import outlinedHeartIcon from '../../assets/icons/heartOutlined.svg';
import filledHeartIcon from '../../assets/icons/heartFilled.svg';
import { useState, MouseEvent } from 'react';

type ImageObj = {
  url: string;
  alt: string;
};

type CardProps = {
  name: string;
  phone: string;
  email: string;
  image: ImageObj;
  isFavorite: boolean;
};

export const Card = ({ name, phone, email, image, isFavorite }: CardProps) => {
  const [isHeartFavorite, setIsHeartFavorite] = useState<boolean>(isFavorite);

  const toggleHeartFavorite: (event: MouseEvent<HTMLButtonElement>) => void = (event) => {
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
