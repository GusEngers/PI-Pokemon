import axios from 'axios';

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_POKEMON_NAME = 'GET_POKEMON_NAME';
export const ALL_POKEMONS = 'ALL_POKEMONS';
export const GET_POKEMON_DETAIL = 'GET_POKEMON_DETAIL';
export const ORDER_ALPHABETICAL = 'ORDER_ALPHABETICAL';
export const ORDER_ATTACK = 'ORDER_ATTACK';
export const ORDER_ORIGIN = 'ORDER_ORIGIN';
export const GET_TYPES = 'GET_TYPES';
export const ORDER_TYPES = 'ORDER_TYPES';
export const CLEAN_FILTERS = 'CLEAN_FILTERS';
export const CLEAN_NAME = 'CLEAN_NAME';
export const CLEAN_ALL = 'CLEAN_ALL';
export const CLEAN_DETAIL = 'CLEAN_DETAIL';

export const getAllPokemons = () => async (dispatch) => {
	try {
		let response = await axios('/pokemons')
		.then( d => d.data )
		dispatch({
				type: GET_ALL_POKEMONS,
				payload: response
			})
	} catch (e) {
		alert(e.response.data)
		window.locate.reload()
	}
}

export const getPokemonName = (name) => async (dispatch) => {
	try {
		let response = await axios(`/pokemons?name=${name}`)
		.then( d => d.data )
		dispatch({
				type: GET_POKEMON_NAME,
				payload: response
			})
	} catch (e) {
		dispatch({
			type: GET_POKEMON_NAME,
			payload: e.response.data
		})
	}
}

export const allPokemons = () => {
	return {
		type: ALL_POKEMONS
	}
}

export const getPokemonDetail = (id) => async (dispatch) => {
	try {
		let response = await axios(`/pokemons/${id}`)
		.then( d => d.data )
		dispatch({
				type: GET_POKEMON_DETAIL,
				payload: response
			})
	} catch (e) {
		dispatch({
				type: GET_POKEMON_DETAIL,
				payload: {Error: e.response.data}
			})
	}
}

export const orderAlphabetical = (order) => {
	return {
		type: ORDER_ALPHABETICAL,
		payload: order
	}
}

export const orderAttack = (attack) => {
	return {
		type: ORDER_ATTACK,
		payload: attack
	}
}

export const orderOrigin = (origin) => async (dispatch) => {
	try {
		if(origin === "all") {
			return {
				type: ORDER_ORIGIN,
				payload: origin
			};
		}
		let response = await axios(`/pokemons/origin?status=${origin}`).then(d => d.data);
		dispatch({
			type: ORDER_ORIGIN,
			payload: response
		})
	} catch (error) {
		console.log(error)
	}
}

export const getTypes = () => async (dispatch) => {
	try {
		let response = await axios('/types')
		.then( d => d.data )
		dispatch({
				type: GET_TYPES,
				payload: response
			})
	} catch (e) {
		console.log(e)
	}
}

export const orderTypes = (type) => {
	return {
		type: ORDER_TYPES,
		payload: type
	}
}

export const cleanFilters = () => {
	return {
		type: CLEAN_FILTERS,
		payload: []
	}
}

export const cleanName = () => {
	return {
		type: CLEAN_NAME,
		payload: {}
	}
}

export const cleanAll = () => {
	return {
		type: CLEAN_ALL,
		payload: []
	}
}

export const cleanDetail = () => {
	return {
		type: CLEAN_DETAIL,
		payload: {}
	}
}