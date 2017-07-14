import React from 'react';
import ReactDOM from 'react-dom';
import '../src/client/assets/Styles/Bootstrap.css';
import '../src/client/assets/Styles/_General.css'
import Routes from '../src/client/components/Routes/Routes';

ReactDOM.render(
  <Routes/>, document.querySelector('#root'));