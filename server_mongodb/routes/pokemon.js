const { Router } = require('express');
const router = Router();
const Pokemon = require('../models/pokemon.js');

router.get('/', async (req, res) => {
	try {
		let confirm = await Pokemon.find();
		res.json(confirm);
	} catch (error) {
		res.status(404).json({Error: error.message});
	}
});

router.post('/', async (req, res) => {
	try {
		let data = await Pokemon.findOne({name: req.body.name});
		if(!data){ 
			let confirm = new Pokemon(req.body);
			let created = await confirm.save();
			return res.status(201).json('Pokemon successfully created!!');
		}
		throw new Error('The Pokemon already exists!!');
	} catch (error) {
		res.status(400).json({Error: error.message});
	}
});

router.get('/origin', async (req, res) => {
	const { status } = req.query;
	try {
		if(Number(status) === 1) {
			let data = await Pokemon.find({api: true});
			res.json(data);
		};
		if(Number(status) === 0) {
			let data = await Pokemon.find({api: false});
			res.json(data);
		};
	} catch (error) {
		res.status(400).json({ Error: error.message});
	};
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		let confirm = await Pokemon.findById(id);
		if(!confirm) throw new Error('The pokemon does not exist!!');
		res.json(confirm);
	} catch (error) {
		res.status(404).json({Error: error.message});
	}
});

module.exports = router;