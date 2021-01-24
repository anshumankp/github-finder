import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GitProvider } from './ContextProvider';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <GitProvider>
      <Router>
        <Route exact path='/' component={App} />
        <Route exact path='/:query' component={App} />
      </Router>
    </GitProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
