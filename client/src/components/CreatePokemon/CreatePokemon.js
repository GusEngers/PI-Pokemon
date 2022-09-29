import React from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar.js';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, cleanAll } from '../../redux/actions/index.js';
import Loading from '../Loading/Loading.js';
import { useHistory } from 'react-router-dom';
import './CreatePokemon.css';

const CreatePokemon = () => {
	const dispatch = useDispatch();
	const dataTypes = useSelector( state => state.dataTypes);
	const dataPokemons = useSelector( state => state.dataPokemonsSecurity.map( pokemon => pokemon.name.toLowerCase()));
	const history = useHistory();
	let validText = /^[a-zA-Z ]*$/
	let validStats = /^\d+$/
	const [errors, setErrors] = React.useState({})
	const [create, setCreate] = React.useState({
		name: '',
		image: 'https://image.pngaaa.com/552/1141552-middle.png',
		hp: '',
		attack: '',
		defense: '',
		speed: '',
		height: '',
		weight: '',
		types: []
	});

	React.useEffect(() => {
		if(dataTypes.length === 0) {
			dispatch(getTypes());
		}
	}, [dispatch, dataTypes])

	const handleSubmit = async (event) => {
		event.preventDefault();
		const crePoke = await axios.post('/pokemons', create)
										.then( d => alert(d.data))
										.catch( e => alert(e.response.data))
		dispatch(cleanAll());
		setCreate({
			name: '',
			image: 'https://image.pngaaa.com/552/1141552-middle.png',
			hp: '',
			attack: '',
			defense: '',
			speed: '',
			height: '',
			weight: '',
			types: []
		})
		history.push('/home');
		window.location.reload();
	}

	const handleChange = event => {
		event.preventDefault();
		setCreate({
			...create,
			[event.target.name]: event.target.value
		});
		setErrors(validate({
			...create,
			[event.target.name]: event.target.value
		}));
	}

	const handleChangeCheckbox = event => {
		if(event.target.checked) {
			setCreate({
				...create,
				types: [...create.types, event.target.value]
			})
			setErrors(validate({
				...create,
				types: event.target.value
			}))
		}
		if(!event.target.checked) {
			setCreate({
				...create,
				types: create.types.filter( typ => typ.name !== event.target.value)
			})
			setErrors(validate({
				...create,
				types: create.types.filter( typ => typ.name !== event.target.value)
			}))
		}
	}

	const validate = (create) => {
		let errors = {}

	/*------------[VALIDATE NAME]--------------------------------------------------*/

		if(create.name.length === 0) {
			errors.name = 'Please enter a name'
			return errors
		}
		if(dataPokemons.includes(create.name.toLowerCase())) {
			errors.name ='This name already exists'
			return errors
		}
		if(create.name.length > 10) {
			errors.name ='The name can only contain a maximum of 10 characters'
			return errors
		}
		if(!validText.test(create.name)) {
			errors.name = 'Enter only letters'
			return errors
		}

	/*-----------[VALIDATE HP]-------------------------------------------------------*/

		if(create.hp === 0) {
			errors.hp = 'Please enter a value'
			return errors
		}
		if(create.hp < 1 || create.hp > 200) {
			errors.hp ='HP can only be less than 200'
			return errors
		}
		if(!validStats.test(create.hp)) {
			errors.hp = 'The entered value must be a number'
			return errors
		}

	/*-----------[VALIDATE ATTACK]-------------------------------------------------------*/

		if(create.attack === 0) {
			errors.attack = 'Please enter a value'
			return errors
		}
		if(create.attack < 1 || create.attack > 200) {
			errors.attack = 'ATTACK can only be less than 200'
			return errors
		}
		if(!validStats.test(create.attack)) {
			errors.attack = 'The entered value must be a number'
			return errors
		}

	/*-----------[VALIDATE DEFENSE]-------------------------------------------------------*/

		if(create.defense === 0) {
			errors.defense = 'Please enter a value'
			return errors
		}
		if(create.defense < 1 || create.defense > 200) {
			errors.defense = 'DEFENSE can only be less than 200'
			return errors
		}
		if(!validStats.test(create.defense)) {
			errors.defense = 'The entered value must be a number'
			return errors
		}

	/*-----------[VALIDATE SPEED]-------------------------------------------------------*/

		if(create.speed === 0) {
			errors.speed = 'Please enter a value'
			return errors
		}
		if(create.speed < 1 || create.speed > 150) {
			errors.speed = 'SPEED can only be less than 150'
			return errors
		}
		if(!validStats.test(create.speed)) {
			errors.speed = 'The entered value must be a number'
			return errors
		}

	/*-----------[VALIDATE WEIGHT]-------------------------------------------------------*/

		if(create.weight === 0) {
			errors.weight = 'Please enter a value'
			return errors
		}
		if(create.weight < 1 || create.weight > 3000) {
			errors.weight = 'WEIGHT can only be less than 3000'
			return errors
		}
		if(!validStats.test(create.weight)) {
			errors.weight = 'The entered value must be a number'
			return errors
		}

	/*-----------[VALIDATE HEIGHT]-------------------------------------------------------*/

		if(create.height === 0) {
			errors.height = 'Please enter a value'
			return errors
		}
		if(create.height < 1 || create.height > 2000) {
			errors.height = 'HEIGHT can only be less than 2000'
			return errors
		}
		if(!validStats.test(create.height)) {
			errors.height = 'The entered value must be a number'
			return errors
		}

	/*-----------[VALIDATE TYPES]-------------------------------------------------------*/

		if(create.types.length === 0) {
			errors.types = 'Choose between one and three types'
			return errors
		}
		if(create.types.length > 3) {
			errors.types = 'You can only choose three types'
			return errors
		}

	/*-----------[DEFAULT]-------------------------------------------------------*/

		return errors
	}
	

	return dataTypes.length === 0 ?
				( <Loading /> ) :
				(	
					<div className='CP-container'>
						<NavBar />
						<form onSubmit={ event => handleSubmit(event)} className='CP-form'>
							<h1 className='CP-title'>CREATE YOUR POKEMON!!</h1>
							<div className='CP-name-container'>
								<label>NAME: </label>
								<input 
									type='text'
									name='name'
									value={create.name}
									placeholder='Name pokemon...'
									onChange={ event => handleChange(event)}
									className='FB-container-search-input'
								/>
								{ errors.name ?
									<span className='error-text'>{errors.name}</span> :
									<span className='ok-text'>OK</span>
								}
							</div>
							<div className='CP-hp-container'>
								<label>HP: </label>
								<input 
									type='number'
									name='hp'
									value={create.hp}
									placeholder='HP pokemon...'
									onChange={ event => handleChange(event)}
									className='FB-container-search-input'
								/>
								{ errors.hp ?
									<span className='error-text'>{errors.hp}</span> :
									<span className='ok-text'>OK</span>
								}
							</div>
							<div className='CP-attack-container'>
								<label>ATTACK: </label>
								<input 
									type='number'
									name='attack'
									value={create.attack}
									placeholder='ATTACK pokemon...'
									onChange={ event => handleChange(event)}
									className='FB-container-search-input'
								/>
								{ errors.attack ?
									<span className='error-text'>{errors.attack}</span> :
									<span className='ok-text'>OK</span>
								}
							</div>
							<div className='CP-defense-container'>
								<label>DEFENSE: </label>
								<input 
									type='number'
									name='defense'
									value={create.defense}
									placeholder='DEFENSE pokemon...'
									onChange={ event => handleChange(event)}
									className='FB-container-search-input'
								/>
								{ errors.defense ?
									<span className='error-text'>{errors.defense}</span> :
									<span className='ok-text'>OK</span>
								}
							</div>
							<div  className='CP-speed-container'>
								<label>SPEED: </label>
								<input 
									type='number'
									name='speed'
									value={create.speed}
									placeholder='SPEED pokemon...'
									onChange={ event => handleChange(event)}
									className='FB-container-search-input'
								/>
								{ errors.speed ?
									<span className='error-text'>{errors.speed}</span> :
									<span className='ok-text'>OK</span>
								}
							</div>
							<div className='CP-height-container'>
								<label>HEIGHT: </label>
								<input 
									type='number'
									name='height'
									value={create.height}
									placeholder='HEIGHT pokemon...'
									onChange={ event => handleChange(event)}
									className='FB-container-search-input'
								/>
								{ errors.height ?
									<span className='error-text'>{errors.height}</span> :
									<span className='ok-text'>OK</span>
								}
							</div>
							<div className='CP-weight-container'>
								<label>WEIGHT: </label>
								<input 
									type='number'
									name='weight'
									value={create.weight}
									placeholder='WEIGHT pokemon...'
									onChange={ event => handleChange(event)}
									className='FB-container-search-input'
								/>
								{ errors.weight ?
									<span className='error-text'>{errors.weight}</span> :
									<span className='ok-text'>OK</span>
								}
							</div>
							<div className='CP-types-container'>
								<label>TYPES: </label>
								<div className='CP-types'>
									{ dataTypes.map( (type, index) => (
									<div key={type.name} className='CP-types-type'>
										<input 
											type='checkbox'
											name={type.name}
											value={type.id}
											id={type.id}
											onChange={event => handleChangeCheckbox(event)}
										/>
										<label>{type.name.toUpperCase()}</label>
									</div>
									))}
								</div>
								{	errors.types ? 
									<span className='error-text'>{errors.types}</span> :
									<span className='ok-text'>OK</span>
								}
							</div>
							<div className='CP-buttons'>
							{ Object.entries(errors).length > 0 || create.name.length === 0 || create.types.length > 3 ?
								<input type="submit" value='CREATE' disabled  className='error-button'/> :
								<input type="submit"  value='CREATE' className='DP-button'/>
							}
							</div>	
						</form>
					</div> )
}

export default CreatePokemon;
