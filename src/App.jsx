import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/landing';
import Navbar from './components/Navbar'; 
import Home from './components/home';
import Scanner from './views/ScannerView';
import BodyTrack from './views/BodyTrack';
import NutriTrack from './pages/NutriTrack';
import NutriPages from './pages/NutriPages';
import Login from './auth/login';
import Register from './auth/register';
import ForgotPassword from './auth/ForgotPassword';
import AboutTeam from './components/AboutTeam';

const App = () => {
  return (
    <>
      {/* <Navbar /> */}
      <main className="">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/BodyTrack" element={<BodyTrack />} />
          <Route path="/NutriTrack" element={<NutriTrack />} />
          <Route path="/NutriPages" element={<NutriPages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about-team" element={<AboutTeam />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
