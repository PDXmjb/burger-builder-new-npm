import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux'
import reducer from './store/reducer';
import { createStore } from 'redux';

const RouterApp = () => {

    const store = createStore(reducer);

    return (
        <Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>
    )
}

ReactDOM.render(<RouterApp></RouterApp>, document.getElementById('root'));
registerServiceWorker();
