import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/app';
import {getFilms} from './mocks/films';

ReactDOM.render(<App films={getFilms()} />, document.querySelector(`#root`));
