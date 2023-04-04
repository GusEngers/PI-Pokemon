import { createReducer } from '@reduxjs/toolkit';
import {
  cleaningFilter,
  cleaningPokemon,
  cleaningPokemons,
  filteringOrder,
  filteringOrigin,
  filteringType,
  obtainedIdPokemon,
  obtainedPokemon,
  obtainedPokemons,
  obtainedPokemonsCopy,
  obtainedTypes,
} from '../actions';
import { _filteringOrder, _filteringType, _filteringOrigin } from './functions';

const initialState = {
  pokemons: [],
  pokemons_copy: [],
  pokemon: {},
  types: [],
  loading: true,
  error: null,
};

const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(obtainedPokemons.pending, (state) => {
      state.loading = true;
    })
    .addCase(obtainedPokemons.fulfilled, (state, action) => {
      state.loading = false;
      state.pokemons = action.payload;
      state.pokemons_copy = [...state.pokemons_copy, action.payload];
    })
    .addCase(obtainedPokemons.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(obtainedPokemonsCopy, (state) => {
      if (!state.pokemons.length) {
        state.pokemons_copy = [];
      } else {
        state.pokemons_copy = [state.pokemons];
        state.loading = false;
      }
    })
    .addCase(obtainedPokemon.pending, (state) => {
      state.loading = true;
    })
    .addCase(obtainedPokemon.fulfilled, (state, action) => {
      state.loading = false;
      state.pokemon = action.payload;
    })
    .addCase(obtainedPokemon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(obtainedIdPokemon.pending, (state) => {
      state.loading = true;
    })
    .addCase(obtainedIdPokemon.fulfilled, (state, action) => {
      state.loading = false;
      state.pokemon = action.payload;
    })
    .addCase(obtainedIdPokemon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(obtainedTypes.fulfilled, (state, action) => {
      state.types = action.payload;
    })
    .addCase(obtainedTypes.rejected, (state, action) => {
      state.error = action.payload;
    })
    .addCase(cleaningPokemons, (state) => {
      state.pokemons_copy = [];
      state.loading = true;
      state.error = null;
    })
    .addCase(cleaningPokemon, (state) => {
      state.pokemon = {};
      state.loading = true;
      state.error = null;
    })
    .addCase(filteringType, (state, action) => {
      let last = state.pokemons_copy.length - 1;
      state.pokemons_copy = [
        ...state.pokemons_copy,
        _filteringType(state.pokemons_copy[last], action.payload),
      ];
    })
    .addCase(filteringOrder, (state, action) => {
      let last = state.pokemons_copy.length - 1;
      let data = [...state.pokemons_copy[last]];
      state.pokemons_copy = [
        ...state.pokemons_copy,
        _filteringOrder(data, action.payload),
      ];
    })
    .addCase(filteringOrigin, (state, action) => {
      let last = state.pokemons_copy.length - 1;
      state.pokemons_copy = [
        ...state.pokemons_copy,
        _filteringOrigin(state.pokemons_copy[last], action.payload),
      ];
    })
    .addCase(cleaningFilter, (state) => {
      state.pokemons_copy = state.pokemons_copy.slice(0, -1);
    });
});

export default rootReducer;
