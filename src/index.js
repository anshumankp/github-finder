import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { GitProvider } from './ContextProvider';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <GitProvider>
      <App />
    </GitProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
