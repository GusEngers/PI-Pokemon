const axios = require('axios');
const { Pokemon, Type } = require('../../db.js');
const { getAllPokemonsDB } = require('./DB/getAllPokemonsDB.js')

async function pokemonByName(name) {
	let pokeNameDB = await Pokemon.findAll({
		where: {
			name: name.toLowerCase()
		},
		include: {
			model: Type,
			attributes: ['name']
		}
	})

	if(pokeNameDB.length !== 0) {
		console.log("entre al if")
		return {
			id: pokeNameDB[0].dataValues.id,
			name: pokeNameDB[0].dataValues.name,
			image: pokeNameDB[0].dataValues.image,
			types: pokeNameDB[0].dataValues.types.map( typ => typ.name)
		}
	}

	let pokeNameAPI = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`)
													.then( d => d.data)
													.catch( e => {throw new Error(`The pokemon with the name ${name} does not exist`)});
	if(pokeNameAPI.hasOwnProperty('name')) {
		if(pokeNameAPI.id <= 40) {
			return {
				id: pokeNameAPI.id,
				name: pokeNameAPI.name,
				image: pokeNameAPI.sprites.front_default,
				types: pokeNameAPI.types.map( typ => typ.type.name)
			}
		}
		throw new Error(`There is no information about the pokemon with the name ${name}`);
	}
	
}

module.exports = {
	pokemonByName
}