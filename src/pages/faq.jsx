import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import './faq.css'; // Agregado

const Faq = () => {
    const navigate = useNavigate(); // Inicializa el hook useNavigate

    // Función que maneja la redirección a las páginas
    const handleNavigate = (page) => {
        navigate(`/${page}`); // Redirige al path correspondiente
    };

    return (
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-3xl m-4"> {/* Agregado m-4 */}
            <h1 className="text-4xl font-bold text-center mb-6 text-verde-agua">Preguntas Frecuentes (FAQ)</h1>
            
            <p className="text-lg mb-4 text-gray-700">
                Aquí encontrarás respuestas a las preguntas más comunes sobre nuestros cursos y servicios en Instituto Eureka. Si tienes más dudas, no dudes en contactarnos.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-verde-agua">Preguntas Comunes</h2>

            <div className="space-y-4">
                <div className="faq-item bg-gray-50 rounded-lg shadow-md p-4" tabIndex="0">
                    <label className="text-lg font-semibold text-gray-800">
                        1. ¿Cómo puedo realizar una reserva?
                    </label>
                    <p className="faq-answer text-gray-700">
                        Puedes realizar una <span className="text-verde-agua underline cursor-pointer" onClick={() => handleNavigate('reservas')}>reserva</span> a través de nuestra página de reservas, donde encontrarás un formulario sencillo para completar con tus datos. Asegúrate de seleccionar el curso y la fecha deseada.
                    </p>
                </div>

                <div className="faq-item bg-gray-50 rounded-lg shadow-md p-4" tabIndex="0">
                    <label className="text-lg font-semibold text-gray-800">
                        2. ¿Qué cursos ofrecen?
                    </label>
                    <p className="faq-answer text-gray-700">
                        Ofrecemos cursos en diversas áreas, incluyendo matemáticas, programación, ciencias y habilidades blandas. Consulta la <span className="text-verde-agua underline cursor-pointer" onClick={() => handleNavigate('cursos')}>sección de Cursos y Tutores</span> para más detalles.
                    </p>
                </div>

                <div className="faq-item bg-gray-50 rounded-lg shadow-md p-4" tabIndex="0">
                    <label className="text-lg font-semibold text-gray-800">
                        3. ¿Puedo cambiar la fecha de mi reserva?
                    </label>
                    <p className="faq-answer text-gray-700">
                        Sí, puedes cambiar la fecha de tu reserva contactándonos directamente. Asegúrate de hacerlo con al menos 24 horas de antelación para evitar inconvenientes.
                    </p>
                </div>

                <div className="faq-item bg-gray-50 rounded-lg shadow-md p-4" tabIndex="0">
                    <label className="text-lg font-semibold text-gray-800">
                        4. ¿Ofrecen clases en línea?
                    </label>
                    <p className="faq-answer text-gray-700">
                        Sí, todos nuestros cursos están disponibles en línea, permitiéndote aprender desde la comodidad de tu hogar. También ofrecemos <span className="text-verde-agua underline cursor-pointer" onClick={() => handleNavigate('recursos')}>recursos</span> adicionales para mejorar tu aprendizaje.
                    </p>
                </div>

                <div className="faq-item bg-gray-50 rounded-lg shadow-md p-4" tabIndex="0">
                    <label className="text-lg font-semibold text-gray-800">
                        5. ¿Qué métodos de pago aceptan?
                    </label>
                    <p className="faq-answer text-gray-700">
                        Aceptamos diversas formas de pago, incluyendo tarjetas de crédito, débito y transferencias bancarias. Para más detalles, visita nuestra <span className="text-verde-agua underline cursor-pointer" onClick={() => handleNavigate('pagos')}>sección de Métodos de Pago</span>.
                    </p>
                </div>

                <div className="faq-item bg-gray-50 rounded-lg shadow-md p-4" tabIndex="0">
                    <label className="text-lg font-semibold text-gray-800">
                        6. ¿Qué sucede si no puedo asistir a una clase?
                    </label>
                    <p className="faq-answer text-gray-700">
                        Si no puedes asistir a una clase, te recomendamos que nos lo informes con anticipación. Ofrecemos opciones de recuperación y acceso a grabaciones de las clases, dependiendo del curso. Para más detalles, contáctanos directamente.
                    </p>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-gray-600">¿Tienes dudas? <span className="text-verde-agua underline cursor-pointer" onClick={() => handleNavigate('contacto')}>Contáctanos</span> para más información.</p>
            </div>
        </div>
    );
};

export default Faq;
