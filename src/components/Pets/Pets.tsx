import { Filter } from '../Filter/Filter';
import { Cards } from '../Cards/Cards';
import { PetsContextProvider } from '../../context/PetsContext';
import './Pets.style.scss';

export const Pets = (): JSX.Element => {
  return (
    <section className="main">
      <PetsContextProvider>
        <Filter />
        <Cards />
      </PetsContextProvider>
    </section>
  );
};
