import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import FilterBar from '../../components/Bars/FilterBar/FilterBar';
import NavBar from '../../components/Bars/NavBar/NavBar';
import SearchBar from '../../components/Bars/SearchBar/SearchBar';
import ListCards from '../../components/ListCards/ListCards';
import {
  obtainedPokemons,
  obtainedPokemonsCopy,
  cleaningPokemons,
} from '../../redux/actions';

export default function Home() {
  const dispatch = useDispatch();
  const { pokemons, pokemons_copy, loading, error } = useSelector(
    (state) => state
  );
  const [listPokemons, setListPokemons] = React.useState([]);

  React.useEffect(() => {
    if (!pokemons.length) {
      return dispatch(obtainedPokemons());
    }
    if (!pokemons_copy.length) {
      dispatch(obtainedPokemonsCopy());
      setListPokemons(pokemons_copy[pokemons_copy.length - 1]);
      return;
    }
    return () => {
      setListPokemons([]);
      dispatch(cleaningPokemons())
    };
  }, []);

  if (loading) return <h1>Cargando home</h1>;
  if (!!error) return <h1>{error}</h1>;
  return (
    <>
      <NavBar />
      <SearchBar />
      <FilterBar />
      <ListCards pokemons={listPokemons} />
    </>
  );
}
/*
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.loading = this.props.loading;
  }

  componentDidMount() {
    if (!this.props.pokemons.length) {
      this.props.obtainedPokemons();
    }
    this.props.obtainedPokemonsCopy();
  }
  componentDidUpdate() {
    if (!!this.props.pokemons.length) {
      this.loading = this.props.loading;
    }
  }
  componentWillUnmount() {
    this.props.cleaningPokemons();
    this.props.changedLoading();
  }

  render() {
    if (this.loading) {
      return <h1>Cargando</h1>;
    } else if (!!this.props.error) {
      return <h1>{this.props.error}</h1>;
    } else {
      return (
        <>
          <NavBar />
          <SearchBar />
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
  changedLoading,
})(Home);
*/
