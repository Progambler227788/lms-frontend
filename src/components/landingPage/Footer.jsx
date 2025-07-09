import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">LMS</h3>
          <p>Empowering learners to achieve their goals through quality education.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/courses" className="hover:underline">Courses</Link></li>
            <li><Link to="/instructor" className="hover:underline">Become Instructor</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
            <li><Link to="/signup" className="hover:underline">Signup</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <p>Email: support@lms.com</p>
          <p>Phone: +92 300 1234567</p>
        </div>
      </div>
      <p className="text-center text-gray-500 mt-8 text-sm">&copy; {new Date().getFullYear()} LMS. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
