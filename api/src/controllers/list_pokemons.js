const { listApiPokemons } = require('./api_functions/list_pokemons');
const { listDBPokemons } = require('./db_functions/list_pokemons');

/**
 * Obtiene los pokemons de la api y los que están alojados en la base de datos.
 * Si se incluye el parámetro 'mode' sólo se obtendrán los pokemons de la base de datos.
 * @param database Si su valor es true busca sólo los elementos de la base de datos
 * @returns Objeto con dos propiedades 'api' y 'db', si existe 'mode' retornará un objeto con la propiedad 'db'
 */
async function listPokemons(database = false) {
  if (database) {
    let db = await listDBPokemons();
    return { db };
  }
  let api = await listApiPokemons();
  let db = await listDBPokemons();
  return { api, db };
}

module.exports = {
  listPokemons,
};
