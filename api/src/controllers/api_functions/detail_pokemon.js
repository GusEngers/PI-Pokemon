const axios = require('axios');
const cache = require('../cache_function');

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
    types: data.types.map((typ) => {
      return { name: typ.type.name };
    }),
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    speed: data.stats[5].base_stat,
    height: data.height,
    weight: data.weight,
  };
}

/**
 * Obtiene los detalles del pokemon especificado por id o nombre, además verifica si el pokemon en cuestión está almacenado en caché para retornarlo sin necesidad de realizar una petición a la API
 * @param pokemon Id númerico o nombre del pokemon
 * @returns Un objeto formateado con la información del pokemon desde la API o desde la memoria caché
 */
async function getApiPokemon(pokemon) {
  if(cache.has(pokemon)) return cache.get(pokemon);

  return await axios
    .get(`${URL_API}${isNaN(pokemon) ? pokemon.toLowerCase() : pokemon}`)
    .then((d) => {
      console.log('sin cache')
      cache.set(pokemon, formated(d.data));
      return formated(d.data);
    })
    .catch((e) => {
      e.message = isNaN(pokemon)
        ? `Pokemon with the name ${pokemon} does not exist!`
        : `Error getting the details of the pokemon with the id ${pokemon}`;
      throw new Error(e.message);
    });
}

module.exports = {
  getApiPokemon,
};
