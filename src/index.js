import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './common/serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';

ReactDOM.render(
    <Router>
        <App />
    </Router>, 
    document.getElementById('root')
);

serviceWorker.unregister();
