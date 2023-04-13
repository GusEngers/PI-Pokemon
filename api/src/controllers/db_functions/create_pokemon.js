const axios = require('axios');
const { Pokemon, Count } = require('../../db');
const URL_API = 'https://pokeapi.co/api/v2/pokemon/';

/**
 * Genera un ID único y válido para el nuevo pokemon
 * @returns ID en formato string
 */
async function generateID() {
  let count = await Count.findOne({ where: { prefix: 'pro' } });
  if(!count) {
    let query = await Count.create()
    return `${query.count}-${query.prefix}`
  }
  await Count.update({ count: count.count + 1 }, { where: { prefix: 'pro' }});
  return `${count.count + 1}-${count.prefix}`
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

/**
 * Crea un nuevo pokemon en la base de datos con los datos recibidos
 * @param body Objeto con dos propiedades: data (información del pokemon) y types (lista con los tipos)
 * @returns Mensaje de éxito si se completa correctamente, mensaje de error si utilizan un nombre ya usado, volver a ejecutar la función si ya existe el id
 */
async function createPokemon(body) {
  let { name } = body.data;
  if (!(await validateName(name.toLowerCase()))) {
    throw new Error(`Pokemon with name ${name} already exists!`);
  };
  
  body.data.name = body.data.name.toLowerCase();
  let pokemon = await Pokemon.create({ ...body.data, id: await generateID() });
  await pokemon.setTypes(body.types);
  return `Pokemon with name ${name} sucessfully created!`;
}

module.exports = {
  createPokemon,
};
