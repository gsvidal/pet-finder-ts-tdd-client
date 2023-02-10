import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PetsContextProviderMock } from '../setupTest';
import { Card } from './Card';
import { CardProps } from './Card';

const cardProps: CardProps = {
  id: 1,
  name: 'osa',
  phone: '999444222',
  email: 'gonzalovidal.dev@gmail.com',
  image: { url: 'https://i.postimg.cc/LX35wnZZ/osa.png', alt: 'Foto de osa' },
  isFavorite: false,
  color: 'beige',
  gender: 'female',
  animalType: 'dog',
};

beforeEach(() => {});

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

  test('should show outlined heart icon', () => {
    render(<Card {...cardProps} />);

    const outlinedHeartIconElement: HTMLImageElement = screen.getByAltText(/outlined heart/i);
    const filledHeartIconElement: HTMLImageElement | null = screen.queryByAltText(/filled heart/i);

    expect(outlinedHeartIconElement).toBeInTheDocument();
    expect(filledHeartIconElement).not.toBeInTheDocument();
  });

  test('should show filled heart icon', () => {
    render(<Card {...cardProps} isFavorite={true} />);

    const filledHeartIconElement: HTMLImageElement = screen.getByAltText(/filled heart/i);
    const outlinedHeartIconElement: HTMLImageElement | null = screen.queryByAltText(/outlined heart/i);

    expect(filledHeartIconElement).toBeInTheDocument();
    expect(outlinedHeartIconElement).not.toBeInTheDocument();
  });

  test('should toggle outlined to filled heart icon', () => {
    render(
      <PetsContextProviderMock>
        <Card {...cardProps} />
      </PetsContextProviderMock>
    );

    const outlinedHeartIconElement: HTMLImageElement = screen.getByAltText(/outlined heart/i);
    const filledHeartIconElement: HTMLImageElement | null = screen.queryByAltText(/filled heart/i);
    const heartIconButtonElement: HTMLButtonElement = screen.getByRole('button');

    expect(outlinedHeartIconElement).toBeInTheDocument();
    expect(filledHeartIconElement).not.toBeInTheDocument();

    userEvent.click(heartIconButtonElement);

    // render(<Card {...cardProps} isFavorite={true} />);

    const filledHeartIconElementAfterClick: HTMLImageElement = screen.getByAltText(/filled heart/i);
    const outlinedHeartIconElementAfterClick: HTMLImageElement | null = screen.queryByAltText(/outlined heart/i);

    expect(filledHeartIconElementAfterClick).toBeInTheDocument();
    expect(outlinedHeartIconElementAfterClick).not.toBeInTheDocument();
  });
});
