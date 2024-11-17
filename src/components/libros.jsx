import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importamos useNavigate

const recursos = [
  { "id": 1, "title": "Cálculo Diferencial y Integral", "subject": "Matemática", "file": "/pdfs/matematica1.pdf", "author": "Juan Pérez", "description": "Este libro cubre los principios básicos del cálculo diferencial e integral." },
  { "id": 2, "title": "Álgebra Lineal", "subject": "Matemática", "file": "/pdfs/matematica2.pdf", "author": "Ana Gómez", "description": "Un enfoque completo sobre álgebra lineal con ejemplos resueltos." },
  { "id": 3, "title": "Geometría Analítica", "subject": "Matemática", "file": "/pdfs/matematica3.pdf", "author": "Carlos López", "description": "Guía de geometría analítica, enfocada en las aplicaciones prácticas." },
  { "id": 4, "title": "Teoría de Números", "subject": "Matemática", "file": "/pdfs/matematica4.pdf", "author": "Pedro Sánchez", "description": "Una introducción a la teoría de números con ejemplos y ejercicios." },
  { "id": 5, "title": "Física General", "subject": "Física", "file": "/pdfs/fisica1.pdf", "author": "María Rodríguez", "description": "Fundamentos de física general, con explicaciones claras y concisas." },
  { "id": 6, "title": "Mecánica Clásica", "subject": "Física", "file": "/pdfs/fisica2.pdf", "author": "Luis Martínez", "description": "Un enfoque profundo sobre la mecánica clásica, ideales para estudiantes avanzados." },
  { "id": 7, "title": "Termodinámica", "subject": "Física", "file": "/pdfs/fisica3.pdf", "author": "Laura Pérez", "description": "Todo lo que necesitas saber sobre termodinámica, desde lo básico hasta lo avanzado." },
  { "id": 8, "title": "Electromagnetismo", "subject": "Física", "file": "/pdfs/fisica4.pdf", "author": "José Ruiz", "description": "Una introducción a la teoría electromagnética y sus aplicaciones." },
  { "id": 9, "title": "Química Orgánica", "subject": "Química", "file": "/pdfs/quimica1.pdf", "author": "Carlos García", "description": "Explora los principios fundamentales de la química orgánica con énfasis en los compuestos de carbono." },
  { "id": 10, "title": "Química Inorgánica", "subject": "Química", "file": "/pdfs/quimica2.pdf", "author": "Sofía González", "description": "Este libro cubre los conceptos básicos de la química inorgánica y sus aplicaciones." },
  { "id": 11, "title": "Físico-Química", "subject": "Química", "file": "/pdfs/quimica3.pdf", "author": "Ricardo Pérez", "description": "Un análisis detallado de las interacciones químicas desde el punto de vista físico." },
  { "id": 12, "title": "Bioquímica", "subject": "Química", "file": "/pdfs/quimica4.pdf", "author": "Clara Ruiz", "description": "Una introducción a la bioquímica, ideal para estudiantes de ciencias biológicas." },
  { "id": 13, "title": "Gramática Inglesa", "subject": "Inglés", "file": "/pdfs/ingles1.pdf", "author": "John Smith", "description": "Un repaso completo de la gramática inglesa, desde lo más básico hasta niveles avanzados." },
  { "id": 14, "title": "Inglés para Todos", "subject": "Inglés", "file": "/pdfs/ingles2.pdf", "author": "Jane Doe", "description": "Guía práctica para aprender inglés de manera fácil y accesible." },
  { "id": 15, "title": "Inglés Intermedio", "subject": "Inglés", "file": "/pdfs/ingles3.pdf", "author": "Chris Green", "description": "Contenido adecuado para estudiantes de nivel intermedio que desean mejorar su fluidez." },
  { "id": 16, "title": "Inglés Avanzado", "subject": "Inglés", "file": "/pdfs/ingles4.pdf", "author": "Patricia Blue", "description": "Para estudiantes avanzados que buscan perfeccionar su inglés escrito y hablado." },
  { "id": 17, "title": "Estadística para Todos", "subject": "Matemática", "file": "/pdfs/matematica5.pdf", "author": "María Ruiz", "description": "Una guía de estadística con ejemplos prácticos y explicaciones detalladas." },
  { "id": 18, "title": "Física Cuántica", "subject": "Física", "file": "/pdfs/fisica5.pdf", "author": "Daniel Martínez", "description": "Introducción a los principios fundamentales de la mecánica cuántica." },
  { "id": 19, "title": "Química Analítica", "subject": "Química", "file": "/pdfs/quimica5.pdf", "author": "Verónica Díaz", "description": "Fundamentos de la química analítica, cubriendo técnicas y métodos esenciales." },
  { "id": 20, "title": "Química Biológica", "subject": "Química", "file": "/pdfs/quimica6.pdf", "author": "Andrés Pérez", "description": "Una exploración de la química en los procesos biológicos." }
];

const Libros = () => {
  const { id } = useParams(); // Accedemos al id del libro desde los parámetros de la URL
  const [bookDetails, setBookDetails] = useState(null);
  const navigate = useNavigate(); // hook para redirigir

  useEffect(() => {
    // Encontramos el libro con el id proporcionado desde los parámetros de la URL
    const book = recursos.find((book) => book.id === parseInt(id)); // Comparamos el id como entero
    if (book) {
      setBookDetails(book);
    } else {
      console.error('No se encontró el libro con el id proporcionado');
    }
  }, [id]); // Solo recargamos cuando cambia el id

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
    link.href = URL.createObjectURL(blob);
    link.download = `${bookDetails.title}.pdf`;
    link.click();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
              onClick={handleDownload}
              className="inline-block px-8 py-4 bg-teal-600 text-white text-xl rounded-full hover:bg-teal-700 transition duration-300 ease-in-out shadow-lg"
            >
              Descargar PDF
            </button>
            {/* Botón para volver atrás */}
            <button
              onClick={() => navigate('/recursos')} // Redirigir al inicio
              className="inline-block px-8 py-4 bg-gray-600 text-white text-xl rounded-full hover:bg-gray-700 transition duration-300 ease-in-out shadow-lg"
            >
              Volver al Recursos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Libros;
