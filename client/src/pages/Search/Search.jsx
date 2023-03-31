import React from 'react';
import { connect } from 'react-redux';
import SearchBar from '../../components/Bars/SearchBar/SearchBar';
import {
  cleaningPokemons,
  obtainedPokemon,
  changedLoading,
} from '../../redux/actions';
import NavBar from '../../components/Bars/NavBar/NavBar';
import withRouter from '../../components/WithRouter/WithRouter';
import ListCards from '../../components/ListCards/ListCards';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.loading = true;
    this.pokemons = [];
  }
  componentDidMount() {
    if (!this.pokemons.length) {
      this.props.obtainedPokemon(this.props.params.name);
    }
  }
  componentDidUpdate() {
    if (!!this.props.pokemons_copy.length) {
      this.loading = this.props.loading;
      this.pokemons = this.props.pokemons_copy[this.props.pokemons_copy.length - 1]
    }
  }
  componentWillUnmount() {
    this.props.cleaningPokemons();
    this.props.changedLoading();
  }

  render() {
    if (this.loading) {
      return (
        <>
          <NavBar />
          <SearchBar />
          <h1>Cargandooooooo...</h1>
        </>
      );
    } else if (!!this.props.error) {
      return (
        <>
          <NavBar />
          <SearchBar />
          <h1>{this.props.error}</h1>
        </>
      );
    } else {
      return (
        <>
          <NavBar />
          <SearchBar />
          <ListCards
            pokemons={this.pokemons}
          />
        </>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    pokemons_copy: state.pokemons_copy,
    loading: state.loading,
    error: state.error,
  };
}
export default connect(mapStateToProps, {
  obtainedPokemon,
  cleaningPokemons,
  changedLoading,
})(withRouter(Search));
