import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterBar from '../../components/Bars/FilterBar/FilterBar';
import NavBar from '../../components/Bars/NavBar/NavBar';
import SearchBar from '../../components/Bars/SearchBar/SearchBar';
import ListCards from '../../components/ListCards/ListCards';
import {
  obtainedPokemons,
  obtainedPokemonsCopy,
  cleaningPokemons,
} from '../../redux/actions';

export default function Home() {
  const dispatch = useDispatch();
  const { pokemons, pokemons_copy, loading, error } = useSelector(
    (state) => state
  );

  React.useEffect(() => {
    if (!pokemons.length) {
      dispatch(obtainedPokemons());
      dispatch(obtainedPokemonsCopy());
    }
    if (!pokemons_copy.length) {
      dispatch(obtainedPokemonsCopy());
    }
    return () => {
      dispatch(cleaningPokemons());
    };
  }, []);

  if (loading) return <h1>Cargando home</h1>;
  if (!!error) return <h1>{error}</h1>;
  return (
    <>
      <NavBar />
      <SearchBar />
      <FilterBar />
      <ListCards pokemons={pokemons_copy[pokemons_copy.length - 1]} />
    </>
  );
}
