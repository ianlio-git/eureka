import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importamos useNavigate

const Libros = () => {
  const { id } = useParams(); // Accedemos al id del libro desde los parámetros de la URL
  const [bookDetails, setBookDetails] = useState(null);
  const navigate = useNavigate(); // hook para redirigir

  useEffect(() => {
    // Cargar el libro desde biblioteca.json usando el id de la URL
    fetch('/public/json/biblioteca.json')
      .then((response) => response.json())
      .then((data) => {
        // Buscar el libro con el id que se pasa en la URL
        const book = data.find((book) => book.id === parseInt(id)); // Asegúrate de comparar como entero
        setBookDetails(book);
      })
      .catch((error) => console.error('Error al cargar el libro:', error));
  }, [id]); // Volver a cargar los detalles cuando el id cambia

  if (!bookDetails) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl text-teal-600">Cargando...</p>
      </div>
    ); // Mostrar un mensaje mientras se cargan los detalles del libro
  }

  // Función para simular la descarga
  const handleDownload = () => {
    // Crear un archivo vacío o de prueba
    const fileContent = "Este es un archivo vacío de prueba.";
    const blob = new Blob([fileContent], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob); // Crear una URL para el archivo generado
    link.download = `${bookDetails.title}.pdf`; // Nombre del archivo de la "descarga"
    link.click(); // Simular el clic en el enlace para iniciar la descarga
  };

  return (
    <div className="bg-gradient-to-r from-teal-100 to-teal-50 flex flex-col justify-center items-center py-10">
      {/* Carátula del libro */}
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg mb-8">
        {/* Imagen de portada */}
        <div
          className="w-full h-96 bg-cover bg-center rounded-t-lg"
          style={{
            backgroundImage: `url(${bookDetails.image || 'https://via.placeholder.com/1500x500.png?text=Portada+Genérica'})`,
          }}
        ></div>

        {/* Contenido de la carátula */}
        <div className="p-8">
          {/* Título del libro */}
          <h1 className="text-4xl font-extrabold text-center text-teal-700 mb-4">{bookDetails.title}</h1>

          {/* Materia y Autor */}
          <ul className="text-sm text-gray-600 mb-6 space-y-2">
            <li>
              <strong>Materia:</strong> {bookDetails.subject}
            </li>
            <li>
              <strong>Autor:</strong> {bookDetails.author}
            </li>
          </ul>

          {/* Descripción del libro */}
          <p className="text-lg text-gray-700 mb-6">{bookDetails.description}</p>

          {/* Botones para descargar PDF y volver atrás */}
          <div className="flex justify-center space-x-6">
            {/* Botón para simular la descarga del PDF */}
            <button
              onClick={handleDownload} // Llamar a la función para simular la descarga
              className="inline-block px-8 py-4 bg-teal-600 text-white text-xl rounded-full hover:bg-teal-700 transition duration-300 ease-in-out shadow-lg"
            >
              Descargar PDF
            </button>

            {/* Botón Volver a Recursos */}
            <button
              onClick={() => navigate('/recursos')} // Redirigir a /recursos
              className="px-8 py-4 bg-gray-600 text-white text-xl rounded-full hover:bg-gray-700 transition duration-300 ease-in-out shadow-lg"
            >
              Volver a Recursos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Libros;
