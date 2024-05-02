import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './style/style.css'
import App from './App';
import './all.min.css';
import UserProvider from './pages/website/Context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <UserProvider >
            <App />
        </UserProvider>
    </BrowserRouter>
);
