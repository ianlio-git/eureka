import { useState } from 'react';

// Imágenes importadas
import img1 from '../img/two-girls-white-t-shirts-working-office.jpg';
import img2 from '../img/two-creative-designers-working-project-together-reading-something-digital-tablet-sharing-new-ideas-workplace-business-team-work-concept.jpg';
import img3 from '../img/employees-working-together-side-view.jpg';

// Lista de cursos
const cursos = [
  {
    id: 1,
    title: "Desarrollo Web Frontend",
    description: "Aprende HTML, CSS y JavaScript desde cero. Crea sitios web modernos y responsive.",
    additionalDescription: "En este curso aprenderás desde la creación de tu primer sitio web hasta la implementación de tecnologías avanzadas como el desarrollo responsive y las mejores prácticas para la optimización de sitios web.",
    professor: "Ana García",
    rating: 4.5,
    image: img1,
  },
  {
    id: 2,
    title: "Diseño UX/UI",
    description: "Domina las herramientas y principios del diseño de experiencia de usuario.",
    additionalDescription: "Este curso está enfocado en el diseño de interfaces atractivas y fáciles de usar, abarcando tanto el diseño visual como la usabilidad, con un enfoque práctico en herramientas como Figma y Adobe XD.",
    professor: "Carlos Mendoza",
    rating: 4.8,
    image: img2,
  },
  {
    id: 3,
    title: "Desarrollo Backend con Node.js",
    description: "Construye APIs robustas y aprende desarrollo del lado del servidor.",
    additionalDescription: "A lo largo del curso, te adentrarás en el ecosistema de Node.js, incluyendo el manejo de bases de datos, creación de APIs RESTful, y el uso de Express para estructurar aplicaciones del backend.",
    professor: "Miguel Ángel Ruiz",
    rating: 4.2,
    image: img3,
  },
  {
    id: 4,
    title: "Marketing Digital",
    description: "Estrategias de marketing online, SEO y redes sociales para tu negocio.",
    additionalDescription: "Aprenderás a desarrollar estrategias de marketing digital, incluyendo campañas de publicidad en redes sociales, análisis de datos y optimización para motores de búsqueda (SEO) para mejorar la visibilidad de tu negocio.",
    professor: "Laura Martínez",
    rating: 4.7,
    image: img1,
  },
];

// Componente CursoCard
const CursoCard = ({ curso, onClick }) => {
  return (
    <div className="curso-card bg-gray-100 rounded-lg p-6 shadow-md flex flex-col h-full">
      <div className="curso-imagen mb-4 rounded-lg overflow-hidden">
        <img src={curso.image} alt={curso.title} className="w-full h-40 object-cover" />
      </div>
      <h2 className="text-xl font-bold mb-2">{curso.title}</h2>
      <p className="mb-2">{curso.description}</p>
      <p className="mb-2">Profesor: {curso.professor}</p>
      <p className="mb-4">Valoración: {curso.rating}/5</p>
      <div className="flex-grow"></div> {/* Empuja el botón hacia abajo */}
      <div className="flex justify-center">
        <button 
          onClick={() => onClick(curso)} 
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
        >
          Ver más
        </button>
      </div>
    </div>
  );
};

// Componente Modal
const Modal = ({ curso, onClose }) => {
  if (!curso) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{curso.title}</h2>
        <img src={curso.image} alt={curso.title} className="w-full h-40 object-cover mb-4 rounded-lg" />
        <p className="mb-4">{curso.description}</p>
        <p className="mb-4 text-gray-700">{curso.additionalDescription}</p> {/* Más descripción */}
        <p className="mb-2">Profesor: {curso.professor}</p>
        <p className="mb-4">Valoración: {curso.rating}/5</p>
        <div className="flex justify-center">
          <button 
            onClick={onClose} 
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente principal Cursos
const Cursos = () => {
  const [selectedCurso, setSelectedCurso] = useState(null);

  // Función para abrir el modal con el curso seleccionado
  const handleOpenModal = (curso) => {
    setSelectedCurso(curso);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setSelectedCurso(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-teal-600">
          Nuestros Cursos
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
          {cursos.map((curso) => (
            <CursoCard
              key={curso.id}
              curso={curso}
              onClick={handleOpenModal}
            />
          ))}
        </div>
      </main>

      {/* Modal */}
      <Modal curso={selectedCurso} onClose={handleCloseModal} />
    </div>
  );
};

export default Cursos;
