import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { IsLoggedIn } from '../Authentication';
import Navbar from './Navbarr';

const PrivateRoute = () => {
    const nevigate= useNavigate();
    if(IsLoggedIn()) {
        return (
            <>
                <Navbar/>
                <Outlet/>
            </>
        );
    }
    else {
        console.log("khushiiiiiii");
        return nevigate("/signin");
    }
}
export default PrivateRoute;
