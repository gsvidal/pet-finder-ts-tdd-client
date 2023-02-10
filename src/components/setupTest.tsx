import { pets } from '../mocks/pets';
import { PetsContextObj } from '../context/PetsContext';
import { PetsContext } from '../context/PetsContext';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pets } from './Pets/Pets';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { pets as petsMock } from '../mocks/pets';
import { CardProps } from './Card/Card';

// Setup context provider mock:
const mockFn = jest.fn();

const contextValue: PetsContextObj = {
  pets: pets,
  setPets: mockFn,
  filteredPets: pets,
  setFilteredPets: mockFn,
  updateFavorite: mockFn,
};

type PetsContextProviderMockProps = {
  children: JSX.Element;
};

export const PetsContextProviderMock = ({ children }: PetsContextProviderMockProps) => {
  return <PetsContext.Provider value={contextValue}>{children}</PetsContext.Provider>;
};

type SelectFiltersObj = {
  favorite?: string;
  gender?: string;
  animalType?: string;
};

// Helper functions:
export const selectFilters = async ({ favorite, gender, animalType }: SelectFiltersObj) => {
  const cards: HTMLElement[] = await screen.findAllByRole('article');

  const selectFavoriteElement: HTMLSelectElement = screen.getByLabelText(/favorite/i);
  const selectGenderElement: HTMLSelectElement = screen.getByLabelText(/gender/i);
  const selectAnimalTypeElement: HTMLSelectElement = screen.getByLabelText(/woof or miau?/i);

  if (favorite !== undefined) {
    userEvent.selectOptions(selectFavoriteElement, favorite);
  }
  if (gender !== undefined) {
    userEvent.selectOptions(selectGenderElement, gender);
  }
  if (animalType !== undefined) {
    userEvent.selectOptions(selectAnimalTypeElement, animalType);
  }

  return cards;
};

export const clickFavoriteCardButton = (cardElement: HTMLElement) => {
  const selectedCard = cardElement;
  const selectedCardButton: HTMLButtonElement = within(selectedCard).getByRole('button');
  userEvent.click(selectedCardButton);
};

// Setup setupMSWServer for Pets test file:
export const setupMSWServer = () => {
  type Response = CardProps[];

  const server = setupServer(
    rest.get<Response>('http://localhost:4000/pets', (req, res, ctx) => {
      return res(ctx.json(petsMock));
    })
  );

  beforeEach(() => {
    render(
      <PetsContextProviderMock>
        <Pets />
      </PetsContextProviderMock>
    );
  });
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
};
