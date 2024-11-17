import { useState } from 'react';

const Contacto = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '', // Agregamos el campo de asunto
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenir la acción predeterminada del formulario
        alert('¡Tu consulta ha sido enviada exitosamente!'); // Mostrar la alerta
        // Aquí puedes agregar lógica para enviar los datos a un servidor si lo deseas.
        setFormData({ name: '', email: '', subject: '', message: '' }); // Limpiar el formulario después de enviarlo
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-4xl font-bold text-center text-teal-600 mb-6">Contacto</h1>
                <p className="text-lg text-gray-700 text-center mb-8">
                    Si tienes alguna duda o necesitas más información, no dudes en ponerte en contacto con nosotros. ¡Estamos aquí para ayudarte!
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-lg font-semibold text-gray-700 mb-2">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Tu nombre"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-lg font-semibold text-gray-700 mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Tu correo electrónico"
                        />
                    </div>

                    {/* Campo de Asunto */}
                    <div className="flex flex-col">
                        <label htmlFor="subject" className="text-lg font-semibold text-gray-700 mb-2">Asunto</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Asunto de tu mensaje"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="message" className="text-lg font-semibold text-gray-700 mb-2">Mensaje</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Escribe tu mensaje aquí"
                            rows="5"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition-colors"
                    >
                        Enviar Consulta
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contacto;
