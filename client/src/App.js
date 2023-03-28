import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Landing from './pages/Landing/Landing';
import Search from './pages/Search/Search';

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
        <Route path="/home" element={<Home />} />
        <Route path="/search/:name" Component={Search} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
