const { Pokemon, Type } = require('../../../db.js');
const { getAllPokemonsDB } = require('./getAllPokemonsDB.js');

async function searchNameDB (name) {
	let data = await getAllPokemonsDB();
	let pokemonName = data.filter( pok => pok.name === name);
	if(pokemonName.length === 0) return false;
	return true;
}

module.exports = {
	searchNameDB
}