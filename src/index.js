import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';

const RouterApp = () => {
    return (
        <BrowserRouter><App /></BrowserRouter>
    )
}

ReactDOM.render(<RouterApp></RouterApp>, document.getElementById('root'));
registerServiceWorker();
