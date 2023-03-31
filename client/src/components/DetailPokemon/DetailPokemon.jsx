import React from "react";

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
    <div>
      <h1>{name}</h1>
      <div>
        <img src={image} alt={`${name}-${id}`} />
        <ul>
          {types.map((type, index) => (
            <li key={`${type.name}-${index}`}>{type.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>STATS</h3>
        <div>
          <div>
            <h2>HP</h2>
            <span>{hp}</span>
          </div>
          <div>
            <h2>ATTACK</h2>
            <span>{attack}</span>
          </div>
          <div>
            <h2>DEFENSE</h2>
            <span>{defense}</span>
          </div>
          <div>
            <h2>SPEED</h2>
            <span>{speed}</span>
          </div>
          <div>
            <h2>HEIGHT</h2>
            <span>{height}</span>
          </div>
          <div>
            <h2>WEIGHT</h2>
            <span>{weight}</span>
          </div>
        </div>
      </div>
      <button>Back</button>
    </div>
  );
}
