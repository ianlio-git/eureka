import { Link, useNavigate } from 'react-router-dom'; // Importamos 'useNavigate' para redirigir
import { useState, useEffect, useRef } from 'react';
import './navbar.css';
import PropTypes from 'prop-types';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);  // Estado para el menú en dispositivos móviles
  const menuRef = useRef(null);  // Referencia al contenedor del menú móvil
  const navigate = useNavigate(); // Hook para navegación programática

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Función para hacer logout (eliminar el token)
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Eliminar el token de localStorage
    setIsLoggedIn(false); // Cambiar el estado de login
    alert('Has cerrado sesión exitosamente.');  // Mostrar alerta al cerrar sesión
  };

  // Función para redirigir a la página de perfil si está logeado
  const handleRedirectToProfile = () => {
    if (isLoggedIn) {
      navigate('/perfil'); // Redirige a la página del perfil
    } else {
      navigate('/'); // Si no está logeado, lo lleva a la página de inicio
    }
  };

  // Array de enlaces que se mostrarán en el menú
  const menuLinks = [
    { to: "/cursos", label: "Cursos" },
    { to: "/recursos", label: "Recursos" },
    { to: "/reservas", label: "Reservas" },
    { to: "/pagos", label: "Pagos" },
    { to: "/contacto", label: "Contacto" },
    { to: "/foro", label: "Foro" },
    { to: "/faq", label: "FAQ" },
  ];

  // Función para renderizar los enlaces de menú
  const renderLinks = (links, isMobile = false) => {
    return links.map((link, index) => (
      <div key={link.to} className="flex items-center">
        <Link className="block text-white text-base md:text-lg px-4 py-2 nav-link hover:text-green-300 transition-colors duration-300" to={link.to}>
          {link.label}
        </Link>
        {/* Solo agregar borde entre enlaces en dispositivos grandes */}
        {!isMobile && index !== links.length - 1 && (
          <div className="border-r border-white h-6 mx-2"></div>
        )}
      </div>
    ));
  };

  // Detectar clics fuera del menú móvil
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);  // Cerrar el menú si el clic está fuera del menú
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav id="navbar" className="left-3 right-3 rounded-b-2xl bg-verde-agua shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Sección para dispositivos móviles */}
        <div className="flex flex-row items-center justify-between w-full md:hidden">
          <div className="text-white text-4xl font-bold">
            <button onClick={handleRedirectToProfile} className="nav-link title no-hover-bg">
              Instituto Eureka
            </button>
          </div>
          <button 
            className="text-white" 
            onClick={toggleMenu} 
            aria-label="Toggle menu" 
            aria-expanded={menuOpen ? 'true' : 'false'}
          >
            {/* Ícono de menú (hamburguesa) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {/* Menú para dispositivos grandes */}
        <div className="hidden md:flex flex-col w-full">
          <div className="text-center mb-12 mt-5">
            <button onClick={handleRedirectToProfile} className="text-white text-4xl font-bold nav-link title no-hover-bg hover:text-green-300">
              Instituto Eureka
            </button>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex space-x-4 w-full justify-center items-center">
              {!isLoggedIn ? (
                <>
                  <Link className="text-white text-base md:text-lg hover:text-green-300 transition-colors duration-300 nav-link" to="/login">Login</Link>
                  <div className="border-r border-white h-6 mx-2"></div>
                  <Link className="text-white text-base md:text-lg hover:text-green-300 transition-colors duration-300 nav-link" to="/register">Register</Link>
                </>
              ) : (
                <>
                  {renderLinks(menuLinks)}
                  <div className="border-r border-white h-6 mx-2"></div>
                  <button 
                    onClick={handleLogout} 
                    className="text-red-400 text-base md:text-lg hover:text-green-300 transition-colors duration-300 nav-link">
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div 
        id="mobile-menu" 
        ref={menuRef}  // Asignamos la referencia aquí
        className={`md:hidden ${menuOpen ? 'block' : 'hidden'} bg-verde-agua rounded-b-2xl mx-4 pb-4`}
      >
        {!isLoggedIn ? (
          <>
            <Link className="block text-white text-base px-3 py-2 nav-link hover:text-green-300 transition-colors duration-300" to="/login">Login</Link>
            <Link className="block text-white text-base px-3 py-2 nav-link hover:text-green-300 transition-colors duration-300" to="/register">Register</Link>
          </>
        ) : (
          <>
            {renderLinks(menuLinks, true)} {/* Pasamos "true" para indicar que es el menú móvil */}
            <button onClick={handleLogout} className="block text-red-400 text-base px-3 py-2 nav-link hover:text-green-300 transition-colors duration-300">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Navbar;
