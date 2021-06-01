import React from 'react';
import ReactDOM from 'react-dom';
import ReduxProvider from './App';
import { CssBaseline } from "@material-ui/core";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline/>
    <ReduxProvider />
  </React.StrictMode>,
  document.getElementById('root')
);