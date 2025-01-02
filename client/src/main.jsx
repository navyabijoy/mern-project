import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 uses createRoot for rendering
import App from './App'; 
import './index.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
