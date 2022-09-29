const axios = require('axios');
const { Pokemon, Type } = require('../../db.js');

async function pokemonById (id) {
	let idPars = id.split("-")
	if(idPars.length === 1) {
		if(id > 40) {
			throw new Error(`There is no information about the pokemon`)
		}

		let idDataAPI =
			await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
			.then( d => {
			 	return ({
			 		id: d.data.id,
					name: d.data.name,
					image: d.data.sprites.front_default,
					types: d.data.types.map( typ => typ.type.name),
					hp: d.data.stats[0].base_stat,
					attack: d.data.stats[1].base_stat,
					defense: d.data.stats[2].base_stat,
					speed: d.data.stats[5].base_stat,
					height: d.data.height,
					weight: d.data.weight
			 	})
			})
			.catch( e => {
				throw new Error(`There is no information about the pokemon`)
			})
		return idDataAPI;
	}

	let idDataDB = await Pokemon.findByPk(id, {
		include: {
			model: Type,
			attributes: ['name']
		}
	});

	if(idDataDB === null) {
		throw new Error(`The pokemon does not exist`);
	}
	return {
		id: idDataDB.id,
		name: idDataDB.name,
		image: idDataDB.image,
		types: idDataDB.types.map( typ => typ.name),
		hp: idDataDB.hp,
		attack: idDataDB.attack,
		defense: idDataDB.defense,
		speed: idDataDB.speed,
		height: idDataDB.height,
		weight: idDataDB.weight
	}
}

module.exports = {
	pokemonById
}