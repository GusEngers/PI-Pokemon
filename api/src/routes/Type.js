const { Router } = require('express');
const { Pokemon, Type } = require('../db.js');
const axios = require('axios');

const router = Router();

router.get('/', async (req, res) => {
	try {
		let typesDB = await Type.findAll();
		if(typesDB.length === 0) {
			let typesAPI =
			 await axios('https://pokeapi.co/api/v2/type')
			 .then( d => d.data.results)
			 .catch( e => {
			 		throw new Error(`An error has occurred while fetching information from the url: https://pokeapi.co/api/v2/type`)
			 })

			for(let i = 0; i < typesAPI.length; i++) {
				if(typesAPI[i].name === 'unknown') {
					continue;
				}
				await Type.create({
					name: typesAPI[i].name
				})
			}
			typesDB = await Type.findAll();
			return res.json(typesDB);
		}

		return res.json(typesDB);
	} catch (e) {
		console.log(e)
		res.status(404).json(e.message);
	}
})

module.exports = router;