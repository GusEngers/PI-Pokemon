const { Router } = require('express');
const {
  getApiPokemon,
} = require('../controllers/api_functions/detail_pokemon');
const { createPokemon } = require('../controllers/db_functions/create_pokemon');
const { listPokemons } = require('../controllers/list_pokemons');

const router = Router();

// GET - Lista de todos los pokemons
// GET & query 'mode=db' - Lista de todos los pokemons de la base de datos
// GET & query 'name' - Pokemon por nombre
// POST - Crear pokemon
router
  .route('/')
  .get(async (req, res) => {
    try {
      if (!req.query.name) {
        let data = await listPokemons(req.query.mode);
        return res.json({ data });
      }
      let data = await getApiPokemon(req.query.name);
      res.json({ data });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      let data = await createPokemon(req.body);
      res.status(201).json({ data });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

// GET - Detalle del pokemon
router.get('/:id', async (req, res) => {
  try {
    if (isNaN(req.params.id)) throw new Error('The id must be a number');
    let data = await getApiPokemon(req.params.id);
    res.json({ data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
