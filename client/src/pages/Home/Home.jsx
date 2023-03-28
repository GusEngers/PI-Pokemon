import React from 'react';
/* import { useSearchParams } from 'react-router-dom' */
import { connect } from 'react-redux';
import FilterBar from '../../components/Bars/FilterBar/FilterBar';
import ListCards from '../../components/ListCards/ListCards';
import {
  cleaningPokemons,
  obtainedPokemons,
  obtainedPokemonsCopy,
} from '../../redux/actions';

class Home extends React.Component {
  componentDidMount() {
    if (!this.props.pokemons.length) {
      this.props.obtainedPokemons();
    }
    if (!this.props.pokemons_copy.length) {
      this.props.obtainedPokemonsCopy();
    }
  }
  componentWillUnmount() {
    this.props.cleaningPokemons();
  }
  render() {
    if (this.props.loading) {
      return <h1>Cargando</h1>;
    } else if (!!this.props.error) {
      return <h1>{this.props.error}</h1>;
    } else {
      return (
        <>
          <FilterBar />
          <ListCards
            pokemons={
              this.props.pokemons_copy[this.props.pokemons_copy.length - 1]
            }
          />
        </>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    pokemons: state.pokemons,
    pokemons_copy: state.pokemons_copy,
    loading: state.loading,
    error: state.error,
  };
}

export default connect(mapStateToProps, {
  obtainedPokemons,
  obtainedPokemonsCopy,
  cleaningPokemons,
})(Home);
