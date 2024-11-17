import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Usamos el hook useNavigate para redirigir

const Recursos = () => {
  const navigate = useNavigate(); // Hook para navegar programáticamente
  const [recursosData, setRecursosData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 8;

  // Cuando el componente se monta, asignamos los datos a la variable de estado
  useEffect(() => {
    const recursos = [
      {
        "id": 1,
        "title": "Cálculo Diferencial y Integral",
        "subject": "Matemática",
        "file": "/pdfs/matematica1.pdf",
        "author": "Juan Pérez",
        "description": "Este libro cubre los principios básicos del cálculo diferencial e integral."
      },
      {
        "id": 2,
        "title": "Álgebra Lineal",
        "subject": "Matemática",
        "file": "/pdfs/matematica2.pdf",
        "author": "Ana Gómez",
        "description": "Un enfoque completo sobre álgebra lineal con ejemplos resueltos."
      },
      {
        "id": 3,
        "title": "Geometría Analítica",
        "subject": "Matemática",
        "file": "/pdfs/matematica3.pdf",
        "author": "Carlos López",
        "description": "Guía de geometría analítica, enfocada en las aplicaciones prácticas."
      },
      {
        "id": 4,
        "title": "Teoría de Números",
        "subject": "Matemática",
        "file": "/pdfs/matematica4.pdf",
        "author": "Pedro Sánchez",
        "description": "Una introducción a la teoría de números con ejemplos y ejercicios."
      },
      {
        "id": 5,
        "title": "Física General",
        "subject": "Física",
        "file": "/pdfs/fisica1.pdf",
        "author": "María Rodríguez",
        "description": "Fundamentos de física general, con explicaciones claras y concisas."
      },
      {
        "id": 6,
        "title": "Mecánica Clásica",
        "subject": "Física",
        "file": "/pdfs/fisica2.pdf",
        "author": "Luis Martínez",
        "description": "Un enfoque profundo sobre la mecánica clásica, ideales para estudiantes avanzados."
      },
      {
        "id": 7,
        "title": "Termodinámica",
        "subject": "Física",
        "file": "/pdfs/fisica3.pdf",
        "author": "Laura Pérez",
        "description": "Todo lo que necesitas saber sobre termodinámica, desde lo básico hasta lo avanzado."
      },
      {
        "id": 8,
        "title": "Electromagnetismo",
        "subject": "Física",
        "file": "/pdfs/fisica4.pdf",
        "author": "José Ruiz",
        "description": "Una introducción a la teoría electromagnética y sus aplicaciones."
      },
      {
        "id": 9,
        "title": "Química Orgánica",
        "subject": "Química",
        "file": "/pdfs/quimica1.pdf",
        "author": "Carlos García",
        "description": "Explora los principios fundamentales de la química orgánica con énfasis en los compuestos de carbono."
      },
      {
        "id": 10,
        "title": "Química Inorgánica",
        "subject": "Química",
        "file": "/pdfs/quimica2.pdf",
        "author": "Sofía González",
        "description": "Este libro cubre los conceptos básicos de la química inorgánica y sus aplicaciones."
      },
      {
        "id": 11,
        "title": "Físico-Química",
        "subject": "Química",
        "file": "/pdfs/quimica3.pdf",
        "author": "Ricardo Pérez",
        "description": "Un análisis detallado de las interacciones químicas desde el punto de vista físico."
      },
      {
        "id": 12,
        "title": "Bioquímica",
        "subject": "Química",
        "file": "/pdfs/quimica4.pdf",
        "author": "Clara Ruiz",
        "description": "Una introducción a la bioquímica, ideal para estudiantes de ciencias biológicas."
      },
      {
        "id": 13,
        "title": "Gramática Inglesa",
        "subject": "Inglés",
        "file": "/pdfs/ingles1.pdf",
        "author": "John Smith",
        "description": "Un repaso completo de la gramática inglesa, desde lo más básico hasta niveles avanzados."
      },
      {
        "id": 14,
        "title": "Inglés para Todos",
        "subject": "Inglés",
        "file": "/pdfs/ingles2.pdf",
        "author": "Jane Doe",
        "description": "Guía práctica para aprender inglés de manera fácil y accesible."
      },
      {
        "id": 15,
        "title": "Inglés Intermedio",
        "subject": "Inglés",
        "file": "/pdfs/ingles3.pdf",
        "author": "Chris Green",
        "description": "Contenido adecuado para estudiantes de nivel intermedio que desean mejorar su fluidez."
      },
      {
        "id": 16,
        "title": "Inglés Avanzado",
        "subject": "Inglés",
        "file": "/pdfs/ingles4.pdf",
        "author": "Patricia Blue",
        "description": "Para estudiantes avanzados que buscan perfeccionar su inglés escrito y hablado."
      },
      {
        "id": 17,
        "title": "Estadística para Todos",
        "subject": "Matemática",
        "file": "/pdfs/matematica5.pdf",
        "author": "María Ruiz",
        "description": "Una guía de estadística con ejemplos prácticos y explicaciones detalladas."
      },
      {
        "id": 18,
        "title": "Física Cuántica",
        "subject": "Física",
        "file": "/pdfs/fisica5.pdf",
        "author": "Daniel Martínez",
        "description": "Introducción a los principios fundamentales de la mecánica cuántica."
      },
      {
        "id": 19,
        "title": "Química Analítica",
        "subject": "Química",
        "file": "/pdfs/quimica5.pdf",
        "author": "Verónica Díaz",
        "description": "Fundamentos de la química analítica, cubriendo técnicas y métodos esenciales."
      },
      {
        "id": 20,
        "title": "Química Biológica",
        "subject": "Química",
        "file": "/pdfs/quimica6.pdf",
        "author": "Andrés Pérez",
        "description": "Una exploración de la química en los procesos biológicos."
      }
    ];
    setRecursosData(recursos);
  }, []);

  const filteredResources = recursosData.filter((resource) => {
    return (
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.subject.toLowerCase().includes(selectedSubject.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredResources.length / resultsPerPage);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleSubjectChange = (event) => setSelectedSubject(event.target.value);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Filtrar los recursos por la búsqueda
  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  // Función para redirigir al libro seleccionado
  const handleBookClick = (bookId) => {
    navigate(`/libros/${bookId}`); // Redirigimos a la página del libro con el id
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-teal-600 mb-6">Recursos Educativos</h1>

        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar libro..."
            className="px-4 py-2 border rounded-lg w-full max-w-md"
          />
          <select
            value={selectedSubject}
            onChange={handleSubjectChange}
            className="px-4 py-2 border rounded-lg w-full max-w-md"
          >
            <option value="">Seleccionar Materia</option>
            <option value="Matemática">Matemática</option>
            <option value="Física">Física</option>
            <option value="Química">Química</option>
            <option value="Inglés">Inglés</option>
          </select>
        </div>

        <div className="space-y-4">
          {paginatedResources.length === 0 ? (
            <p className="text-gray-500">No se encontraron resultados.</p>
          ) : (
            paginatedResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer"
                onClick={() => handleBookClick(resource.id)} // Al hacer clic, redirigimos al libro
              >
                <h2 className="text-xl font-semibold text-teal-600">{resource.title}</h2>
                <p className="text-sm text-gray-600">Materia: {resource.subject}</p>
                <p className="text-sm text-gray-600">Autor: {resource.author}</p>
              </div>
            ))
          )}
        </div>

        {/* Paginación */}
        <div className="flex justify-center space-x-4 mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-teal-600 text-white' : 'bg-gray-300'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recursos;
