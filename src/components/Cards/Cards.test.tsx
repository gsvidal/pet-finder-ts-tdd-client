import { render, screen } from '@testing-library/react';
import { Cards } from './Cards';
import { pets } from '../../mocks/pets';

describe('Cards', () => {
  test('should render five card components', () => {
    render(<Cards pets={pets} />);
    const cardElements: HTMLElement[] = screen.getAllByRole('article');
    expect(cardElements.length).toBe(5);
  });
});
