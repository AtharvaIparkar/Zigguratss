import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Artwork from './pages/Artwork';
import Orders from './pages/Orders';
import Refunds from './pages/Refunds';
import AwardsExhibitions from './pages/AwardsExhibitions';
import Blog from './pages/Blog';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/artwork" element={<Artwork />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/refunds" element={<Refunds />} />
        <Route path="/awards-exhibitions" element={<AwardsExhibitions />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}
