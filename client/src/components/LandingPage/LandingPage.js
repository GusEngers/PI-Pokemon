import React from 'react'; //listo y con estilos
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {

	return (
		<div className='LP-container'>
			<h1 className='LP-title'>PokeApp</h1>
			<Link to='/home'>
				<button className='LP-button'>Gotta catch them all!</button>
			</Link>
		</div>
	)
}

export default LandingPage;