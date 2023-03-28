import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API actions const
const OBTAINED_POKEMONS = 'OBTAINED_POKEMONS';
const OBTAINED_POKEMONS_COPY = 'OBTAINED_POKEMONS_COPY';
const OBTAINED_TYPES = 'OBTAINED_TYPES';
const CLEANING_POKEMONS = 'CLEANING_POKEMONS';

// Store filter const
const FILTERING_TYPE = 'FILTERING_TYPE';
const FILTERING_ORDER = 'FILTERING_ORDER';
const CLEANING_FILTER = 'CLEANING_FILTER';

// API actions functions
export const obtainedPokemons = createAsyncThunk(
  OBTAINED_POKEMONS,
  async () =>
    await axios
      .get('http://localhost:3001/pokemons')
      .then((d) => [...d.data.data.api, ...d.data.data.db])
      .catch((e) => e.message)
);

export const obtainedPokemonsCopy = createAction(OBTAINED_POKEMONS_COPY);

export const cleaningPokemons = createAction(CLEANING_POKEMONS);

export const obtainedTypes = createAsyncThunk(
  OBTAINED_TYPES,
  async () =>
    await axios
      .get('http://localhost:3001/types')
      .then((d) => d.data.data)
      .catch((e) => e.message)
);

// Store filter functions
export const filteringType = createAction(FILTERING_TYPE);

export const filteringOrder = createAction(FILTERING_ORDER);

export const cleaningFilter = createAction(CLEANING_FILTER);
