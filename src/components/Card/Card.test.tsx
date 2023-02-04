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
  image: { url: 'https://i.postimg.cc/LX35wnZZ/osa.png', alt: 'Foto de osa' },
  isFavorite: false,
};

describe('Card', () => {
  test("should show pet's name", () => {
    render(<Card {...cardProps} />);
    const nameElement: HTMLHeadingElement = screen.getByRole('heading', { name: /osa/i });
    expect(nameElement).toBeInTheDocument();
  });

  test('should show phone number', () => {
    render(<Card {...cardProps} />);
    const phoneNumberElement: HTMLParagraphElement = screen.getByText(/999444222/i);
    expect(phoneNumberElement).toBeInTheDocument();
  });

  test('should show email', () => {
    render(<Card {...cardProps} />);
    const emailElement: HTMLParagraphElement = screen.getByText(/gonzalovidal.dev@gmail.com/i);
    expect(emailElement).toBeInTheDocument();
  });

  test('should show image with correct source', () => {
    render(<Card {...cardProps} />);
    const imageElement: HTMLImageElement = screen.getByRole('img', { name: /foto de osa/i });
    expect(imageElement.src).toBe(cardProps.image.url);
  });
});
