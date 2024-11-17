
const Perfil = () => {
  const cursosVigentes = [
    { nombre: "Curso de React", fecha: "Lunes 10 AM" },
    { nombre: "Curso de Python", fecha: "Miércoles 2 PM" },
    { nombre: "Curso de Marketing Digital", fecha: "Viernes 9 AM" }
  ];

  // Función para determinar el día de la semana (Lunes a Viernes)
  const obtenerDia = (fecha) => {
    const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
    const dia = fecha.split(' ')[0]; // Obtiene solo el nombre del día
    return dias.indexOf(dia); // Devuelve el índice (0 para Lunes, 1 para Martes, etc.)
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* Contenedor principal */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Bienvenida y foto de perfil */}
        <div className="text-center mb-6">
          <img
            src="https://via.placeholder.com/150"
            alt="Foto de perfil"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-teal-600">¡Bienvenido, Carlos!</h1>
          <p className="text-lg text-gray-700 mt-2">
            ¡Qué bueno verte de nuevo! Aquí puedes ver tu agenda y los cursos que tienes que asistir esta semana.
          </p>
        </div>

        {/* Grilla semanal */}
        <div className="bg-teal-100 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-teal-600 text-center">Tu Agenda Semanal</h2>

          {/* Grilla de días */}
          <div className="grid grid-cols-5 gap-4 mt-6">
            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((dia, index) => {
              const cursosDelDia = cursosVigentes.filter((curso) => obtenerDia(curso.fecha) === index);
              return (
                <div
                  key={index}
                  className={`p-6 rounded-lg shadow-lg text-center ${
                    cursosDelDia.length > 0 ? "bg-teal-300" : "bg-gray-200"
                  }`}
                >
                  <h3 className="font-semibold text-teal-700">{dia}</h3>
                  {cursosDelDia.length > 0 ? (
                    <div className="text-sm text-gray-700 mt-4">
                      {cursosDelDia.map((curso, idx) => (
                        <p key={idx} className="mb-2">{curso.nombre}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No tienes curso</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Lista de cursos vigentes */}
        <div>
          <h2 className="text-xl font-semibold text-teal-600 mb-4">Cursos Vigentes</h2>
          <ul className="space-y-4">
            {cursosVigentes.map((curso, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">{curso.nombre}</h3>
                <p className="text-gray-600">{curso.fecha}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
