import React from 'react';
import style from './DetailPokemon.module.css';

export default function DetailPokemon({
  id,
  name,
  image,
  types,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
}) {
  return (
    <div className={style.container_root}>
      <div className={style.container_one}>
        <h1>{name}</h1>
        <img src={image} alt={`${name}-${id}`} />
        <ul>
          {types.map((type, index) => (
            <li key={`${type.name}-${index}`}>{type.name}</li>
          ))}
        </ul>
      </div>
      <div className={style.container_two}>
        <div className={style.container_stats}>
          <div>
            <h3>HP</h3>
            <span>{hp}</span>
          </div>
          <div>
            <h3>ATTACK</h3>
            <span>{attack}</span>
          </div>
          <div>
            <h3>DEFENSE</h3>
            <span>{defense}</span>
          </div>
          <div>
            <h3>SPEED</h3>
            <span>{speed}</span>
          </div>
          <div>
            <h3>HEIGHT</h3>
            <span>{height}</span>
          </div>
          <div>
            <h3>WEIGHT</h3>
            <span>{weight}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
