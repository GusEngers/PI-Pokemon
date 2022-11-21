const { Router } = require('express');
const router = Router();
const Type = require('../models/type.js');

router.get('/', async (req, res) => {
	try {
		const data = await Type.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({Error: error.message});
	}
});

module.exports = router;
