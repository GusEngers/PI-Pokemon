const axios = require('axios');

let URL_API = 'https://pokeapi.co/api/v2/pokemon';

async function getDataAPI (url) {
	let dataPokemonAPI = 
		await axios(url)
		.then( pd => pd.data)
		.catch( e => {
			throw new Error(`An error has occurred while fetching information from the url: ${URL_API}`)
		});
	
	return dataPokemonAPI;
}

async function getListPokemonsAPI (data) {
	let completeList = [];
	for(let i = 0; i < data.results.length; i++) {
		let dataPokemon = await axios(data.results[i]).then( d => {
				return({
					id: d.data.id,
					name: d.data.name,
					image: d.data.sprites.front_default,
					types: d.data.types.map( typ => typ.type.name),
					hp: d.data.stats[0].base_stat,
					attack: d.data.stats[1].base_stat,
					defense: d.data.stats[2].base_stat,
					speed: d.data.stats[5].base_stat,
					height: d.data.height,
					weight: d.data.weight
				});
			}).catch( e => {
			throw new Error(`An error occurred when trying to bring the list of pokemons`)
		})
		completeList.push(dataPokemon)
	}

	return completeList;
}

async function getAllPokemonsAPI () {
	try {
		let allPokemons = [];
		while(allPokemons.length < 40) {
			let getData = await getDataAPI(URL_API);
			let getList = await getListPokemonsAPI(getData);
			// await console.log(getData)
			if(getList[getList.length - 1].id === 40) {
				URL_API = 'https://pokeapi.co/api/v2/pokemon';
			}
			URL_API = getData.next;
			allPokemons = [...allPokemons, ...getList];
		}
		URL_API = 'https://pokeapi.co/api/v2/pokemon';
		return allPokemons;
	} catch (e) {
		URL_API = 'https://pokeapi.co/api/v2/pokemon';
		allPokemons = [];
		throw new Error(e.message)
	}
}

module.exports = {
	getAllPokemonsAPI
};