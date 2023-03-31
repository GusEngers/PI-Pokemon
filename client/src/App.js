import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Contact from './pages/Contact/Contact';
import Create from './pages/Create/Create';
import Home from './pages/Home/Home';
import Landing from './pages/Landing/Landing';
import Search from './pages/Search/Search';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search/:name" element={<Search />} />
        <Route path="/create" element={<Create />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
