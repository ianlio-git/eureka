import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

function Register({ setIsLoggedIn }) { // Recibir setIsLoggedIn como prop
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Inicializar navigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Crear un objeto con los datos del formulario
    const newUser = { name, email, password };

    // Guardar los datos o procesarlos como desees
    console.log(newUser);

    // Limpiar el formulario después de enviarlo
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    // Alerta de registro exitoso
    alert('Registro exitoso');

    // Establecer el estado de login a true
    setIsLoggedIn(true);

    // Redirigir al perfil después del registro exitoso
    navigate('/perfil');
  };

  return (
    <div className="font-montserrat bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md m-5">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Registrarse</h2>
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Tu nombre"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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

          {/* Confirm Password */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Confirmar Contraseña"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Registrarse
          </button>

          {/* Login Link */}
          <div className="text-center mt-6">
            <span className="text-lg text-gray-500">
              ¿Ya tienes una cuenta?{' '}
              <a href="/login" className="text-gray-600 hover:underline">
                Inicia sesión
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
Register.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Register;
