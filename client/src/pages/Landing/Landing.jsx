import React from 'react';
import style from './Landing.module.css';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

export default function Landing() {
  return (
    <>
      <div className={style.container}>
        <Link to="#" className={style.link}>
          <button className={style.btn_landing}>Let's Go!</button>
        </Link>
      </div>
      <Footer />
    </>
  );
}
