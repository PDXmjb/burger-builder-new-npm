import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';

const app = () => {
    return (
        <BrowserRouter><App /></BrowserRouter>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();