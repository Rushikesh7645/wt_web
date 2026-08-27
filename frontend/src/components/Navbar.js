import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">🎓 College Events</Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-200 transition">Home</Link>
          <Link to="/events" className="hover:text-blue-200 transition">Events</Link>
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/create-event" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition font-bold">
                  + New Event
                </Link>
              )}
              <Link to="/dashboard" className="hover:text-blue-200 transition">Dashboard</Link>
              <span className="text-sm bg-blue-700 px-3 py-1 rounded">{user.role}</span>
              <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200 transition">Login</Link>
              <Link to="/register" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;