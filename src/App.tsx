import React from "react";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import HomePage from "./components/HomePage";
import ProtectedRoute, {ProtectedRouteProps} from "./components/ProtectedRoute";
import LoginPage from "./components/LoginPage";

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: localStorage.getItem("token") != null,
    authenticationPath: '/login',
};

console.log(localStorage.getItem("token"))

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<HomePage/>}/>}/>
                <Route path='/login' element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    )
};

export default App;