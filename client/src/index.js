import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App'

const store = createStore(() => [], {}, applyMiddleware());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));