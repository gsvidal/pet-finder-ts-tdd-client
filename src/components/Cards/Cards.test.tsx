import { render, screen } from '@testing-library/react';
import { Cards } from './Cards';
import { contextValue, PetsContextProviderMock } from '../setupTest';
import { PetsContext } from '../../context/PetsContext';

describe('Cards', () => {
  test('when app initially loads, should show Loader but should not show pet cards', () => {
    render(
      <PetsContextProviderMock>
        <Cards />
      </PetsContextProviderMock>
    );
    const loadingSpinnerElement: HTMLElement = screen.getByTitle(/loader/i);
    expect(loadingSpinnerElement).toBeInTheDocument();

    const cardElements: HTMLElement[] | null = screen.queryAllByRole('article');
    expect(cardElements.length).toBe(0);
  });

  test('should render five card components and should not show Loader after loading finishes', () => {
    render(
      <PetsContext.Provider value={{ ...contextValue, isLoading: false }}>
        <Cards />
      </PetsContext.Provider>
    );
    const loadingSpinnerElement: HTMLElement | null = screen.queryByTitle(/loader/i);
    expect(loadingSpinnerElement).not.toBeInTheDocument();

    const cardElements: HTMLElement[] = screen.getAllByRole('article');
    expect(cardElements.length).toBe(5);
  });
});
