import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API actions const
const OBTAINED_POKEMONS = 'OBTAINED_POKEMONS';
const OBTAINED_POKEMONS_COPY = 'OBTAINED_POKEMONS_COPY';
const OBTAINED_POKEMON = '0BTAINED_POKEMON';
const OBTAINED_ID_POKEMON = 'OBTAINED_ID_POKEMON';
const OBTAINED_TYPES = 'OBTAINED_TYPES';
const CLEANING_POKEMONS = 'CLEANING_POKEMONS';
const CLEANING_POKEMON = 'CLEANING_POKEMON';

// Store filter const
const FILTERING_TYPE = 'FILTERING_TYPE';
const FILTERING_ORDER = 'FILTERING_ORDER';
const FILTERING_ORIGIN = 'FILTERING_ORIGIN';
const CLEANING_FILTER = 'CLEANING_FILTER';

// Store handling
const CHANGED_LOADING = 'CHANGED_LOADING';

// API actions functions
export const obtainedPokemons = createAsyncThunk(
  OBTAINED_POKEMONS,
  async (thunkApi, { rejectWithValue }) => {
    try {
      return await axios
        .get('http://localhost:3001/pokemons')
        .then((d) => [...d.data.data.api, ...d.data.data.db]);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const obtainedPokemonsCopy = createAction(OBTAINED_POKEMONS_COPY);

export const obtainedPokemon = createAsyncThunk(
  OBTAINED_POKEMON,
  async (name, { rejectWithValue }) => {
    try {
      return await axios
        .get(`http://localhost:3001/pokemons?name=${name}`)
        .then((d) => d.data.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const obtainedIdPokemon = createAsyncThunk(
  OBTAINED_ID_POKEMON,
  async (id, { rejectWithValue }) => {
    try {
      return await axios
        .get(`http://localhost:3001/pokemons/${id}`)
        .then((d) => d.data.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const obtainedTypes = createAsyncThunk(
  OBTAINED_TYPES,
  async (thunkApi, { rejectWithValue }) => {
    try {
      return await axios
        .get('http://localhost:3001/types')
        .then((d) => d.data.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cleaningPokemons = createAction(CLEANING_POKEMONS);

export const cleaningPokemon = createAction(CLEANING_POKEMON);

// Store filter functions
export const filteringType = createAction(FILTERING_TYPE);

export const filteringOrder = createAction(FILTERING_ORDER);

export const filteringOrigin = createAction(FILTERING_ORIGIN);

export const cleaningFilter = createAction(CLEANING_FILTER);

// Store handling function
export const changedLoading = createAction(CHANGED_LOADING);
