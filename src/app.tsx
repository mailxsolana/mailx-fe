import Home from "pages/home";
import AppHome from "pages/app";
import Login from "pages/login";
import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import Dashboard from "pages/dashboard";

const App = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/app" element={<AppHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );

}

export default App;