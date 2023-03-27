import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const OBTAINED_POKEMONS = 'OBTAINED_POKEMONS';
const CLEANING_POKEMONS = 'CLEANING_POKEMONS';

export const obtainedPokemons = createAsyncThunk(
  OBTAINED_POKEMONS,
  async () =>
    await axios
      .get('http://localhost:3001/pokemons')
      .then((d) => [...d.data.data.api, ...d.data.data.db])
      .catch((e) => e.message)
);

export const cleaningPokemons = createAction(CLEANING_POKEMONS);
