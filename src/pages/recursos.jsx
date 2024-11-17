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
      // Desarrollo Web Frontend
      {
        "id": 1,
        "title": "HTML y CSS: Diseño y Construcción de Páginas Web",
        "subject": "Desarrollo Web Frontend",
        "file": "/pdfs/frontend1.pdf",
        "author": "Jon Duckett",
        "description": "Un enfoque claro y conciso para aprender los principios fundamentales del diseño y desarrollo web utilizando HTML y CSS."
      },
      {
        "id": 2,
        "title": "JavaScript: The Good Parts",
        "subject": "Desarrollo Web Frontend",
        "file": "/pdfs/frontend2.pdf",
        "author": "Douglas Crockford",
        "description": "Un análisis profundo sobre las características más poderosas y útiles de JavaScript, ayudando a escribir código limpio y eficiente."
      },
      {
        "id": 3,
        "title": "Eloquent JavaScript",
        "subject": "Desarrollo Web Frontend",
        "file": "/pdfs/frontend3.pdf",
        "author": "Marijn Haverbeke",
        "description": "Una introducción al lenguaje JavaScript para desarrolladores de todos los niveles, cubriendo desde conceptos básicos hasta temas más avanzados."
      },
      {
        "id": 4,
        "title": "React Up and Running",
        "subject": "Desarrollo Web Frontend",
        "file": "/pdfs/frontend4.pdf",
        "author": "Stoyan Stefanov",
        "description": "Guía para dominar React, una de las bibliotecas más populares de JavaScript para construir interfaces de usuario interactivas."
      },
    
      // Desarrollo Backend
      {
        "id": 5,
        "title": "Node.js Design Patterns",
        "subject": "Desarrollo Backend",
        "file": "/pdfs/backend1.pdf",
        "author": "Mario Casciaro",
        "description": "Explora patrones de diseño para crear aplicaciones escalables y eficientes con Node.js."
      },
      {
        "id": 6,
        "title": "The Pragmatic Programmer",
        "subject": "Desarrollo Backend",
        "file": "/pdfs/backend2.pdf",
        "author": "Andrew Hunt, David Thomas",
        "description": "Consejos sobre cómo escribir software de alta calidad, aplicables a todos los aspectos del desarrollo backend."
      },
      {
        "id": 7,
        "title": "Spring in Action",
        "subject": "Desarrollo Backend",
        "file": "/pdfs/backend3.pdf",
        "author": "Craig Walls",
        "description": "Ideal para aprender a construir aplicaciones robustas con el framework Spring para Java."
      },
      {
        "id": 8,
        "title": "Clean Code",
        "subject": "Desarrollo Backend",
        "file": "/pdfs/backend4.pdf",
        "author": "Robert C. Martin",
        "description": "Enseña a escribir código limpio y fácil de mantener, útil especialmente en desarrollo backend."
      },
    
      // Diseño UX/UI
      {
        "id": 9,
        "title": "Don't Make Me Think",
        "subject": "Diseño UX/UI",
        "file": "/pdfs/uxui1.pdf",
        "author": "Steve Krug",
        "description": "Cómo diseñar interfaces web intuitivas y fáciles de navegar."
      },
      {
        "id": 10,
        "title": "The Design of Everyday Things",
        "subject": "Diseño UX/UI",
        "file": "/pdfs/uxui2.pdf",
        "author": "Don Norman",
        "description": "Principios fundamentales para crear productos fáciles de usar, desde una perspectiva humana."
      },
      {
        "id": 11,
        "title": "Lean UX",
        "subject": "Diseño UX/UI",
        "file": "/pdfs/uxui3.pdf",
        "author": "Jeff Gothelf",
        "description": "Cómo integrar los principios de UX con metodologías ágiles para mejorar la colaboración y la efectividad."
      },
      {
        "id": 12,
        "title": "Design Systems",
        "subject": "Diseño UX/UI",
        "file": "/pdfs/uxui4.pdf",
        "author": "Alla Kholmatova",
        "description": "Guía para crear sistemas de diseño consistentes, permitiendo experiencias de usuario de alta calidad."
      },
    
      // Marketing Digital
      {
        "id": 13,
        "title": "Marketing Digital para Dummies",
        "subject": "Marketing Digital",
        "file": "/pdfs/marketing1.pdf",
        "author": "Ryan Deiss, Russ Henneberry",
        "description": "Una guía accesible para aprender marketing digital, cubriendo desde la creación de contenido hasta la publicidad pagada y la analítica."
      },
      {
        "id": 14,
        "title": "Contagious: How to Build Word of Mouth in the Digital Age",
        "subject": "Marketing Digital",
        "file": "/pdfs/marketing2.pdf",
        "author": "Jonah Berger",
        "description": "Examina las razones por las cuales ciertos productos, ideas y comportamientos se vuelven virales, ofreciendo estrategias efectivas para crear marketing viral."
      },
      {
        "id": 15,
        "title": "Influence: The Psychology of Persuasion",
        "subject": "Marketing Digital",
        "file": "/pdfs/marketing3.pdf",
        "author": "Robert B. Cialdini",
        "description": "Aunque no es exclusivamente sobre marketing digital, este libro profundiza en las técnicas de persuasión que son fundamentales para el marketing y la venta."
      },
      {
        "id": 16,
        "title": "Jab, Jab, Jab, Right Hook",
        "subject": "Marketing Digital",
        "file": "/pdfs/marketing4.pdf",
        "author": "Gary Vaynerchuk",
        "description": "Un enfoque práctico sobre cómo usar las redes sociales para hacer crecer un negocio, con énfasis en la creación de contenido valioso y en la estrategia de marketing digital."
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
            <option value="Desarrollo Web Frontend">Desarrollo Web Frontend</option>
            <option value="Diseño UX/UI">Diseño UX/UI</option>
            <option value="Desarrollo Backend">Desarrollo Backend</option>
            <option value="Marketing Digital">Marketing Digital</option>
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
