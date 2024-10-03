import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Recipient from './components/Recipient';
import Pay from './components/Pay';
import AdminRegister from './components/AdminRegister';

import './App.css'; // Optional: Add your CSS styles here

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipients" element={<Recipient />} />
        <Route path="/pay-portal" element={<Pay />} /> {/* Add Pay component route */}
        <Route path="/admin" element={<AdminRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
