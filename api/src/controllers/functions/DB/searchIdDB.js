const { Pokemon, Type } = require('../../../db.js');
const { getAllPokemonsDB } = require('./getAllPokemonsDB.js');

async function searchIdDB (id) {
	let data = await getAllPokemonsDB();
	let pokemonId = data.filter( pok => pok.id === id);
	if(pokemonId.length === 0) return false;
	return true;
}

module.exports = {
	searchIdDB
}