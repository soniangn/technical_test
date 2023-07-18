import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/*<Route path="/home" element={< Home />} />*/}
                <Route path="/register" element={< Register />} />
                <Route path="/login" element={< Login />} />
                <Route path="/dashboard" element={< Dashboard />} />
            </Routes>
        </BrowserRouter> 
    )
}