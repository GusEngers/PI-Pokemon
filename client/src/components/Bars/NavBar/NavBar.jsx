import React from 'react';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={style.container}>
      <div className={style.first_buttons}>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <button>Pokemon</button>
        </Link>
      </div>
      <div className={style.second_buttons}>
        <Link to={'/home'} style={{ textDecoration: 'none' }}>
          <button>Home</button>
        </Link>
        <Link to={'/create'} style={{ textDecoration: 'none' }}>
          <button>Create</button>
        </Link>
        <Link to={'/contact'} style={{ textDecoration: 'none' }}>
          <button>Contact</button>
        </Link>
      </div>
    </nav>
  );
}
