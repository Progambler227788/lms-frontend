import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-indigo-600">LMS Logo</div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/instructor" className="text-gray-600 hover:text-indigo-600">Become Instructor</Link>
          <Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
          <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Signup</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Links */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4">
          <Link to="/instructor" className="text-gray-600 hover:text-indigo-600">Become Instructor</Link>
          <Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
          <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center">Signup</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
