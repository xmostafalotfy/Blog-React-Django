import React, { useEffect, useState } from 'react';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './app.css';
import Register from './pages/register';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>404, Page Not Found</h1>} />
      </Routes>
    </>
  );
}
