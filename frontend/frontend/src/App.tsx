import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path='/signup' element={<Signup />}/>
            <Route path='/dashboard'element={<Dashboard />}/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;