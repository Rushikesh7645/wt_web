import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to College Event Management</h1>
          <p className="text-xl mb-8">Discover and participate in amazing events</p>
          <Link to="/events" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">View Events</Link>
        </div>
      </div>
      <div className="container mx-auto py-12">
        <h2 className="text-2xl font-bold text-center mb-8">About Us</h2>
        <p className="text-center">We organize various technical and non-technical events for students.</p>
      </div>
    </div>
  );
};

export default Home;