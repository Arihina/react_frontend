import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import transactions from './reducers';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';


const store = createStore(transactions);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
