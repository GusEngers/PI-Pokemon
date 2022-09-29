const { Pokemon, Type } = require('../../../db.js');

async function getAllPokemonsDB () {
	let listData = await Pokemon.findAll({
		include: {
			model: Type,
			attributes: ['name']
		}
	})
	const listAll = listData.map( pok => {
		return {
			id: pok.id,
			name: pok.name,
			image: pok.image,
			types: pok.types.map( typ => typ.name),
			hp: pok.hp,
			attack: pok.attack,
			defense: pok.defense,
			speed: pok.speed,
			height: pok.height,
			weight: pok.weight
		}
	})

	return listAll;
}

module.exports = {
	getAllPokemonsDB
}