const { listApiPokemons } = require('./api_functions/list_pokemons');
const { listDBPokemons } = require('./db_functions/list_pokemons');

/**
 * Obtiene los pokemons de la api y los que están alojados en la base de datos.
 * Si se incluye el parámetro 'mode' sólo se obtendrán los pokemons de la base de datos.
 * @param mode Sus posibles valores son 'undefined' o 'db', caso contrario retornará un error
 * @returns Objeto con dos propiedades 'api' y 'db', si existe 'mode' retornará un objeto con la propiedad 'db'
 */
async function listPokemons(mode) {
  if (mode && mode !== 'db')
    throw new Error("The 'mode' query can only have the value 'db'");
  if (mode === 'db') {
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
