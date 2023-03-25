const { Type } = require('../../db');
const { listApiTypes } = require('../api_functions/list_types');

/**
 * Crea los distintos tipos de pokemon
 * @param types Lista con los tipos de pokemons traídos de la api
 */
async function createTypes(types) {
  for (let i = 0; i < types.length; i++) {
    await Type.create({ name: types[i].name });
  }
}

/**
 * Obtener los tipos de pokemons alojados en la base de datos.
 * Si no hay nada alojado, se utiliza la api y luego se cargan esos valores a la base de datos.
 * @returns Una lista con los tipos de pokemons
 */
async function listTypes() {
  let types = await Type.findAll({});
  if (!types.length) {
    let typesApi = await listApiTypes();
    await createTypes(typesApi);
    return await Type.findAll({});
  }
  return types;
}

module.exports = {
  listTypes,
};
