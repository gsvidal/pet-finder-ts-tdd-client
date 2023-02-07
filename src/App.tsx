import './App.style.scss';
import { Cards } from './components/Cards/Cards';
import { pets } from './mocks/pets';
import Filter from './components/Filter/Filter';

function App(): JSX.Element {
  return (
    <div className="App">
      <div className="app-bg"></div>
      <h1 className="app-title">Pet Adoption Center</h1>
      <section className="main">
        <Filter />
        <Cards pets={pets} />
      </section>
    </div>
  );
}

export default App;
