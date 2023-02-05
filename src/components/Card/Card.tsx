import './Card.style.css';

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
  return (
    <article className="card">
      <div className="card__header">
        <img className="card__image" src={image.url} alt={image.alt} />
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
