import { screen } from '@testing-library/react';
import { selectFilters, clickFavoriteCardButton } from '../setupTest';
import { setupMSWServer } from '../setupTest';

setupMSWServer();

describe('Pets', () => {
  test('should show right amount of card components', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');
    expect(cards.length).toBe(5);
  });
  // Integration tests:
  // favorite filter
  test('should filter for male pets when click male on gender select', async () => {
    const cards: HTMLElement[] = await selectFilters({ gender: 'male' });
    const maleCards: HTMLElement[] = screen.getAllByRole('article');
    expect(maleCards).toStrictEqual([cards[1], cards[3]]);
  });

  test('should filter for female pets when click female on gender select', async () => {
    const cards: HTMLElement[] = await selectFilters({ gender: 'female' });

    const femaleCards: HTMLElement[] = screen.getAllByRole('article');
    expect(femaleCards).toStrictEqual([cards[0], cards[2], cards[4]]);
  });
  // gender filter
  test('should filter for favorite pets when click favorite on favorite select', async () => {
    const cards: HTMLElement[] = await selectFilters({ favorite: 'favorite' });

    const favoriteCards: HTMLElement[] = screen.getAllByRole('article');
    expect(favoriteCards).toStrictEqual([cards[0], cards[1]]);
  });

  test('should filter for not favorite pets when click not favorite on favorite select', async () => {
    const cards: HTMLElement[] = await selectFilters({ favorite: 'not favorite' });

    const notFavoriteCards: HTMLElement[] = screen.getAllByRole('article');
    expect(notFavoriteCards).toStrictEqual([cards[2], cards[3], cards[4]]);
  });
  // animal type filter
  test('should filter for dog type when click dog on animal-type select', async () => {
    const cards: HTMLElement[] = await selectFilters({ animalType: 'dog' });

    const dogCards: HTMLElement[] = screen.getAllByRole('article');
    expect(dogCards).toStrictEqual([cards[0], cards[1], cards[2]]);
  });

  test('should filter for dog type when click dog on animal-type select', async () => {
    const cards: HTMLElement[] = await selectFilters({ animalType: 'cat' });

    const catCards: HTMLElement[] = screen.getAllByRole('article');
    expect(catCards).toStrictEqual([cards[3], cards[4]]);
  });

  //favorite + gender filters + click on cards
  test('should filter for favorite and female pets when click favorite on favorite select and click female on gender select', async () => {
    const cards: HTMLElement[] = await selectFilters({ favorite: 'favorite', gender: 'female' });

    const favoriteFemaleCards: HTMLElement[] = screen.getAllByRole('article');
    expect(favoriteFemaleCards).toStrictEqual([cards[0]]);
  });

  test('should filter for favorite and male pets when click favorite on favorite select and click male on gender select', async () => {
    const cards: HTMLElement[] = await selectFilters({ favorite: 'favorite', gender: 'male' });

    const favoriteMaleCards: HTMLElement[] = screen.getAllByRole('article');
    expect(favoriteMaleCards).toStrictEqual([cards[1]]);
  });

  test('should filter for not favorite and female pets when click not favorite on favorite select and click female on gender select', async () => {
    const cards: HTMLElement[] = await selectFilters({ favorite: 'not favorite', gender: 'female' });

    const notFavoriteFemaleCards: HTMLElement[] = screen.getAllByRole('article');
    expect(notFavoriteFemaleCards).toStrictEqual([cards[2], cards[4]]);
  });

  test('should filter for not favorite and male pets when click not favorite on favorite select and click male on gender select', async () => {
    const cards: HTMLElement[] = await selectFilters({ favorite: 'not favorite', gender: 'male' });

    const notFavoriteMaleCards: HTMLElement[] = screen.getAllByRole('article');
    expect(notFavoriteMaleCards).toStrictEqual([cards[3]]);
  });

  test('should filter favorite cards after clicking the first not favorite card heart icon', async () => {
    const cardsInitial: HTMLElement[] = await screen.findAllByRole('article');
    clickFavoriteCardButton(cardsInitial[2]);

    const cards: HTMLElement[] = await selectFilters({ favorite: 'favorite' });

    const favoriteCards: HTMLElement[] = screen.getAllByRole('article');
    expect(favoriteCards).toStrictEqual([cards[0], cards[1], cards[2]]);
  });

  test('should filter not favorite cards after clicking the first favorite card heart icon', async () => {
    const cardsInitial: HTMLElement[] = await screen.findAllByRole('article');

    clickFavoriteCardButton(cardsInitial[0]);

    const cards: HTMLElement[] = await selectFilters({ favorite: 'not favorite' });

    const notFavoriteCards: HTMLElement[] = screen.getAllByRole('article');
    expect(notFavoriteCards).toStrictEqual([cards[0], cards[2], cards[3], cards[4]]);
  });

  test('should not show any cards after selecting favorite and female and clicking heart button on the card', async () => {
    const cards = await selectFilters({ favorite: 'favorite', gender: 'female' });
    clickFavoriteCardButton(cards[0]);

    const favoriteFemaleCards = screen.queryAllByRole('article');
    expect(favoriteFemaleCards.length).toBe(0);
  });

  test('should show not favorite male cards after selecting not favorite and male and clicking heart button on the card ', async () => {
    const cards = await selectFilters({ favorite: 'not favorite', gender: 'male' });
    clickFavoriteCardButton(cards[3]);

    const notFavoritMaleCards = screen.queryAllByRole('article');
    expect(notFavoritMaleCards.length).toBe(0);
  });
  //favorite + gender + animal-type filters + click on card
  test('when first clicking heart button on Felix(first not favorite, female, cat) should show favorite female cat card after selecting favorite, female and cat options', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');

    clickFavoriteCardButton(cards[4]);
    await selectFilters({ favorite: 'favorite', gender: 'female', animalType: 'cat' });

    const favoriteFemaleCatCard = screen.getByRole('article');
    expect(favoriteFemaleCatCard).toBeInTheDocument();
  });

  test('when first clicking heart button on third card(not favorite, female, dog) should show (favorite female dog) cards after selecting favorite, female and cat options', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');

    clickFavoriteCardButton(cards[2]);
    await selectFilters({ favorite: 'favorite', gender: 'female', animalType: 'dog' });

    const favoriteFemaleDogCard = screen.getAllByRole('article');
    expect(favoriteFemaleDogCard).toStrictEqual([cards[0], cards[2]]);
  });
  //favorite + gender + animal-type filters + click on multiple cards
  test('when first clicking heart button on dogs cards then clicking heart button on last card should show then filter (not favorite male dog) should show one card', async () => {
    const cards: HTMLElement[] = await screen.findAllByRole('article');

    clickFavoriteCardButton(cards[0]);
    clickFavoriteCardButton(cards[1]);
    clickFavoriteCardButton(cards[2]);
    await selectFilters({ favorite: 'not favorite', gender: 'male', animalType: 'dog' });

    const favoriteFemaleDogCard = screen.getByRole('article');
    expect(favoriteFemaleDogCard).toStrictEqual(cards[1]);
  });
});
