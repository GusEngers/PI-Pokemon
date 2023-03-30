import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav>
      <div>
        <Link to={'/'}>
          <button>Pokemon</button>
        </Link>
      </div>
      <div>
        <Link to={'/home'}>
          <button>Home</button>
        </Link>
        <Link to={'/create'}>
          <button>Create</button>
        </Link>
        <Link to={'/contact'}>
          <button>Contact</button>
        </Link>
      </div>
    </nav>
  );
}
