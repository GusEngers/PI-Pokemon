import React from 'react'; //listo y con estilos
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, allPokemons } from '../../redux/actions/index.js'
import Loading from '../Loading/Loading.js';
import NotFound from '../NotFound/NotFound.js';
import NavBar from '../NavBar/NavBar.js';
import FilterBar from '../FilterBar/FilterBar.js';
import Card from '../Card/Card.js';
import Paginated from '../Paginated/Paginated.js'
import './Home.css';

const Home = () => {
	const dispatch = useDispatch();
	const dataPokemons = useSelector( state => state.dataPokemons);
	const dataName = useSelector( state => state.dataName);
	const dataPokemonsSecurity = useSelector( state => state.dataPokemonsSecurity)
	const [currentPage, setCurrentPage] = React.useState(1);
	const allPokemonsByPage = currentPage * 12;
	const indexFirstPokemon = allPokemonsByPage - 12;
	const currentPokemons = dataPokemons.slice(indexFirstPokemon, allPokemonsByPage);
	const [order, setOrder] = React.useState('');
	
	const paginated = (numPage) => {
		setCurrentPage(numPage);
	}

	React.useEffect(() => {
		if(dataPokemonsSecurity.length === 0) {
			dispatch(getAllPokemons());
		}
	}, [dispatch, dataPokemonsSecurity])
	
	return (dataPokemons.length > 0 && typeof dataPokemons === 'string') || (dataName.length > 0 && typeof dataName === 'string') ?
					(	<div className='HM-container'>
							<NavBar />
							<FilterBar 
								setCurrentPage={setCurrentPage}
								setOrder={setOrder}
							/>
							<div className='HM-container'>
								<NotFound 
									setOrder={setOrder}
								/>
							</div>
							<Paginated 
									dataPokemons={dataPokemons}
									currentPage={currentPage}
									setCurrentPage={setCurrentPage}
									paginated={paginated}
								/>
						</div> ) :
					
					Object.entries(dataName).length !== 0 ?

					(	<div className='HM-container'>
							<NavBar />
							<FilterBar 
								setCurrentPage={setCurrentPage}
								setOrder={setOrder}
							/>
							<div className='HM-grid-container'>
									<Card 
										key={dataName.id}
										id={dataName.id}
										name={dataName.name}
										image={dataName.image}
										types={dataName.types}
									/>
							</div>
							<Paginated 
									dataPokemons={[dataName]}
									currentPage={currentPage}
									setCurrentPage={setCurrentPage}
									paginated={paginated}
								/>
						</div> ) :

				 dataPokemons.length > 0 && dataPokemons !== undefined ?
					
					(	<div className='HM-container'>
							<NavBar />
							<FilterBar 
								setCurrentPage={setCurrentPage}
								setOrder={setOrder}
							/>
							<div className='HM-grid-container'>
								{currentPokemons.map( pok => (
									<Card 
										key={pok.id}
										id={pok.id}
										name={pok.name}
										image={pok.image}
										types={pok.types}
									/>
								))}
							</div>
							<Paginated 
									dataPokemons={dataPokemons}
									currentPage={currentPage}
									setCurrentPage={setCurrentPage}
									paginated={paginated}
								/>
						</div> ) :
					( <Loading /> )
}

export default Home;