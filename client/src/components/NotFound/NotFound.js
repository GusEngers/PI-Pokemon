import React from 'react'; //listo y con estilos
import { cleanFilters, cleanName, allPokemons } from '../../redux/actions/index.js'
import { useDispatch, useSelector } from 'react-redux';
import './NotFound.css';

const NotFound = ({setOrder}) => {
	const dataPokemons = useSelector( state => state.dataPokemons);
	const dataName = useSelector( state => state.dataName);
	const dispatch = useDispatch();

	const handleBack = event => {
		event.preventDefault();
		dispatch(cleanFilters());
		dispatch(cleanName());
		dispatch(allPokemons());
		setOrder('Back');
	}

	return typeof dataPokemons === 'string' ? 
	(
		<div className='NF-container'>
			<h1 className='NF-text'>{dataPokemons}</h1>
			<div>
				<button onClick={ event => handleBack(event)} className='NF-button'>Back</button>
			</div>
		</div>
	) :
	(
		<div className='NF-container'>
			<h1 className='NF-text'>{dataName}</h1>
			<div>
				<button onClick={ event => handleBack(event)} className='NF-button'>Back</button>
			</div>
		</div>
	)
}

export default NotFound;