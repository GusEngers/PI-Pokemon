import React from 'react';
import { Link } from 'react-router-dom';
import card from './Card.module.css';
import list from './ListCards.module.css';
import { useDispatch } from 'react-redux';
import { obtainedIdPokemon } from '../../redux/actions';

function Card({ id, name, image, types }) {
  let bg = isNaN(id) ? card.bg_db : card.bg_api;
  const dispatch = useDispatch()

  return (
    <div className={`${card.container} ${bg}`} onClick={() => dispatch(obtainedIdPokemon(id))}>
      <Link
        to={`/pokemon/${id}`}
        style={{
          textDecoration: 'none',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={image} alt={name} className={card.image} />
        <h1 className={card.name}>{name}</h1>
        <ul className={card.types}>
          {types.map((type, index) => {
            return <li key={`${type.name}-${index}`}>{type.name}</li>;
          })}
        </ul>
      </Link>
    </div>
  );
}

export default function ListCards({ pokemons }) {
  return (
    <div className={list.container}>
      {pokemons.map((pokemon) => {
        return (
          <Card
            key={`${pokemon.id}-${pokemon.name}`}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
          />
        );
      })}
    </div>
  );
}
