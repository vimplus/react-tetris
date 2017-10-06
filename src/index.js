/**
 * @overview: entry index.js
 * @author: txBoy
 * @created 2017-10-05
 */
"use strict";


import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';

import { AppContainer } from 'react-hot-loader';
import App from './containers/index.js';


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
