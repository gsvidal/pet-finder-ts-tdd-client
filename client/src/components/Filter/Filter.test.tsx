import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Filter } from './Filter';
import { pets as petsMock } from '../../mocks/pets';

const mockFn = jest.fn();

describe('<Filter />', () => {
  beforeEach(() => {
    render(<Filter pets={petsMock} setFilteredPets={mockFn} />);
  });
  test('should show correct title', () => {
    const titleElement = screen.getByRole('heading', { name: /filter by:/i });
    expect(titleElement).toBeInTheDocument();
  });
  test('should show favorite or not favorite select an option', () => {
    const selectElement: HTMLSelectElement = screen.getByLabelText(/favorite/i);
    expect(selectElement.value).toBe('any');

    userEvent.selectOptions(selectElement, 'favorite');
    expect(selectElement.value).toBe('favorite');

    userEvent.selectOptions(selectElement, 'not favorite');
    expect(selectElement.value).toBe('not favorite');
  });

  test('should show male or female after select an option', () => {
    const selectElement: HTMLSelectElement = screen.getByLabelText(/gender/i);
    expect(selectElement.value).toBe('any');

    userEvent.selectOptions(selectElement, 'female');
    expect(selectElement.value).toBe('female');

    userEvent.selectOptions(selectElement, 'male');
    expect(selectElement.value).toBe('male');
  });

  // test('should show dog or cat after select an option', () => {
  //   const selectElement: HTMLSelectElement = screen.getByLabelText(/woof or miau?/i);
  //   expect(selectElement.value).toBe('any');

  //   userEvent.selectOptions(selectElement, 'dog');
  //   expect(selectElement.value).toBe('dog');

  //   userEvent.selectOptions(selectElement, 'cat');
  //   expect(selectElement.value).toBe('cat');
  // });
});
