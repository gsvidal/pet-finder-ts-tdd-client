import { pets } from '../mocks/pets';
import { PetsContextObj } from '../context/PetsContext';
import { PetsContext } from '../context/PetsContext';

const mockFn1 = jest.fn();
const mockFn2 = jest.fn();
const mockFn3 = jest.fn();

const contextValue: PetsContextObj = {
  pets: pets,
  setPets: mockFn1,
  filteredPets: pets,
  setFilteredPets: mockFn2,
  updateFavorite: mockFn3,
};

type PetsContextProviderMockProps = {
  children: JSX.Element;
};

export const PetsContextProviderMock = ({ children }: PetsContextProviderMockProps) => {
  return <PetsContext.Provider value={contextValue}>{children}</PetsContext.Provider>;
};
