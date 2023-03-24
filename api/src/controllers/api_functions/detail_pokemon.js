const axios = require('axios');

const URL_API = 'https://pokeapi.co/api/v2/pokemon/';

/**
 * Reduce la cantidad de datos recibidos de la solicitud
 * @param data Objeto con los datos recibidos de la solicitud
 * @returns El objeto formateado con menos datos
 */
function formated(data) {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    types: data.types.map((typ) => typ.type.name),
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    speed: data.stats[5].base_stat,
    height: data.height,
    weight: data.weight,
  };
}

/**
 * Obtiene los detalles del pokemon especificado por id
 * @param pokemon Id númerico o nombre del pokemon
 * @returns Un objeto formateado con la información del pokemon
 */
async function getApiPokemon(pokemon) {
  return await axios
    .get(`${URL_API}${isNaN(pokemon) ? pokemon.toLowerCase() : pokemon}`)
    .then((d) => formated(d.data))
    .catch((e) => {
      e.message = isNaN(pokemon)
        ? `Error getting the details of the pokemon with the name ${pokemon}`
        : `Error getting the details of the pokemon with the id ${pokemon}`;
      throw new Error(e.message);
    });
}

module.exports = {
  getApiPokemon,
};
