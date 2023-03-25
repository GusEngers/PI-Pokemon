const { Pokemon, Type } = require('../../db');

/**
 * Realiza una consulta a la base de datos para traer todos sus valores
 * @returns Lista con los pokemons alojados en la base de datos
 */
async function listDBPokemons() {
  let pokemons = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ['name'],
    },
  });
  return pokemons;
}

module.exports = {
  listDBPokemons,
};
