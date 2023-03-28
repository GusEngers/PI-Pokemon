import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './SearchBar.module.css';

export default function SearchBar() {
  const [value, setValue] = React.useState('');
  const navigate = useNavigate();
  const handleSearch = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  return (
    <div className={style.container}>
      <form onSubmit={() => navigate(`/search/${value}`)}>
        <input
          type="text"
          value={value}
          placeholder="Search your pokemon..."
          onChange={(event) => handleSearch(event)}
          className={style.search}
        />
        <input type="submit" value={'🔎'} className={style.button} />
      </form>
    </div>
  );
}
