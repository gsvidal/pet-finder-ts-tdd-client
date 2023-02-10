import { render, screen } from '@testing-library/react';
import { Cards } from './Cards';
import { PetsContextProviderMock } from '../setupTest';

describe('Cards', () => {
  test('should render five card components', () => {
    render(
      <PetsContextProviderMock>
        <Cards />
      </PetsContextProviderMock>
    );
    const cardElements: HTMLElement[] = screen.getAllByRole('article');
    expect(cardElements.length).toBe(5);
  });
});
