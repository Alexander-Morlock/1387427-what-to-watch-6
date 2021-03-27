import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import {reducer} from './store/reducer';
import App from './components/App/app';

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);

