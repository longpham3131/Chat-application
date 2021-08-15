import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
// bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/popper.js/dist/popper.min.js";
//font awesome
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

//Redux
import { Provider } from "react-redux";
import store from './store/index'


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));