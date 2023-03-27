import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleaningPokemons, obtainedPokemons } from '../../redux/actions';

export default function Home() {
  const dispatch = useDispatch()
  const {pokemons, loading, error} = useSelector((state) => state);
  
  React.useEffect(() => {
    if(!pokemons.length) {
      return dispatch(obtainedPokemons())
    }
    return () => dispatch(cleaningPokemons())
  }, [])
  
  if(loading) {
    return <h1>Cargando</h1>
  }else if(!!error) {
    return <h1>{error}</h1>
  } else {
    return <h1>tamaño array {pokemons.length}</h1>
  }
  
}
