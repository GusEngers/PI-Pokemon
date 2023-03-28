import { createReducer } from '@reduxjs/toolkit';
import {
  cleaningFilter,
  cleaningPokemons,
  filteringType,
  obtainedPokemons,
  obtainedPokemonsCopy,
  obtainedTypes,
} from '../actions';

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
      if (action.payload !== '') {
        let previous = state.pokemons_copy[state.pokemons_copy.length - 1];
        let current = previous.filter((pokemon) =>
          pokemon.types.some((type) => type.name === action.payload)
        );
        state.pokemons_copy.push(current);
      }
    })
    .addCase(cleaningFilter, (state) => {
      state.pokemons_copy.pop();
    });
});

export default rootReducer;
