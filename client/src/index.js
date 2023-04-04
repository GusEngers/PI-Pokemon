import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
//import dotenv from 'dotenv';
//import axios from 'axios';
//dotenv.config();

//axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';

const container = document.getElementById('root');

const root = ReactDOMClient.createRoot(container);

root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </>
);
