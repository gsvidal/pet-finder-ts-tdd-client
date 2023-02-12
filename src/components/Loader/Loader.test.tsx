import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader', () => {
  test('should render at the beginning until pet cards are shown', () => {
    render(<Loader />);
    const loadingSpinnerElement = screen.getByTitle(/loader/i);
    expect(loadingSpinnerElement).toBeInTheDocument();
  });
});
