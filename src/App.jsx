import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import { useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Reservas from './pages/reservas';
import FAQ from './pages/faq';
import Cursos from './pages/cursos';
import Contacto from './pages/contacto';
import Foro from './pages/foro';
import Recursos from './pages/recursos';
import Pagos from './pages/pagos';
import Perfil from './pages/perfil';
import Libros from './components/libros'; // Asegúrate de importar el componente Libros

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="font-montserrat mx-3">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/foro" element={<Foro />} />
          <Route path="/recursos" element={<Recursos />} />
          <Route path="/pagos" element={<Pagos />} />
          <Route path="/libros/:id" element={<Libros />} /> {/* Aquí pasamos el parámetro id */}
          
          <Route
            path="/perfil"
            element={isLoggedIn ? <Perfil /> : <Navigate to="/" />}
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
