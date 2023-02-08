import { render, screen } from '@testing-library/react';
import { Pets } from './Pets';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { pets as petsMock } from '../../mocks/pets';
import { CardProps } from '../Card/Card';

type Response = CardProps[];

const server = setupServer(
  rest.get<Response>('http://localhost:4000/pets', (req, res, ctx) => {
    return res(ctx.json(petsMock));
  })
);

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
    render(<Pets />);
    const cards = await screen.findAllByRole('article');
    expect(cards.length).toBe(5);
  });
});
