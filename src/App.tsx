import './App.style.scss';
import { Cards } from './components/Cards/Cards';
import { pets } from './mocks/pets';

function App() {
  return (
    <div className="App">
      <Cards pets={pets} />
    </div>
  );
}

export default App;
