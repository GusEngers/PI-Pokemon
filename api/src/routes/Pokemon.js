const { Router } = require('express');
const { Pokemon, Type } = require('../db.js');
const { getAllPokemonsAPI,
				getAllPokemonsDB,
				createPokemon,
				pokemonByName,
				pokemonById } = require('../controllers/index.js');

const router = Router();

router.get('/', async (req, res) => {
	try {
		const { name } = req.query;
		if(name) {
			let information = await pokemonByName(name);
			return res.json(information);
		}
		let pokemonsAPI = await getAllPokemonsAPI();
		let pokemonsDB = await getAllPokemonsDB();
		let pokemons = [...pokemonsAPI, ...pokemonsDB]
		return res.json(pokemons);
	} catch (e) {
		if(e.message.includes("An error has occurred while fetching information from the url")) {
			return res.status(504).json(e.message);
		} else {
			return res.status(404).json(e.message);
		}
	}
})

router.post('/', async (req, res) => {
	try {
		const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;
		let create = await createPokemon(name, image, hp, attack, defense, speed, height, weight, types);
		res.status(201).json(create);
	} catch (e) {
		res.status(404).json(e.message)
	}
})

router.get('/:idPokemon', async (req, res) => {
	try {
		const { idPokemon } = req.params;
		let dataPokemon = await pokemonById(idPokemon);
		res.json(dataPokemon);
	} catch (e) {
		res.status(404).json(e.message);
	}
})


module.exports = router