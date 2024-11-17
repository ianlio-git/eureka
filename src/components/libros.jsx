import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importamos useNavigate

const recursos = [
  { "id": 1, "title": "HTML y CSS: Diseño y Construcción de Páginas Web", "subject": "Desarrollo Web Frontend", "file": "/pdfs/frontend1.pdf", "author": "Jon Duckett", "description": "Un enfoque claro y conciso para aprender los principios fundamentales del diseño y desarrollo web utilizando HTML y CSS." },
  { "id": 2, "title": "JavaScript: The Good Parts", "subject": "Desarrollo Web Frontend", "file": "/pdfs/frontend2.pdf", "author": "Douglas Crockford", "description": "Un análisis profundo sobre las características más poderosas y útiles de JavaScript, ayudando a escribir código limpio y eficiente." },
  { "id": 3, "title": "Eloquent JavaScript", "subject": "Desarrollo Web Frontend", "file": "/pdfs/frontend3.pdf", "author": "Marijn Haverbeke", "description": "Una introducción al lenguaje JavaScript para desarrolladores de todos los niveles, cubriendo desde conceptos básicos hasta temas más avanzados." },
  { "id": 4, "title": "React Up and Running", "subject": "Desarrollo Web Frontend", "file": "/pdfs/frontend4.pdf", "author": "Stoyan Stefanov", "description": "Guía para dominar React, una de las bibliotecas más populares de JavaScript para construir interfaces de usuario interactivas." },
  { "id": 5, "title": "Node.js Design Patterns", "subject": "Desarrollo Backend", "file": "/pdfs/backend1.pdf", "author": "Mario Casciaro", "description": "Explora patrones de diseño para crear aplicaciones escalables y eficientes con Node.js." },
  { "id": 6, "title": "The Pragmatic Programmer", "subject": "Desarrollo Backend", "file": "/pdfs/backend2.pdf", "author": "Andrew Hunt, David Thomas", "description": "Consejos sobre cómo escribir software de alta calidad, aplicables a todos los aspectos del desarrollo backend." },
  { "id": 7, "title": "Spring in Action", "subject": "Desarrollo Backend", "file": "/pdfs/backend3.pdf", "author": "Craig Walls", "description": "Ideal para aprender a construir aplicaciones robustas con el framework Spring para Java." },
  { "id": 8, "title": "Clean Code", "subject": "Desarrollo Backend", "file": "/pdfs/backend4.pdf", "author": "Robert C. Martin", "description": "Enseña a escribir código limpio y fácil de mantener, útil especialmente en desarrollo backend." },
  { "id": 9, "title": "Don't Make Me Think", "subject": "Diseño UX/UI", "file": "/pdfs/uxui1.pdf", "author": "Steve Krug", "description": "Cómo diseñar interfaces web intuitivas y fáciles de navegar." },
  { "id": 10, "title": "The Design of Everyday Things", "subject": "Diseño UX/UI", "file": "/pdfs/uxui2.pdf", "author": "Don Norman", "description": "Principios fundamentales para crear productos fáciles de usar, desde una perspectiva humana." },
  { "id": 11, "title": "Lean UX", "subject": "Diseño UX/UI", "file": "/pdfs/uxui3.pdf", "author": "Jeff Gothelf", "description": "Cómo integrar los principios de UX con metodologías ágiles para mejorar la colaboración y la efectividad." },
  { "id": 12, "title": "Design Systems", "subject": "Diseño UX/UI", "file": "/pdfs/uxui4.pdf", "author": "Alla Kholmatova", "description": "Guía para crear sistemas de diseño consistentes, permitiendo experiencias de usuario de alta calidad." },
  { "id": 13, "title": "Marketing Digital para Dummies", "subject": "Marketing Digital", "file": "/pdfs/marketing1.pdf", "author": "Ryan Deiss, Russ Henneberry", "description": "Una guía accesible para aprender marketing digital, cubriendo desde la creación de contenido hasta la publicidad pagada y la analítica." },
  { "id": 14, "title": "Contagious: How to Build Word of Mouth in the Digital Age", "subject": "Marketing Digital", "file": "/pdfs/marketing2.pdf", "author": "Jonah Berger", "description": "Examina las razones por las cuales ciertos productos, ideas y comportamientos se vuelven virales, ofreciendo estrategias efectivas para crear marketing viral." },
  { "id": 15, "title": "Influence: The Psychology of Persuasion", "subject": "Marketing Digital", "file": "/pdfs/marketing3.pdf", "author": "Robert B. Cialdini", "description": "Aunque no es exclusivamente sobre marketing digital, este libro profundiza en las técnicas de persuasión que son fundamentales para el marketing y la venta." },
  { "id": 16, "title": "Jab, Jab, Jab, Right Hook", "subject": "Marketing Digital", "file": "/pdfs/marketing4.pdf", "author": "Gary Vaynerchuk", "description": "Un enfoque práctico sobre cómo usar las redes sociales para hacer crecer un negocio, con énfasis en la creación de contenido valioso y en la estrategia de marketing digital." }
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
