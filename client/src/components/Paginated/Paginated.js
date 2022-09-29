import React from 'react'; //listo y con estilos
import './Paginated.css';

const Paginated = ({dataPokemons, currentPage, setCurrentPage, paginated}) => {
	const numPages = [];
	let maxPages = Math.ceil((dataPokemons.length) / 12);

	for (let i = 0; i < maxPages; i++) {
		numPages.push(i + 1);
	}

	const prevPage = () => {
		setCurrentPage(currentPage - 1);
	}

	const nextPage = () => {
		setCurrentPage(currentPage + 1);
	}

	return (
		<div className='PG-container'>
			<ul className='PG-list-container'>
				<li>
					<button onClick={prevPage} disabled={currentPage <= 1} className='PG-button-prev'>←</button>
				</li>
				{ numPages && numPages.map( num => (
					<li key={num}>
						<button onClick={() => paginated(num)} className={`PG-button-number ${currentPage === num ? 'active' : 'not-active'}`}>{num}</button>
					</li>
				))}
				<li>
					<button onClick={nextPage} disabled={currentPage >= maxPages} className='PG-button-next'>→</button>
				</li>
			</ul>
		</div>
	)
}

export default Paginated;