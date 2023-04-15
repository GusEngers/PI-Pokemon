const { getApiPokemon } = require('./detail_pokemon');

/**
 * Obtiene una lista de datos de una cantidad de pokemons
 * @returns Un array de objetos con información de pokemons
 */
async function listApiPokemons() {
  let pokemons = [];
  let i = 1;
  while (i <= 40) {
    let pokemon = await getApiPokemon(i);
    pokemons.push(pokemon);
    i++;
  };
  return pokemons;
}

module.exports = {
  listApiPokemons,
};
