import React from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from './routes/appRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (    
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
  );
}

const ReduxProvider = () => {
  return (
    <Provider store={store}>
        <App />
    </Provider>
  );
};

export default ReduxProvider;
