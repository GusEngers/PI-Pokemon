import React from 'react'; //listo y con estilos
import { useDispatch, useSelector } from 'react-redux';
import { 	getPokemonName,
					allPokemons,
					orderAlphabetical,
					orderAttack,
					orderOrigin,
					getTypes,
					orderTypes,
					cleanFilters,
					cleanName } from '../../redux/actions/index.js';
import './FilterBar.css';

const FilterBar = ({setCurrentPage, setOrder}) => {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState('');
	const dataTypes = useSelector( state => state.dataTypes);

	React.useEffect(() => {
		if(dataTypes.length === 0) {
			dispatch(getTypes())
		}
	}, [dispatch, dataTypes])

	const handleChange = event => {
		event.preventDefault();
		setValue(event.target.value)
	}

	const handleSubmit = event => {
		event.preventDefault();
		dispatch(getPokemonName(value));
		setValue('');
		setCurrentPage(1);
	}

	const handleOrigin = event => {
		dispatch(orderOrigin(event.target.value));
		setCurrentPage(1);
	}

	const handleAlpAtt = event => {
		if(event.target.value === 'A-Z' || event.target.value === 'Z-A') {
			dispatch(orderAlphabetical(event.target.value));
			setOrder(event.target.value)
			setCurrentPage(1);
		} else if(event.target.value === '-' || event.target.value === '+') {
			dispatch(orderAttack(event.target.value));
			setOrder(event.target.value)
			setCurrentPage(1);
		}
	}

	const handleClick = event => {
		event.preventDefault();
		dispatch(cleanFilters());
		dispatch(cleanName());
		dispatch(allPokemons());
		setValue('');
		setOrder('Refresh');
	}

	const handleTypes = event => {
		dispatch(orderTypes(event.target.value))
		setCurrentPage(1);
	}

	return (
		<div className='FB-container'>
			<div className='FB-container-search'>
				<form onSubmit={event => handleSubmit(event)}>
					<input
						type='text'
						placeholder='Search your pokemon'
						onChange={event => handleChange(event)}
						value={value}
						required
						className='FB-container-search-input'
					/>
					<input
						type='submit'
						value='Search'
						className='FB-container-search-button'
					/>
				</form>
			</div>
			<div className='FB-container-options'>
				<h1 className='FB-text'>Filters:</h1>
				<select onChange={ event => handleOrigin(event)} className='FB-container-origin'>
					<option value="all">All Pokemons</option>
					<option value="number">True Pokemons</option>
					<option value="string">Created Pokemons</option>
				</select>
				<select onChange={ event => handleAlpAtt(event)} className='FB-container-sorts'>
					<option value="">Sort by...</option>
					<option value="A-Z">A-Z</option>
					<option value="Z-A">Z-A</option>
					<option value="-">Attack -</option>
					<option value="+">Attack +</option>
				</select>
				<select onChange={event => handleTypes(event)} className='FB-container-types'>
					<option value="all">All Types</option>
					{ dataTypes.map( (type, index) => (
						<option value={type.name} key={index}>{type.name}</option>
					))}
				</select>
			</div>
			<div className='FB-container-refresh'>
				<button onClick={ event => handleClick(event) } className='FB-container-refresh-button'>REFRESH!</button>
			</div>
		</div>
	)
}

export default FilterBar;

