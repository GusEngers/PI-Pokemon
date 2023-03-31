import React from 'react';
import { connect } from 'react-redux';
import SearchBar from '../../components/Bars/SearchBar/SearchBar';
import {
  cleaningPokemon,
  obtainedPokemon,
  changedLoading,
} from '../../redux/actions';
import NavBar from '../../components/Bars/NavBar/NavBar';
import withRouter from '../../components/WithRouter/WithRouter';
import ListCards from '../../components/ListCards/ListCards';

class Search extends React.Component {
  componentDidMount() {
    if (!Object.entries(this.props.pokemon).length) {
      this.props.obtainedPokemon(this.props.params.name);
    }
  }
  componentWillUnmount() {
    this.props.cleaningPokemon();
    this.props.changedLoading();
  }

  render() {
    if (this.props.loading) {
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
          <ListCards pokemons={[{...this.props.pokemon}]} />
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
  obtainedPokemon,
  cleaningPokemon,
  changedLoading,
})(withRouter(Search));
