import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // Tarkistetaan, onko auth-tokennia localStoragessa
    const auth = localStorage.getItem('auth1');

    return auth ? children : <Navigate to="/" />;
};

export default PrivateRoute;
