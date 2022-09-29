const { getAllPokemonsAPI } = require('./functions/API/getAllPokemonsAPI.js')
const { getAllPokemonsDB } = require('./functions/DB/getAllPokemonsDB.js')
const { pokemonByName } = require('./functions/pokemonByName.js');
const { createPokemon } = require('./create/createPokemon.js');
const { pokemonById } = require('./functions/pokemonById.js');

module.exports = {
	getAllPokemonsAPI,
	getAllPokemonsDB,
	pokemonByName,
	createPokemon,
	pokemonById
}