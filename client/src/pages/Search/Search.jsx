import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../components/Bars/SearchBar/SearchBar';
import NavBar from '../../components/Bars/NavBar/NavBar';
import ListCards from '../../components/ListCards/ListCards';
import { cleaningPokemon, obtainedPokemon } from '../../redux/actions';
import { useParams } from 'react-router-dom';

export default function Search() {
  const dispatch = useDispatch();
  const { pokemon, loading, error } = useSelector((state) => state);
  const { name } = useParams();

  React.useEffect(() => {
    if (!Object.entries(pokemon).length) {
      dispatch(obtainedPokemon(name));
    }
    return () => dispatch(cleaningPokemon());
  }, [pokemon, name, dispatch]);

  if (loading) return <h1>Cargando busqueda</h1>;
  if (!!error) return <h1>{error}</h1>;
  return (
    <>
      <NavBar />
      <SearchBar />
      <ListCards pokemons={[{ ...pokemon }]} />
    </>
  );
}
/*
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.loading = this.props.loading;
    this.pokemons = [];
  }
  componentDidMount() {
    this.props.obtainedPokemon(this.props.params.name);
    if (!!this.props.pokemons_copy.length) {
      this.loading = this.props.loading;
      this.pokemons =
        this.props.pokemons_copy[this.props.pokemons_copy.length - 1];
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
*/
