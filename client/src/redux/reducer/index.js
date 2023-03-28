import { createReducer } from '@reduxjs/toolkit';
import {
  cleaningFilter,
  cleaningPokemons,
  filteringOrder,
  filteringType,
  obtainedPokemons,
  obtainedPokemonsCopy,
  obtainedTypes,
} from '../actions';
import { _filteringOrder, _filteringType } from './functions';

const initialState = {
  pokemons: [],
  pokemons_copy: [],
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
      state.pokemons_copy.push(action.payload);
    })
    .addCase(obtainedPokemons.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(obtainedPokemonsCopy, (state) => {
      state.pokemons_copy = [state.pokemons];
    })
    .addCase(obtainedTypes.fulfilled, (state, action) => {
      state.types = action.payload;
    })
    .addCase(obtainedTypes.rejected, (state, action) => {
      state.error = action.payload;
    })
    .addCase(cleaningPokemons, (state) => {
      state.pokemons_copy = [];
    })
    .addCase(filteringType, (state, action) => {
      let last = state.pokemons_copy.length - 1;
      let data = [...state.pokemons_copy[last]];
      state.pokemons_copy = [
        ...state.pokemons_copy,
        _filteringType(data, action.payload),
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
    .addCase(cleaningFilter, (state) => {
      state.pokemons_copy = state.pokemons_copy.slice(0, -1);
    });
});

export default rootReducer;
