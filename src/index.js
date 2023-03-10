import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import SearchPage from './Scripts/searchPage.js';
import App from './Scripts/App.js';
import Data from './Data/events-arles.json';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <App Data={Data} />
    </StrictMode>
    
);
reportWebVitals(console.log);

