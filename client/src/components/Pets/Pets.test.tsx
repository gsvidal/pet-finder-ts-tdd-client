import { render, screen, within } from '@testing-library/react';
import { Pets } from './Pets';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { pets as petsMock } from '../../mocks/pets';
import { CardProps } from '../Card/Card';
import userEvent from '@testing-library/user-event';

type Response = CardProps[];

const server = setupServer(
  rest.get<Response>('http://localhost:4000/pets', (req, res, ctx) => {
    return res(ctx.json(petsMock));
  })
);

beforeEach(() => {
  render(<Pets />);
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

describe('Pets', () => {
  test('should show right amount of card components', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');
    expect(cards.length).toBe(5);
  });
  // Integration tests:
  // favorite filter
  test('should filter for male pets when click male on gender select', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');
    const selectGenderElement: HTMLSelectElement = screen.getByLabelText(/gender/i);
    userEvent.selectOptions(selectGenderElement, 'male');
    const maleCards: HTMLElement[] = screen.getAllByRole('article');
    expect(maleCards).toStrictEqual([cards[1], cards[3]]);
  });

  test('should filter for female pets when click female on gender select', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');
    const selectGenderElement: HTMLSelectElement = screen.getByLabelText(/gender/i);
    userEvent.selectOptions(selectGenderElement, 'female');
    const femaleCards: HTMLElement[] = screen.getAllByRole('article');
    expect(femaleCards).toStrictEqual([cards[0], cards[2], cards[4]]);
  });
  // gender filter
  test('should filter for favorite pets when click favorite on favorite select', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');
    const selectFavoriteElement: HTMLSelectElement = screen.getByLabelText(/favorite/i);
    userEvent.selectOptions(selectFavoriteElement, 'favorite');
    const favoriteCards: HTMLElement[] = screen.getAllByRole('article');
    expect(favoriteCards).toStrictEqual([cards[0], cards[1]]);
  });

  test('should filter for not favorite pets when click not favorite on favorite select', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');

    const selectFavoriteElement: HTMLSelectElement = screen.getByLabelText(/favorite/i);
    userEvent.selectOptions(selectFavoriteElement, 'not favorite');

    const notFavoriteCards: HTMLElement[] = screen.getAllByRole('article');
    expect(notFavoriteCards).toStrictEqual([cards[2], cards[3], cards[4]]);
  });
  // animal type filter
  test('should filter for dog type when click dog on animal-type select', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');

    const selectAnimalTypeElement: HTMLSelectElement = screen.getByLabelText(/woof or miau?/i);
    userEvent.selectOptions(selectAnimalTypeElement, 'dog');

    const dogCards: HTMLElement[] = screen.getAllByRole('article');
    expect(dogCards).toStrictEqual([cards[0], cards[1], cards[2]]);
  });

  test('should filter for dog type when click dog on animal-type select', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');

    const selectAnimalTypeElement: HTMLSelectElement = screen.getByLabelText(/woof or miau?/i);
    userEvent.selectOptions(selectAnimalTypeElement, 'cat');

    const catCards: HTMLElement[] = screen.getAllByRole('article');
    expect(catCards).toStrictEqual([cards[3], cards[4]]);
  });

  //favorite + gender filters + click on cards
  test('should filter for favorite and female pets when click favorite on favorite select and click female on gender select', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');

    const selectFavoriteElement: HTMLSelectElement = screen.getByLabelText(/gender/i);
    userEvent.selectOptions(selectFavoriteElement, 'female');
    const selectGenderElement: HTMLSelectElement = screen.getByLabelText(/favorite/i);
    userEvent.selectOptions(selectGenderElement, 'favorite');

    const favoriteFemaleCards: HTMLElement[] = screen.getAllByRole('article');
    expect(favoriteFemaleCards).toStrictEqual([cards[0]]);
  });

  test('should filter for favorite and male pets when click favorite on favorite select and click male on gender select', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');

    const selectFavoriteElement: HTMLSelectElement = screen.getByLabelText(/gender/i);
    userEvent.selectOptions(selectFavoriteElement, 'male');
    const selectGenderElement: HTMLSelectElement = screen.getByLabelText(/favorite/i);
    userEvent.selectOptions(selectGenderElement, 'favorite');

    const favoriteMaleCards: HTMLElement[] = screen.getAllByRole('article');
    expect(favoriteMaleCards).toStrictEqual([cards[1]]);
  });

  test('should filter for not favorite and female pets when click not favorite on favorite select and click female on gender select', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');

    const selectFavoriteElement: HTMLSelectElement = screen.getByLabelText(/gender/i);
    userEvent.selectOptions(selectFavoriteElement, 'female');
    const selectGenderElement: HTMLSelectElement = screen.getByLabelText(/favorite/i);
    userEvent.selectOptions(selectGenderElement, 'not favorite');

    const notFavoriteFemaleCards: HTMLElement[] = screen.getAllByRole('article');
    expect(notFavoriteFemaleCards).toStrictEqual([cards[2], cards[4]]);
  });

  test('should filter for not favorite and male pets when click not favorite on favorite select and click male on gender select', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');

    const selectFavoriteElement: HTMLSelectElement = screen.getByLabelText(/gender/i);
    userEvent.selectOptions(selectFavoriteElement, 'male');
    const selectGenderElement: HTMLSelectElement = screen.getByLabelText(/favorite/i);
    userEvent.selectOptions(selectGenderElement, 'not favorite');

    const notFavoriteMaleCards: HTMLElement[] = screen.getAllByRole('article');
    expect(notFavoriteMaleCards).toStrictEqual([cards[3]]);
  });

  test('should filter favorite cards after clicking the first not favorite card heart icon', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');
    const firstNotFavoriteCard = cards[2];
    const firstNotFavoriteCardButton: HTMLButtonElement = within(firstNotFavoriteCard).getByRole('button');
    const selectGenderElement: HTMLSelectElement = screen.getByLabelText(/favorite/i);

    userEvent.click(firstNotFavoriteCardButton);

    userEvent.selectOptions(selectGenderElement, 'favorite');
    const favoriteCards: HTMLElement[] = screen.getAllByRole('article');
    expect(favoriteCards).toStrictEqual([cards[0], cards[1], cards[2]]);
  });

  test('should filter not favorite cards after clicking the first favorite card heart icon', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');
    const firstFavoriteCard = cards[0];
    const firstFavoriteCardButton: HTMLButtonElement = within(firstFavoriteCard).getByRole('button');
    const selectGenderElement: HTMLSelectElement = screen.getByLabelText(/favorite/i);

    userEvent.click(firstFavoriteCardButton);

    userEvent.selectOptions(selectGenderElement, 'not favorite');
    const notFavoriteCards: HTMLElement[] = screen.getAllByRole('article');
    expect(notFavoriteCards).toStrictEqual([cards[0], cards[2], cards[3], cards[4]]);
  });

  test('should not show any cards after selecting favorite and female and clicking heart button on the card', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');
    const selectFavoriteElement: HTMLSelectElement = screen.getByLabelText(/favorite/i);
    const selectGenderElement: HTMLSelectElement = screen.getByLabelText(/gender/i);

    userEvent.selectOptions(selectFavoriteElement, 'favorite');
    userEvent.selectOptions(selectGenderElement, 'female');

    const favoriteFemaleCard = cards[0];
    const favoriteFemaleCardButton: HTMLButtonElement = within(favoriteFemaleCard).getByRole('button');
    userEvent.click(favoriteFemaleCardButton);

    const favoriteFemaleCards = screen.queryAllByRole('article');
    expect(favoriteFemaleCards.length).toBe(0);
  });

  test('should show not favorite male cards after selecting not favorite and male and clicking heart button on the card ', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');
    const selectFavoriteElement: HTMLSelectElement = screen.getByLabelText(/favorite/i);
    const selectGenderElement: HTMLSelectElement = screen.getByLabelText(/gender/i);

    userEvent.selectOptions(selectFavoriteElement, 'not favorite');
    userEvent.selectOptions(selectGenderElement, 'male');

    const notFavoriteMaleCard = cards[3];
    const notFavoriteMaleCardButton: HTMLButtonElement = within(notFavoriteMaleCard).getByRole('button');
    userEvent.click(notFavoriteMaleCardButton);

    const notFavoritMaleCards = screen.queryAllByRole('article');
    expect(notFavoritMaleCards.length).toBe(0);
  });

  test('when first clicking heart button on Felix(first not favorite, female, cat) should show favorite female cat card after selecting favorite, female and cat selects', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');
    const selectFavoriteElement: HTMLSelectElement = screen.getByLabelText(/favorite/i);
    const selectGenderElement: HTMLSelectElement = screen.getByLabelText(/gender/i);
    const selectAnimalTypeElement: HTMLSelectElement = screen.getByLabelText(/woof or miau?/i);

    const notFavoriteFemaleCatCard = cards[4];
    const notFavoriteFemaleCatCardButton: HTMLButtonElement = within(notFavoriteFemaleCatCard).getByRole('button');
    userEvent.click(notFavoriteFemaleCatCardButton);

    userEvent.selectOptions(selectFavoriteElement, 'favorite');
    userEvent.selectOptions(selectGenderElement, 'female');
    userEvent.selectOptions(selectAnimalTypeElement, 'cat');

    const favoriteFemaleCatCard = screen.getByRole('article');
    expect(favoriteFemaleCatCard).toBeInTheDocument();
  });
});
