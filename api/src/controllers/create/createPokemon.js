const { Pokemon, Type } = require('../../db.js');
const { searchIdDB } = require('../functions/DB/searchIdDB.js');
const { searchNameDB } = require('../functions/DB/searchNameDB.js');

let countId = 1;

async function createPokemon (name, image, hp, attack, defense, speed, height, weight, types) {
	let id = `${countId}-pro`;

	if (await searchIdDB(id)) {
		countId++;
		return createPokemon(name, image, hp, attack, defense, speed, height, weight, types);
	}
	if (await searchNameDB(name)) {
		throw new Error(`The pokemon with the name ${name} already exists`);
	}

	let newPokemon = await Pokemon.create({
		id,
		name: name.toLowerCase(),
		image,
		hp,
		attack,
		defense,
		speed,
		height,
		weight
	});
	countId++;

	await newPokemon.setTypes(types);
	return `${name} successfully created`;
}

module.exports = {
	createPokemon
}

