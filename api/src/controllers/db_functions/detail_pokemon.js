const { Pokemon, Type } = require('../../db');

/**
 * Busca en la base de datos el pokemon por su nombre exacto
 * @param name Nombre del pokemon
 * @returns Objeto con la información del pokemon
 */
async function pokemonByName(name) {
  return await Pokemon.findOne({
    where: {
      name: name.toLowerCase(),
    },
    include: {
      model: Type,
      attributes: ['name'],
    },
  });
}

/**
 * Busca en la base de datos el pokemon por su id
 * @param id Id del pokemon
 * @returns Objeto con la información del pokemon
 */
async function pokemonById(id) {
  let pokemon = await Pokemon.findByPk(id, {
    include: {
      model: Type,
      attributes: ['name'],
    },
  });
  if (!pokemon) {
    throw new Error(`Pokemon with id ${id} not exists`);
  }
  return pokemon;
}

module.exports = {
  pokemonById,
  pokemonByName,
};
