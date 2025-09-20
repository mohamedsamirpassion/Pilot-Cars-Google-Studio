
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {currentYear} Pilot Cars & Permits. All rights reserved.</p>
        <p className="text-sm text-slate-400 mt-2">Your reliable partner in oversize load transportation.</p>
      </div>
    </footer>
  );
};

export default Footer;
