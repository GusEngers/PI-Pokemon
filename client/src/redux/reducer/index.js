import {	GET_ALL_POKEMONS,
					GET_POKEMON_NAME,
					ALL_POKEMONS,
					GET_POKEMON_DETAIL,
					ORDER_ALPHABETICAL,
					ORDER_ATTACK,
					ORDER_ORIGIN,
					GET_TYPES,
					ORDER_TYPES,
					CLEAN_FILTERS,
					CLEAN_NAME,
					CLEAN_ALL,
					CLEAN_DETAIL } from '../actions/index.js';

const initialState = {
	dataPokemonsSecurity: [],
	dataPokemons: [],
	dataName: {},
	dataPokemonDetails: {},
	dataTypes: []
}; 

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_POKEMONS:
			return {
				...state,
				dataPokemonsSecurity: action.payload,
				dataPokemons: action.payload
			}
		case GET_POKEMON_NAME:
			return {
				...state,
				dataName: action.payload
			}
		case ALL_POKEMONS:
			return {
				...state,
				dataPokemons: [...state.dataPokemonsSecurity]
			}
		case GET_POKEMON_DETAIL:
			return {
				...state,
				dataPokemonDetails: action.payload
			}
		case ORDER_ALPHABETICAL:
			return {
				...state,
				dataPokemons: state.dataPokemons.sort( (a, b) => {
					if(action.payload === 'A-Z') {
						if(a.name < b.name) return -1;
						if(b.name < a.name) return 1;
						return 0;
					} else {
						if(b.name < a.name) return -1;
						if(a.name < b.name) return 1;
						return 0;
					}
				})
			}
		case ORDER_ATTACK:
			return {
				...state,
				dataPokemons: state.dataPokemons.sort( (a, b) => {
					if(action.payload === '-') {
						if(a.attack < b.attack) return -1;
						if(b.attack < a.attack) return 1;
						return 0;
					} else {
						if(b.attack < a.attack) return -1;
						if(a.attack < b.attack) return 1;
						return 0;
					}
				})
			}
		case ORDER_ORIGIN:
			const copyPokemonsOrigin = state.dataPokemonsSecurity;
			const filterPokemons = copyPokemonsOrigin.filter( origin => {
				return typeof origin.id === action.payload
			})
			return {
				...state,
				dataPokemons: action.payload === 'all' ? copyPokemonsOrigin :
											 filterPokemons.length === 0 ? 'Not Found :(' :
											 filterPokemons
			}
		case GET_TYPES:
			return {
				...state,
				dataTypes: action.payload
			}
		case ORDER_TYPES:
			const copyPokemonsTypes = state.dataPokemonsSecurity;
			const filterTypes = copyPokemonsTypes.filter( type => {
				return type.types.includes(action.payload)
			})
			return {
				...state,
				dataPokemons: action.payload === 'all' ? copyPokemonsTypes :
											 filterTypes.length === 0 ? 'Not Found :(' :
											 filterTypes
			}
		case CLEAN_FILTERS:
			return {
				...state,
				dataPokemons: action.payload
			}
		case CLEAN_NAME:
			return {
				...state,
				dataName: action.payload
			}
		case CLEAN_ALL:
			return {
				...state,
				dataPokemonsSecurity: action.payload
			}
		case CLEAN_DETAIL:
			return {
				...state,
				dataPokemonDetails: action.payload
			}
		default:
			return {...state}
	}
}

export default rootReducer;