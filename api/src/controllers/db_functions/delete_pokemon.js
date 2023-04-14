const { Pokemon } = require('../../db');

/**
 * Elimina el pokemon especificando su id
 * @param id ID del pokemon a eliminar
 * @returns Mensaje de éxito si el id proporcionado es válido y existe el pokemon - mensaje de error si el ID no es válido o el pokemon no existe
 */ 
async function deletePokemon(id) {
	if (!isNaN(id)) throw new Error('Invalid ID');
	let data = await Pokemon.destroy({ where: { id }});
	if (!data) throw new Error(`Pokemon with id ${id} not exists`);
	return 'Pokemon successfully removed';
}

module.exports = {
	deletePokemon,
};
