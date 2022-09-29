import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.js';
import Home from './components/Home/Home.js';
import DetailPokemon from './components/DetailPokemon/DetailPokemon.js';
import CreatePokemon from './components/CreatePokemon/CreatePokemon.js';

function App() {
  return (
    <div className='App'>
      <Route 
        exact path='/' 
        component={LandingPage} />
      <Route 
        exact path='/home'
        component={Home}
      />
      <Route 
        exact path='/pokemons/:id'
        component={DetailPokemon}
      />
      <Route 
        exact path='/create'
        component={CreatePokemon}
      />
    </div>
  );
}

export default App;
