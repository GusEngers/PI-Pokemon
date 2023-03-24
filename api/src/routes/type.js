const { Router } = require('express');
const { listApiTypes } = require('../controllers/api_functions/list_types');

const router = Router();

// GET - Lista de tipos de pokemons
router.get('/', async (req, res) => {
  try {
    let data = await listApiTypes();
    res.json({ data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
