import React from 'react'; //listo y con estilos
import NavBar from '../NavBar/NavBar.js';
import Loading from '../Loading/Loading.js';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonDetail, cleanDetail } from '../../redux/actions/index.js';
import { useHistory } from 'react-router-dom';
import './DetailPokemon.css';

const DetailPokemon = (props) => {
	const dispatch = useDispatch();
	const id = props.match.params.id;
	const history = useHistory();

	React.useEffect(() => {
		dispatch(getPokemonDetail(id));
	}, [dispatch, id]);

	const details = useSelector( state => state.dataPokemonDetails);

	return details.hasOwnProperty('Error') ?
		(<div className='DP-container'>
			<NavBar />
			<div className='DP-container-details' style={{height: '550px'}}>
				<h1 style={{'text-align': 'center'}}>{details.Error}</h1>
				<button onClick={() => history.goBack()} className='DP-button'>Back</button>
			</div>
		</div>) :

		Object.entries(details).length > 0 ?
		
		(	<div className='DP-container'>
				<NavBar />
				<div className='DP-container-details'>
					<img src={details.image} alt={details.name} className={details.api ? 'DP-image' : 'DP-image pro'} />
					<h1 style={{margin: '10px'}}>{details.name.toUpperCase()}</h1>
					<div className='DP-container-types'>
						<h3 style={{margin: '10px'}}>TYPES</h3>
						<ul className='DP-list-types'>
							{details.types.map( (type, index) => 
								<li key={index} className='DP-items-list-types' >{type.toUpperCase()}</li>
							)}
						</ul>
					</div>
					<div className='DP-container-stats'>
						<h3 style={{margin: '10px'}}>STATS</h3>
						<ul className='DP-list-stats'>
							<li style={{margin: '2px 0 2px 0'}}>{`HP: ${details.hp}`}</li>
							<li style={{margin: '2px 0 2px 0'}}>{`ATTACK: ${details.attack}`}</li>
							<li style={{margin: '2px 0 2px 0'}}>{`DEFENSE: ${details.defense}`}</li>
							<li style={{margin: '2px 0 2px 0'}}>{`SPEED: ${details.speed}`}</li>
							<li style={{margin: '2px 0 2px 0'}}>{`HEIGHT: ${details.height}`}</li>
							<li style={{margin: '2px 0 2px 0'}}>{`WEIGHT: ${details.weight}`}</li>
						</ul>	
					</div>
					<div>
						<button onClick={() => {
							dispatch(cleanDetail())
							history.goBack()}
						} 
						className='DP-button'>
							Back
						</button>
					</div>
				</div>
			</div> ) :
		( <Loading />)
}

export default DetailPokemon;