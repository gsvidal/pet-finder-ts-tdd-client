import { render, screen } from '@testing-library/react';
import { Cards } from './Cards';
import { pets } from '../../mocks/pets';

const mockFn = jest.fn();

describe('Cards', () => {
  test('should render five card components', () => {
    render(<Cards pets={pets} filteredPets={pets} setPets={mockFn} />);
    const cardElements: HTMLElement[] = screen.getAllByRole('article');
    expect(cardElements.length).toBe(5);
  });
});
