import './App.style.scss';
import { Pets } from './components/Pets/Pets';

function App(): JSX.Element {
  return (
    <div className="App">
      <div className="app-bg"></div>
      <h1 className="app-title">Pet Adoption Center</h1>
      <h2 className="app-subtitle">Are you ready to get a new family member?. Contact us!</h2>
      <Pets />
    </div>
  );
}

export default App;
