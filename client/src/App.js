import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing/Landing';

/* function App() {
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
} */
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}
export default App;
