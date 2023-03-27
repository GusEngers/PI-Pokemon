import { createReducer } from '@reduxjs/toolkit';
import { cleaningPokemons, obtainedPokemons } from '../actions';

const initialState = {
  pokemons: [],
  loading: false,
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
    })
    .addCase(obtainedPokemons.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(cleaningPokemons, (state) => {
      state.pokemons = [];
    });
});

export default rootReducer;
