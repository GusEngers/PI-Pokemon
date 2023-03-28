import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SearchBar from '../../components/Bars/SearchBar/SearchBar';
import { obtainedPokemon } from '../../redux/actions';

export default function Search() {
  const dispatch = useDispatch();
  const { pokemon, error, loading } = useSelector((state) => state);
  const { name } = useParams();

  React.useEffect(() => {
    if (!Object.entries(pokemon).length) {
      dispatch(obtainedPokemon(name));
    }
  }, [dispatch, pokemon, name]);

  if (loading) {
    return <h1>Cargaaando...</h1>;
  }
  if (!!error) {
    return <h1>{error}</h1>;
  }
  return (
    <div>
      <SearchBar />
      <h1>{pokemon.name}</h1>
    </div>
  );
}
