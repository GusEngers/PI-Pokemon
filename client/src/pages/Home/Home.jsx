import React from 'react';
/* import { useSearchParams } from 'react-router-dom' */
import { useDispatch, useSelector } from 'react-redux';
import ListCards from '../../components/ListCards/ListCards';
import { cleaningPokemons, obtainedPokemons } from '../../redux/actions';

export default function Home() {
  /* const location = useSearchParams()
  
  console.log(location) */
  const dispatch = useDispatch();
  const { pokemons, loading, error } = useSelector((state) => state);

  React.useEffect(() => {
    if (!pokemons.length) {
      return dispatch(obtainedPokemons());
    }
    return () => dispatch(cleaningPokemons());
  }, []);

  if (loading) {
    return <h1>Cargando</h1>;
  } else if (!!error) {
    return <h1>{error}</h1>;
  } else {
    return <ListCards pokemons={pokemons} />;
  }
}
