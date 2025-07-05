import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Dashboard', path: '/student-dashboard' },
    { name: 'Courses', path: '/student-dashboard/courses' },
    { name: 'Assignments', path: '/student-dashboard/assignments' },
    { name: 'Profile', path: '/student-dashboard/profile' },
  ];

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/student-dashboard" className="navbar-logo">
          EduLMS
        </Link>

        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <nav className={`navbar-links ${isOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <Link key={item.name} to={item.path} className="navbar-link" onClick={() => setIsOpen(false)}>
              {item.name}
            </Link>
          ))}

          <button className="logout-button">Logout</button>
        </nav>
      </div>
    </header>
  );
}
