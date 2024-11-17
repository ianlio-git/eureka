import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Usamos el hook useNavigate para redirigir

const Recursos = () => {
  const navigate = useNavigate(); // Hook para navegar programáticamente
  const [recursosData, setRecursosData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 8;

  useEffect(() => {
    fetch('/json/biblioteca.json')
      .then((response) => response.json())
      .then((data) => setRecursosData(data))
      .catch((error) => console.error('Error al cargar los datos de los libros:', error));
  }, []);

  const filteredResources = recursosData.filter((resource) => {
    return resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           resource.subject.toLowerCase().includes(selectedSubject.toLowerCase());
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
