const axios = require('axios');

const URL_API = 'https://pokeapi.co/api/v2/type';

/**
 * Formatea los datos recibidos de la solicitud
 * @param types Un array de objetos con dos propiedades
 * @returns Un array de objetos con una propiedad
 */
function formated(types) {
  return types.map((type) => {
    return {
      name: type.name,
    };
  });
}

/**
 * @returns Una lista de tipos de pokemons
 */
async function listApiTypes() {
  return await axios
    .get(URL_API)
    .then((d) => formated(d.data.results))
    .catch((e) => {
      e.message = 'Error when fetching the types of pokemon from the api';
      throw new Error(e.message);
    });
}

module.exports = {
  listApiTypes,
};
