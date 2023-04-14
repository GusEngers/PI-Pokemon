const { Router } = require('express');
const { createPokemon } = require('../controllers/db_functions/create_pokemon');
const { idPokemon } = require('../controllers/id_pokemon');
const { listPokemons } = require('../controllers/list_pokemons');
const { namePokemon } = require('../controllers/name_pokemon');

const router = Router();

// GET - Lista de todos los pokemons
// GET & query 'name' - Pokemon por nombre
// POST - Crear pokemon
router
  .route('/')
  .get(async (req, res) => {
    try {
      if (!req.query.name) {
        let data = await listPokemons();
        return res.json({ data });
      }
      let data = await namePokemon(req.query.name);
      res.json({ data });
    } catch (error) {
      res.status(404).send(error.message);
    }
  })
  .post(async (req, res) => {
    try {
      let data = await createPokemon(req.body);
      res.status(201).json({ data });
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

// GET - Lista con todos los pokemones existentes en la base de datos
router.get('/db', async (req, res) => {
  try {
    let data = await listPokemons(true);
    return res.json({ data });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// GET - Detalle del pokemon
router.get('/:id', async (req, res) => {
  try {
    let data = await idPokemon(req.params.id);
    res.json({ data });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
