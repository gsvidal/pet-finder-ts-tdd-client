import './App.css';
import { Card } from './components/Card/Card';

function App() {
  return (
    <div className="App">
      <Card
        name="Osa"
        phone="999444222"
        email="gonzalovidal.dev@gmail.com"
        image={{ url: 'https://i.postimg.cc/LX35wnZZ/osa.png', alt: 'Foto de osa' }}
        isFavorite={false}
      />
    </div>
  );
}

export default App;
