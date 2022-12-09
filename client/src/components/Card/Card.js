import React from 'react'; //listo y con estilos
import { Link } from 'react-router-dom';
import './Card.css';

const Card = props => {
	return (
		<div className={`CR-container ${typeof props.id === 'number' ? 'original' : 'created'}`}>
			<Link to={`/pokemons/${props.id}`} className='CR-link' style={{textDecoration: 'none'}}>
				<img src={props.image} alt={props.name} className={`${typeof props.id === 'string' ? 'CR-image special' : 'CR-image'}`} />
				<h1 className='CR-name'>{props.name.toUpperCase()}</h1>
				<div className='CR-list-div'>
					<ul className='CR-list-container' >
						{props.types.map( (type, index) => 
						<li key={index} className='CR-list' >{type.toUpperCase()}</li>
					)}
					</ul>
				</div>
				
			</Link>
		</div>
	)
}

export default Card;