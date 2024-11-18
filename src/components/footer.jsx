import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/LogoUADE.png'; // Asegúrate de que la ruta al logo sea correcta

function Footer() {
  return (
    <footer className="bg-verde-agua rounded-t-2xl text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Información del footer */}
          <div className="flex-grow-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-center md:justify-start space-y-3 md:space-y-0">
              <div className="md:px-4">
                <p className="mb-1">
                  <strong>Materia:</strong> Diseño y Desarrollo Web
                </p>
              </div>
              <div className="md:px-4">
                <p className="mb-1">
                  <strong>Curso:</strong> Virtual
                </p>
              </div>
              <div className="md:px-4">
                <p className="mb-1">
                  <strong>Grupo:</strong> 07
                </p>
              </div>
            </div>
            <div className="mt-3">
              <p>&copy; 2024 Todos los Derechos Reservados - Sitio desarrollado para uso educativo.</p>
            </div>
          </div>

          {/* Logo */}
          <div className="flex justify-center items-center mt-4 md:mt-0">
            <img src={logo} alt="Logo UADE" style={{ maxWidth: '100px' }} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
