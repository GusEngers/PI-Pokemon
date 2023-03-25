import React from 'react';
import style from './Landing.module.css';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <>
      <div className={style.container}>
        <Link to="#" className={style.link}>
          <button className={style.btn_landing}>Let's Go!</button>
        </Link>
      </div>
      <div style={{height: "100px"}}>
        hola
      </div>
    </>
  );
}
