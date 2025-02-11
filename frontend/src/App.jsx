import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';


const AppRouter = (
      <BrowserRouter>
            <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
            </Routes>
      </BrowserRouter>
);


const App = () => {
      return (
            <div>
                  {AppRouter}
            </div>
      );
};

export default App;
