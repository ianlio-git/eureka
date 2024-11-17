import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Usuario de prueba
    const user = { email: 'prueba@prueba.com', password: '123' };

    // Verificar si las credenciales son correctas
    if (email === user.email && password === user.password) {
      // Guardar el estado de autenticación
      localStorage.setItem('authToken', 'token-de-ejemplo'); // Aquí se puede usar un token real
      setIsLoggedIn(true); // Cambiar estado de login
      navigate('/perfil'); // Redirigir al perfil
      alert('¡Bienvenido a Eureka!');  // Mostrar mensaje de bienvenida
    } else {
      alert('Credenciales incorrectas'); // Mostrar mensaje de error si las credenciales no son correctas
    }

    // Limpiar los campos de email y contraseña
    setEmail('');
    setPassword('');
  };

  return (
    <div className="font-montserrat bg-gray-100 flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md m-5">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="tuemail@dominio.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="mt-6 bg-yellow-100 p-6 border-l-4 border-yellow-500">
          <p className="text-lg text-gray-700">
            <strong>Usuario de prueba:</strong> prueba@prueba.com <br />
            <strong>Contraseña de prueba:</strong> 123
          </p>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Login;
