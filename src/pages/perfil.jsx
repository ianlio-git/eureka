import { useState, useEffect } from 'react';
import perfil from '../img/perfil.jpeg';

const Perfil = () => {
  const [cursosVigentes, setCursosVigentes] = useState([]);
  const [cursosFinalizados, setCursosFinalizados] = useState([]);
  const [cursosJson, setCursosJson] = useState([]);
  const [tabActivo, setTabActivo] = useState('vigentes'); // Estado para controlar la pestaña activa
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar el modal
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null); // Estado para almacenar el curso seleccionado

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('cursosVigentes')) || [];
    const storedCompletedCourses = JSON.parse(localStorage.getItem('cursosFinalizados')) || [];
    setCursosVigentes(storedCourses);
    setCursosFinalizados(storedCompletedCourses);

    // Cargar los cursos desde el JSON simulado
    fetch('/json/clases.json')
      .then((response) => response.json())
      .then((data) => setCursosJson(data));
  }, []);

  // Filtrar los cursos vigentes que fueron pagados
  const cursosPagados = cursosJson.filter((curso) =>
    cursosVigentes.some((cursoVigente) => cursoVigente.nombre === curso.name && cursoVigente.completado === false)
  );

  const cursosCompletados = cursosJson.filter((curso) =>
    cursosFinalizados.some((cursoFinalizado) => cursoFinalizado.nombre === curso.name && cursoFinalizado.completado === true)
  );

  // Función para marcar un curso como completado
  const marcarComoCompletado = (curso) => {
    // Eliminar curso de cursos vigentes
    const updatedVigentes = cursosVigentes.filter((item) => item.nombre !== curso.nombre);
    setCursosVigentes(updatedVigentes);
    localStorage.setItem('cursosVigentes', JSON.stringify(updatedVigentes));

    // Agregar curso a cursos finalizados con fecha de finalización y docente
    const updatedFinalizados = [
      ...cursosFinalizados,
      { ...curso, completado: true, fechaFinalizacion: new Date().toLocaleDateString(), docenteFinalizacion: 'Prof. Juan Pérez' },
    ];
    setCursosFinalizados(updatedFinalizados);
    localStorage.setItem('cursosFinalizados', JSON.stringify(updatedFinalizados));
  };

  // Función para abrir el modal y seleccionar el curso
  const abrirModal = (curso) => {
    setCursoSeleccionado(curso);
    setModalVisible(true);
  };

  // Función para cerrar el modal sin hacer cambios
  const cerrarModal = () => {
    setModalVisible(false);
    setCursoSeleccionado(null);
  };

  // Función para confirmar que el curso fue completado
  const confirmarCompletado = () => {
    if (cursoSeleccionado) {
      marcarComoCompletado(cursoSeleccionado);
      cerrarModal();
    }
  };

  // Crear la estructura de la semana con los cursos
  const generarSemana = () => {
    const semana = {
      Lunes: [],
      Martes: [],
      Miércoles: [],
      Jueves: [],
      Viernes: [],
    };

    cursosPagados.forEach((curso) => {
      curso.dias.forEach((dia) => {
        semana[dia].push({
          nombre: curso.name,
          horario: curso.horario,
          docentes: curso.docentes.join(', '),
        });
      });
    });

    return semana;
  };

  const semana = generarSemana();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Encabezado */}
        <div className="text-center mb-8">
          {/* Foto de perfil */}
          <img
            src={perfil} // Aquí debes asignar la ruta correcta de la imagen
            alt="Foto de perfil"
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-teal-600"
          />
          <h1 className="text-4xl font-extrabold text-teal-700 mb-8">¡Bienvenido Carlos!</h1>
        </div>

        {/* Mensaje de bienvenida e instrucciones */}
        <div className="mb-8">
          <p className="text-xl text-gray-700 mb-4 text-center">
            ¡Hola! Aquí puedes ver tu calendario semanal con las clases que has inscrito. <br />Además, podrás marcar los cursos como completados a medida que avanzas.
          </p>
          <p className="text-lg text-gray-600 text-center">
            A continuación, puedes ver tus cursos vigentes y finalizados. <br />Utiliza los títulos abajo para alternar entre las dos secciones.
          </p>
        </div>

        {/* Sección de la Semana Académica */}
        <h2 className="text-3xl font-semibold text-teal-600 mb-6 text-center">Mi Semana Académica</h2>

        {/* Tabla con la agenda semanal */}
        <div className="hidden sm:grid grid-cols-5 gap-6 mb-6">
          {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map((dia) => (
            <div key={dia} className="border-t pt-4">
              <h3 className="font-semibold text-teal-600 text-xl">{dia}</h3>
              {semana[dia].length > 0 ? (
                semana[dia].map((clase, index) => (
                  <div key={index} className="bg-teal-50 p-2 mb-2 rounded-lg shadow-md">
                    <h4 className="font-semibold text-teal-600">{clase.nombre}</h4>
                    <p className="text-sm text-gray-600">Horario: {clase.horario}</p>
                    <p className="text-xs text-gray-500">Docentes: {clase.docentes}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No hay clases</p>
              )}
            </div>
          ))}
        </div>

        {/* Formato para pantallas pequeñas */}
        <div className="sm:hidden grid grid-cols-1 gap-4 mb-6">
          {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map((dia) => (
            <div key={dia} className="border-t pt-4">
              <h3 className="font-semibold text-teal-600 text-xl">{dia}</h3>
              {semana[dia].length > 0 ? (
                semana[dia].map((clase, index) => (
                  <div key={index} className="bg-teal-50 p-2 mb-2 rounded-lg shadow-md">
                    <h4 className="font-semibold text-teal-600">{clase.nombre}</h4>
                    <p className="text-sm text-gray-600">Horario: {clase.horario}</p>
                    <p className="text-xs text-gray-500">Docentes: {clase.docentes}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No hay clases</p>
              )}
            </div>
          ))}
        </div>

        {/* Sección de cursos vigentes y finalizados */}
        <div className="flex justify-center mb-6">
          <h3
            onClick={() => setTabActivo('vigentes')}
            className={`text-2xl font-semibold cursor-pointer mx-4 text-teal-600 transition-colors duration-300 hover:text-teal-800 ${tabActivo === 'vigentes' ? 'border-b-2 border-teal-600' : ''}`}
          >
            Mis Cursos Vigentes
          </h3>
          <h3
            onClick={() => setTabActivo('finalizados')}
            className={`text-2xl font-semibold cursor-pointer mx-4 text-teal-600 transition-colors duration-300 hover:text-teal-800 ${tabActivo === 'finalizados' ? 'border-b-2 border-teal-600' : ''}`}
          >
            Mis Cursos Finalizados
          </h3>
        </div>

        {tabActivo === 'vigentes' ? (
          <ul className="space-y-4">
            {cursosVigentes.map((curso, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-5 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
                onClick={() => abrirModal(curso)} // Abrir el modal al hacer clic en un curso
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-teal-700 text-lg">{curso.nombre}</span>
                  <span className="text-gray-500 text-sm">Horario: {curso.horario}</span>
                  <span className="text-gray-500 text-sm">Docente: {curso.docente}</span>
                </div>
                <span className="text-teal-600 font-semibold text-lg">Finalizar</span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-4">
            {cursosFinalizados.map((curso, index) => (
              <li key={index} className="p-5 bg-gray-200 rounded-lg shadow-md">
                <div className="flex flex-col">
                  <span className="font-semibold text-teal-700 text-lg">{curso.nombre}</span>
                  <span className="text-gray-500 text-sm">Fecha de finalización: {curso.fechaFinalizacion}</span>
                  <span className="text-gray-500 text-sm">Docente: {curso.docenteFinalizacion}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal de confirmación */}
      {modalVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold text-teal-600 mb-4">Confirmación de Curso Completado</h3>
            <p>¿Estás seguro de que deseas marcar el curso "{cursoSeleccionado.nombre}" como completado?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-6 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors"
                onClick={cerrarModal}
              >
                Cancelar
              </button>
              <button
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                onClick={confirmarCompletado}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
