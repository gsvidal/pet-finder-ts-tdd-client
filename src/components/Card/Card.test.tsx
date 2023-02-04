import { render, screen } from '@testing-library/react';
import { Card } from './Card';

type ImageObj = {
  url: string;
  alt: string;
};

type CardPropsObj = {
  name: string;
  phone: string;
  email: string;
  image: ImageObj;
  isFavorite: boolean;
};

const cardProps: CardPropsObj = {
  name: 'osa',
  phone: '999444222',
  email: 'gonzalovidal.dev@gmail.com',
  image: { url: '', alt: 'Foto de osa' },
  isFavorite: false,
};

describe('Card', () => {
  test("should show pet's name", () => {
    render(<Card {...cardProps} />);
    const nameElement = screen.getByRole('heading', { name: /osa/i });
    expect(nameElement).toBeInTheDocument();
  });
});
