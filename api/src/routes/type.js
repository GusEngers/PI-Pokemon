const { Router } = require('express');
const { listTypes } = require('../controllers/db_functions/list_types');

const router = Router();

// GET - Lista de tipos de pokemons
router.get('/', async (req, res) => {
  try {
    let data = await listTypes();
    res.json({ data });
  } catch (error) {
    res.status(404).send(error.response.data);
  }
});

module.exports = router;
