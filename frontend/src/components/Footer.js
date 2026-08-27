import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 College Event Management. All rights reserved.</p>
        <div className="mt-4">
          <a href="/about" className="mr-4">About</a>
          <a href="/contact" className="mr-4">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;