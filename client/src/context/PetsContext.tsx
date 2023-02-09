import { useState, useEffect, createContext } from 'react';
import { CardProps } from '../components/Card/Card';
import axios from 'axios';

type PetsType = CardProps[];

type Response = {
  data: PetsType;
};

export type PetsContextObj = {
  pets: CardProps[];
  filteredPets: CardProps[];
  setPets: (pets: CardProps[]) => void;
  setFilteredPets: (pets: CardProps[]) => void;
  updateFavorite: (id: number, isFavoriteUpdate: boolean) => void;
};

export const PetsContext = createContext<PetsContextObj>({} as PetsContextObj);

type PetsContextProviderProps = {
  children: JSX.Element[];
};

export const PetsContextProvider = ({ children }: PetsContextProviderProps) => {
  const [pets, setPets] = useState<PetsType>([] as PetsType);
  const [filteredPets, setFilteredPets] = useState<PetsType>([] as PetsType);

  const fetchPets = async (): Promise<void> => {
    const response: Response = await axios.get('http://localhost:4000/pets');
    setPets(response.data);
    setFilteredPets(response.data);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const updateFavorite = (id: number, isFavoriteUpdate: boolean): void => {
    const updatePets = [...pets];
    const petToUpdateIndex = updatePets.findIndex((pet) => pet.id === id);
    updatePets[petToUpdateIndex].isFavorite = isFavoriteUpdate;
    setPets(updatePets);
  };

  const contextValue: PetsContextObj = {
    pets: pets,
    setPets: setPets,
    filteredPets: filteredPets,
    setFilteredPets: setFilteredPets,
    updateFavorite: updateFavorite,
  };

  return <PetsContext.Provider value={contextValue}>{children}</PetsContext.Provider>;
};
