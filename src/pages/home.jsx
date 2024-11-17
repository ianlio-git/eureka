import inicioImg from '../img/inicio1.png';
import coverImg from '../img/cover-Small.png';

const Home = () => {
  return (
    <div className="container mx-auto my-10 p-8 bg-gradient-to-r from-white via-gray-100 to-white rounded-2xl shadow-2xl max-w-5xl flex flex-col items-center">
      {/* Quienes Somos Section */}
      <div className="bg-white p-8 rounded-2xl shadow-lg mb-12 w-full transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
        <h2 className="text-4xl font-bold mt-4 mb-6 text-verde-agua text-center">
          Quienes Somos
        </h2>
        <div className="content-wrapper flex flex-col md:flex-row gap-8 items-center">
          <div className="content-image flex-1 mb-4 md:mb-0">
            <img
              src={inicioImg}
              alt="Equipo del Instituto Eureka"
              className="w-full rounded-xl shadow-md transition-transform transform hover:scale-105"
            />
          </div>
          <div className="content-text flex-1 text-center md:text-left">
            <p className="text-lg leading-relaxed text-gray-700">
              En el instituto Eureka tenemos un equipo comprometido con el éxito académico de nuestros alumnos. Ofrecemos clases de apoyo personalizadas en diversas materias, adaptadas a tus necesidades y ritmo de aprendizaje.
            </p>
            <p className="text-lg leading-relaxed mt-4 text-gray-700">
              Nuestro objetivo es brindarte las herramientas necesarias para superar tus desafíos académicos, reforzar tus conocimientos y alcanzar tus metas. ¡Aprender nunca fue tan fácil!
            </p>
          </div>
        </div>
      </div>

      {/* Nuestros Servicios Section */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
        <h2 className="text-4xl font-bold mt-4 mb-6 text-verde-agua text-center">
          Nuestros Servicios
        </h2>
        <div className="content-wrapper flex flex-col md:flex-row gap-8 items-center">
          <div className="content-text flex-1 text-center md:text-left">
            <p className="mb-4 text-lg text-gray-700">
              Ofrecemos clases de apoyo académico diseñadas para ayudarte a superar cualquier reto universitario:
            </p>
            <ul className="list-disc ml-6 text-left text-gray-700">
              <li className="mb-2">Clases personalizadas: Adaptadas a tu ritmo y necesidades específicas.</li>
              <li className="mb-2">Asesoría en diversas materias: Matemáticas, física, economía, programación, entre otras.</li>
              <li className="mb-2">Preparación para exámenes: Estrategias y revisión de contenidos clave.</li>
              <li className="mb-2">Ayuda con tareas y proyectos: Te guiamos paso a paso para lograr los mejores resultados.</li>
              <li className="mb-2">Modalidad flexible: Clases presenciales u online según tu comodidad.</li>
            </ul>
          </div>
          <div className="content-image flex-1">
            <img
              src={coverImg}
              alt="Nuestros servicios"
              className="w-full rounded-xl shadow-md transition-transform transform hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
