const { getApiPokemon } = require('./api_functions/detail_pokemon');
const { pokemonByName } = require('./db_functions/detail_pokemon');

/**
 * Busca al pokemon por su nombre exacto
 * @param name Nombre del pokemon
 * @returns Objeto con la información del pokemon o un mensaje de error
 */
async function namePokemon(name) {
  let data = await pokemonByName(name);
  if (!data) {
    data = await getApiPokemon(name);
  }
  return data;
}

module.exports = {
  namePokemon,
};
