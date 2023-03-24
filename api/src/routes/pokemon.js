const { Router } = require('express');
const {
  getApiPokemon,
} = require('../controllers/api_functions/detail_pokemon');
const {
  listApiPokemons,
} = require('../controllers/api_functions/list_pokemons');

const router = Router();

// GET - Lista de pokemons
// POST - Crear pokemon
router
  .route('/')
  .get(async (req, res) => {
    try {
      let data = await listApiPokemons();
      res.json({ data });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      res.send('hola');
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

// GET - Detalle del pokemon
router.get('/:id', async (req, res) => {
  try {
    let data = await getApiPokemon(req.params.id);
    res.json({ data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;