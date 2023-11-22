import React from 'react';
import Navbar from './Navbarr';
import { DoLogout } from '../Authentication';
import { useNavigate } from 'react-router-dom';
import AlertComponent from './AlertComponent';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
    </div>
  );
};

export default Dashboard;