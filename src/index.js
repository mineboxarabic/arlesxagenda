import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './Scripts/App.js';

import reportWebVitals from './reportWebVitals';




const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
    <StrictMode>


            <App/>


    </StrictMode>
    
);
reportWebVitals(console.log);

