import React from 'react';
import withRouter from '../../components/WithRouter/WithRouter';
import DetailPokemon from '../../components/DetailPokemon/DetailPokemon';
import NavBar from '../../components/Bars/NavBar/NavBar';
import { connect } from 'react-redux';
import {
  changedLoading,
  cleaningPokemon,
  obtainedIdPokemon,
} from '../../redux/actions';

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
    if(!!Object.entries(this.props.pokemon).length) {
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
        <>
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
        </>
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
