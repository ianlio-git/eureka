// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

function footer() {
  return (
    <footer className="bg-verde-agua rounded-t-2xl text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="mb-2 md:mb-0 text-center md:text-left">&copy; 2024 Instituto Eureka. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-2 md:mt-0">
            <Link to="#" title="Facebook" className="hover:text-green-300 transition-colors duration-300">
              <i className="bi bi-facebook text-2xl"></i>
            </Link>
            <Link to="#" title="Twitter" className="hover:text-green-300 transition-colors duration-300">
              <i className="bi bi-twitter text-2xl"></i>
            </Link>
            <Link to="#" title="Instagram" className="hover:text-green-300 transition-colors duration-300">
              <i className="bi bi-instagram text-2xl"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default footer;
