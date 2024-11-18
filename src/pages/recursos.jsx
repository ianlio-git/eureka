import React from "react";

// Importación de imágenes locales
import imgVideos from "../img/videos.png";
import imgGuia from "../img/guiaact.png";
import imgLibros from "../img/libros.png";
import imgArticulos from "../img/articulos.png";

const Recursos = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Intro */}
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl text-center">
        <h1 className="text-2xl font-bold mb-4 text-teal-700">Catálogo de Recursos</h1>
        <p className="text-sm text-gray-600">
          Es una colección organizada de materiales diseñados para apoyar el aprendizaje,
          la enseñanza o el desarrollo personal.
        </p>
      </div>

      {/* Recursos */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tarjeta Libros */}
          <div className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
            <img src={imgLibros} alt="Libros" className="w-full h-32 object-cover rounded mb-2" />
            <h2 className="text-lg font-semibold text-teal-700">LIBROS</h2>
            <p className="text-sm text-gray-600 mb-2">
              Información detallada y profunda sobre un tema específico. Pueden ser manuales, textos académicos o narrativas que ofrecen un análisis exhaustivo. Los libros proporcionan fundamentos teóricos, estudios de caso, investigaciones y ejemplos prácticos.
            </p>
            <button className="bg-teal-600 text-white text-sm px-3 py-1 rounded hover:bg-teal-700">
              Ver más
            </button>
          </div>
          {/* Tarjeta Guías */}
          <div className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
            <img src={imgGuia} alt="Guías de actividades" className="w-full h-32 object-cover rounded mb-2" />
            <h2 className="text-lg font-semibold text-teal-700">GUÍAS DE ACTIVIDADES</h2>
            <p className="text-sm text-gray-600 mb-2">
            Son documentos prácticos que ofrecen instrucciones paso a paso para realizar actividades relacionadas con un tema. Estas guías pueden incluir ejercicios, juegos educativos, talleres, dinámicas de grupo o proyectos, y están diseñadas para facilitar la aplicación de conceptos teóricos en situaciones reales o de aprendizaje activo.
            </p>
            <button className="bg-teal-600 text-white text-sm px-3 py-1 rounded hover:bg-teal-700">
              Ver más
            </button>
          </div>
          {/* Tarjeta Videos */}
          <div className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
            <img src={imgVideos} alt="Videos" className="w-full h-32 object-cover rounded mb-2" />
            <h2 className="text-lg font-semibold text-teal-700">VIDEOS</h2>
            <p className="text-sm text-gray-600 mb-2">
            Proporcionan contenido visual y auditivo para facilitar la comprensión de temas complejos. Pueden incluir tutoriales, conferencias, entrevistas, demostraciones o documentales. Los videos permiten una comprensión más dinámica y atractiva de los contenidos, a menudo presentando información de manera visual y con ejemplos concretos.
            </p>
            <button className="bg-teal-600 text-white text-sm px-3 py-1 rounded hover:bg-teal-700">
              Ver más
            </button>
          </div>
          {/* Tarjeta Artículos */}
          <div className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
            <img src={imgArticulos} alt="Artículos" className="w-full h-32 object-cover rounded mb-2" />
            <h2 className="text-lg font-semibold text-teal-700">ARTÍCULOS</h2>
            <p className="text-sm text-gray-600 mb-2">
            Son escritos más breves que los libros, con información concisa y actualizada sobre un tema específico. Suelen ser investigaciones, estudios o reflexiones que aportan puntos de vista, estadísticas, datos recientes o análisis sobre tendencias actuales. Los artículos son útiles para obtener una visión general rápida o información específica de un área en particular.
            </p>
            <button className="bg-teal-600 text-white text-sm px-3 py-1 rounded hover:bg-teal-700">
              Ver más
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Recursos;
