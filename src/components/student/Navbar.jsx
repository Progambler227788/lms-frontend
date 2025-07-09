import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/student-dashboard' },
    { name: 'Courses', path: '/student-dashboard/courses' },
    { name: 'Assignments', path: '/student-dashboard/assignments' },
    { name: 'Profile', path: '/student-dashboard/profile' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/student-dashboard" className="text-xl font-bold text-indigo-600">EduLMS</Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <Link
              key={item.name}
              to={item.path}
              className="text-gray-600 hover:text-indigo-600"
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4">
          {navItems.map(item => (
            <Link
              key={item.name}
              to={item.path}
              className="text-gray-600 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-center"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
