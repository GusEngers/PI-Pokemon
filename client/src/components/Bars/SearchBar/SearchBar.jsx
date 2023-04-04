import React from 'react';
import { useDispatch } from 'react-redux';
import style from './SearchBar.module.css';
import { cleaningSearch, obtainedPokemon } from '../../../redux/actions';

export default function SearchBar({ isSearch, setIsSearch }) {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();
  const handleSearch = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  return (
    <div className={style.container}>
      <form
        onSubmit={() => {
          dispatch(obtainedPokemon(value));
          setIsSearch(true);
        }}
      >
        <input
          type="text"
          value={value}
          placeholder="Search your pokemon..."
          onChange={(event) => handleSearch(event)}
          className={style.search}
        />
        <input type="submit" value={'🔎'} className={style.button} />
      </form>
      {isSearch ? (
        <button
          className={style.button_close}
          onClick={() => {
            dispatch(cleaningSearch());
            setIsSearch(false);
          }}
        >
          X
        </button>
      ) : null}
    </div>
  );
}
