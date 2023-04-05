import React from 'react';
import DetailPokemon from '../../components/DetailPokemon/DetailPokemon';
import NavBar from '../../components/Bars/NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { cleaningPokemon, obtainedIdPokemon } from '../../redux/actions';
import { useParams } from 'react-router-dom';

export default function Detail() {
  const dispatch = useDispatch();
  const { pokemon, error, loading } = useSelector((state) => state);
  const { id } = useParams();

  React.useEffect(() => {
    if (!Object.entries(pokemon).length) {
      dispatch(obtainedIdPokemon(id));
    }
    return () => dispatch(cleaningPokemon());
  }, []);

  if (loading) return <h1>Cargando detalle</h1>;
  if (!!error) return <h1>{error}</h1>;
  return (
    <>
      <NavBar />
      <DetailPokemon
        id={pokemon.id}
        name={pokemon.name}
        image={pokemon.image}
        types={pokemon.types}
        hp={pokemon.hp}
        attack={pokemon.attack}
        defense={pokemon.defense}
        speed={pokemon.speed}
        height={pokemon.height}
        weight={pokemon.weight}
      />
    </>
  );
}
