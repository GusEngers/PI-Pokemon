const { getApiPokemon } = require('./api_functions/detail_pokemon');
const { pokemonById } = require('./db_functions/detail_pokemon');

/**
 * Busca al pokemon por su id
 * @param id Puede ser un id númerico o el id usado en la base de dato
 * @returns Objeto con la información del pokemon o un mensaje de error
 */
async function idPokemon(id) {
  if (isNaN(id)) {
    return await pokemonById(id);
  }
  return await getApiPokemon(id);
}

module.exports = {
  idPokemon,
};
