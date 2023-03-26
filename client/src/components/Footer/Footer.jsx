import React from 'react';
import { Link } from 'react-router-dom';
import style from './Footer.module.css';

export default function Footer() {
  return (
    <footer>
      <div>
        <span className={style.title}>Follow</span>
        <ul>
          <li>
            <a
              href="https://www.linkedin.com/in/gustavo-elias-engers-965788223/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://github.com/GusEngers"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a href="mailto:gustavoengers6441@gmail.com">E-mail</a>
          </li>
          <li>
            <span>+54 3754-499497</span>
          </li>
        </ul>
      </div>
      <div>
        <span className={style.title}>Explore</span>
        <ul>
          <li>
            <Link>Home</Link>
          </li>
          <li>
            <Link>Create</Link>
          </li>
          <li>
            <Link>Contact</Link>
          </li>
        </ul>
      </div>
      <div>
        <span className={style.title}>Developed by</span>
        <a
          href="https://github.com/GusEngers"
          target="_blank"
          rel="noopener noreferrer"
          className={style.dev}
        >
          GusEngersDev
        </a>
      </div>
    </footer>
  );
}
