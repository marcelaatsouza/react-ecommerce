import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CommerceContextProvider from './Context/CommerceContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CommerceContextProvider>
    <App />
  </CommerceContextProvider>
);