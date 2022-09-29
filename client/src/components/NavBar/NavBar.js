import React from 'react'; //listo y con estilos
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
	return (
		<div className='NB-container'>
			<div className='NB-pokemon-container'>
				<Link to='/' style={{textDecoration: 'none'}}>
					<button className='NB-button'>
						POKEMON
					</button>
				</Link>
			</div>
			<div className='NB-hom-cre-container'>
				<Link to='/home' style={{textDecoration: 'none'}}>
					<button className='NB-button'>
						Home	
					</button>
				</Link>
				<Link to='/create' style={{textDecoration: 'none'}}>
					<button className='NB-button'>
						Create
					</button>
				</Link>
			</div>
		</div>
	)
}

export default NavBar;