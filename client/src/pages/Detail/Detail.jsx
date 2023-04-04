import React from 'react';
import DetailPokemon from '../../components/DetailPokemon/DetailPokemon';
import NavBar from '../../components/Bars/NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { cleaningPokemon, obtainedIdPokemon } from '../../redux/actions';
import { useParams } from 'react-router-dom';

export default function Detail() {
  const dispatch = useDispatch();
  const { pokemon, error, loading } = useSelector((state) => state);
  const { id } = useParams();

  React.useEffect(() => {
    if (!Object.entries(pokemon).length) {
      dispatch(obtainedIdPokemon(id));
    }
    return () => dispatch(cleaningPokemon());
  }, []);

  if (loading) return <h1>Cargando detalle</h1>;
  if (!!error) return <h1>{error}</h1>;
  return (
    <>
      <NavBar />
      <DetailPokemon
        id={pokemon.id}
        name={pokemon.name}
        image={pokemon.image}
        types={pokemon.types}
        hp={pokemon.hp}
        attack={pokemon.attack}
        defense={pokemon.defense}
        speed={pokemon.speed}
        height={pokemon.height}
        weight={pokemon.weight}
      />
    </>
  );
}
/*
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.loading = true;
  }

  componentDidMount() {
    if (!Object.entries(this.props.pokemon).length) {
      this.props.obtainedIdPokemon(this.props.params.id);
    }
  }
  componentDidUpdate() {
    if (!!Object.entries(this.props.pokemon).length) {
      this.loading = this.props.loading;
    }
  }
  componentWillUnmount() {
    this.props.cleaningPokemon();
    this.props.changedLoading();
  }

  render() {
    if (this.loading) {
      return <h1>Cargando DETALLE</h1>;
    } else if (!!this.props.error) {
      return <h1>{this.props.error}</h1>;
    } else {
      return (
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
          <NavBar />
          <DetailPokemon
            id={this.props.pokemon.id}
            name={this.props.pokemon.name}
            image={this.props.pokemon.image}
            types={this.props.pokemon.types}
            hp={this.props.pokemon.hp}
            attack={this.props.pokemon.attack}
            defense={this.props.pokemon.defense}
            speed={this.props.pokemon.speed}
            height={this.props.pokemon.height}
            weight={this.props.pokemon.weight}
          />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    pokemon: state.pokemon,
    loading: state.loading,
    error: state.error,
  };
}

export default connect(mapStateToProps, {
  obtainedIdPokemon,
  cleaningPokemon,
  changedLoading,
})(withRouter(Detail));
*/
