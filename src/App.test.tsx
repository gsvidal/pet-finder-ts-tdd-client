import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('should render h1 heading', () => {
    render(<App />);
    const HeadingH1Element: HTMLHeadingElement = screen.getByRole('heading', { level: 1, name: 'Pet Adoption Center' });

    expect(HeadingH1Element).toBeInTheDocument();
  });

  test('should render h1 heading', () => {
    render(<App />);
    const HeadingH2Element: HTMLHeadingElement = screen.getByRole('heading', {
      level: 2,
      name: 'Are you ready to get a new family member?. Contact us!',
    });

    expect(HeadingH2Element).toBeInTheDocument();
  });
});
