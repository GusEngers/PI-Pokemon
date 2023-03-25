const { default: axios } = require('axios');
const { Pokemon } = require('../../db');
const URL_API = 'https://pokeapi.co/api/v2/pokemon/';

/**
 * Verifica si el ID ingresado es válido (no existe en la base de datos)
 * @param id ID a evaluar
 * @returns true si el ID es válido - false si no lo es
 */
async function validateID(id) {
  let pokemon = await Pokemon.findByPk(id);
  if (!pokemon) return true;
  return false;
}

/**
 * Verifica si el nombre ingresado es válido (no existe en la base de datos ni en la api)
 * @param name Nombre a evaluar
 * @returns true si el nombre es válido - false si no lo es
 */
async function validateName(name) {
  let db = await Pokemon.findOne({ where: { name } });
  let api = await axios
    .get(`${URL_API}${name}`)
    .then((d) => false)
    .catch((e) => true);
  if (!db && api) return true;
  return false;
}

let _idcount = 1;
/**
 * Crea un nuevo pokemon en la base de datos con los datos recibidos
 * @param body Objeto con dos propiedades: data (información del pokemon) y types (lista con los tipos)
 * @returns Mensaje de éxito si se completa correctamente, mensaje de error si utilizan un nombre ya usado, volver a ejecutar la función si ya existe el id
 */
async function createPokemon(body) {
  let _id = `${_idcount}-pro`;
  if (!(await validateName(body.data.name.toLowerCase())))
    throw new Error(`Pokemon with name ${body.data.name} already exists!`);
  if (await validateID(_id)) {
    body.data.name = body.data.name.toLowerCase();
    let pokemon = await Pokemon.create({ ...body.data, id: _id });
    await pokemon.setTypes(body.types);
    _idcount++;
    return `Pokemon with name ${body.data.name} sucessfully created!`;
  }
  _idcount++;
  return createPokemon(body);
}

module.exports = {
  createPokemon,
};
