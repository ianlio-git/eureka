import { useState, useEffect } from 'react';

const Reservas = () => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [classCount, setClassCount] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState(1);
    const [total, setTotal] = useState({
        amount: 0,
        interestRate: 0,
        finalAmount: 0,
        taxAmount: 0,
        totalWithTax: 0
    });
    const [showReserveButton, setShowReserveButton] = useState(false);
    const [taxRate] = useState(0.21);  // Tasa de IVA (21%)
    const [showModal, setShowModal] = useState(false);  // Estado para mostrar el modal

    // Cargar las materias desde el archivo JSON
    useEffect(() => {
        fetch('/json/clases.json')
            .then(response => response.json())
            .then(data => {
                setSubjects(data);
            })
            .catch(error => console.error('Error al cargar el JSON:', error));
    }, []);

    const handleSubjectChange = (event) => {
        const selected = subjects.find(subject => subject.price === parseFloat(event.target.value));
        setSelectedSubject(selected);
        setSelectedTeacher('');  // Reset teacher selection when subject changes
    };

    const handleTeacherChange = (event) => {
        setSelectedTeacher(event.target.value);
    };

    const handleClassCountChange = (event) => {
        setClassCount(Number(event.target.value));
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(Number(event.target.value));
    };

    const calculateTotal = () => {
        // Validación de campos
        if (!selectedSubject || !selectedTeacher || classCount < 1 || !paymentMethod) {
            alert("Por favor, completa todos los campos antes de continuar.");
            return;
        }

        const pricePerClass = selectedSubject.price;
        const totalCost = pricePerClass * classCount;
        let interestRate = 0;

        // Aplicamos el interés según el método de pago
        switch (paymentMethod) {
            case 3:
                interestRate = 0.05; // 5% de interés para 3 cuotas
                break;
            case 6:
                interestRate = 0.10; // 10% de interés para 6 cuotas
                break;
            case 12:
                interestRate = 0.15; // 15% de interés para 12 cuotas
                break;
            default:
                interestRate = 0; // Sin interés si es pago completo
        }

        const finalAmount = totalCost + (totalCost * interestRate);  // Total con interés aplicado
        const taxAmount = finalAmount * taxRate;  // Cálculo del IVA sobre el monto con interés
        const totalWithTax = finalAmount + taxAmount;  // Total final con IVA incluido

        // Actualizamos el estado total con los valores calculados
        setTotal({
            amount: totalCost,        // Costo base de las clases
            interestRate: interestRate * 100,  // Tasa de interés en porcentaje
            finalAmount: finalAmount, // Monto final con interés
            taxAmount: taxAmount,     // Monto de IVA
            totalWithTax: totalWithTax // Total final con IVA
        });

        setShowReserveButton(true); // Mostrar el botón de reserva
        setShowModal(true); // Mostrar el modal de confirmación
    };

    const handleReserve = () => {
        // Validación adicional al hacer la reserva
        if (!selectedSubject || !selectedTeacher || classCount < 1 || !paymentMethod) {
            alert("Por favor, completa todos los campos antes de hacer la reserva.");
            return;
        }

        // Guardar la reserva en el localStorage (o estado global)
        const newReservation = {
            subject: selectedSubject.name,
            teacher: selectedTeacher,
            classCount,
            paymentMethod,
            total: total.totalWithTax,
            paid: false // Al principio, la reserva no está pagada
        };

        let currentReservations = JSON.parse(localStorage.getItem('reservations')) || [];
        currentReservations.push(newReservation);
        localStorage.setItem('reservations', JSON.stringify(currentReservations));

        // Filtrar las reservas pendientes de pago
        const pendingPayments = currentReservations.filter(reservation => !reservation.paid);
        
        // Crear el mensaje de la alerta
        const pendingAlertMessage = pendingPayments.length > 0 ? pendingPayments.map(reservation => 
            `Curso: ${reservation.subject} - Profesor: ${reservation.teacher} - Total: $${reservation.total.toFixed(2)}`
        ).join("\n") : "No tienes reservas pendientes de pago.";

        // Mostrar una sola alerta con la confirmación de la reserva y las pendientes de pago
        alert(`¡Reserva realizada con éxito!\n\n${pendingAlertMessage}`);

        setShowModal(false);  // Cerrar el modal después de realizar la reserva
    };

    const closeModal = () => {
        setShowModal(false);  // Función para cerrar el modal
    };

    return (
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-2xl m-4">
            <h1 className="text-4xl font-bold text-center mb-6 text-verde-agua">Reservas</h1>
            <p className="text-lg mb-4 text-verde-agua">En Instituto Eureka, ofrecemos una plataforma sencilla y efectiva para realizar reservas de clases y tutores. Por favor, sigue los pasos a continuación para realizar tu reserva.</p>
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-verde-agua">Pasos para realizar una reserva:</h2>
            <ol className="list-decimal list-inside mb-6 text-verde-agua">
                <li className="mb-2">Selecciona un curso y profesor de tu interés.</li>
                <li className="mb-2">Indica la cantidad de clases que deseas reservar.</li>
                <li className="mb-2">Elige el método de pago que prefieres.</li>
                <li className="mb-2">Haz clic en &quot;Calcular Costo&quot; para ver el total de la reserva.</li>
                <li className="mb-2">Confirma tu reserva haciendo clic en &quot;Reservar&quot;.</li>
            </ol>

            <form id="reservation-form" className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <h2 className="text-2xl font-semibold mt-8 mb-4 text-verde-agua">Formulario de Reserva</h2>

                <div id="course-container" className="space-y-4">
                    <div className="subject-row flex flex-col bg-green-50 p-4 rounded-lg shadow">
                        <label className="text-verde-agua">Selecciona un Curso:</label>
                        <select
                            className="form-select subject-select mb-3 p-2 border border-green-300 rounded"
                            value={selectedSubject ? selectedSubject.price : ''}
                            onChange={handleSubjectChange}
                            required
                        >
                            <option disabled value="">Elegir un Curso</option>
                            {subjects.map(subject => (
                                <option key={subject.price} value={subject.price}>
                                    {subject.name} - ${subject.price} por 2 Clases
                                </option>
                            ))}
                        </select>

                        {selectedSubject && (
                            <>
                                <label className="text-verde-agua">Selecciona un Profesor:</label>
                                <select
                                    className="form-select teacher-select mb-3 p-2 border border-green-300 rounded"
                                    value={selectedTeacher}
                                    onChange={handleTeacherChange}
                                    required
                                >
                                    <option disabled value="">Elegir un Profesor</option>
                                    {selectedSubject.docentes.map((teacher, index) => (
                                        <option key={index} value={teacher}>{teacher}</option>
                                    ))}
                                </select>
                            </>
                        )}

                        <label className="text-verde-agua">Cantidad de Clases:</label>
                        <input
                            type="number"
                            className="form-control class-count mb-3 p-2 border border-green-300 rounded w-full"
                            placeholder="Clases"
                            min="1"
                            value={classCount}
                            onChange={handleClassCountChange}
                            required
                        />

                        <h4 className="font-semibold text-verde-agua mt-4">Método de Pago</h4>
                        <select
                            id="payment-method"
                            className="form-select mb-3 p-2 border border-green-300 rounded"
                            value={paymentMethod}
                            onChange={handlePaymentMethodChange}
                        >
                            <option value={1}>Pago Completo</option>
                            <option value={3}>3 Cuotas</option>
                            <option value={6}>6 Cuotas</option>
                            <option value={12}>12 Cuotas</option>
                        </select>

                        <div className="text-center mt-6">
                            <button
                                type="button"
                                className="btn-calcular p-3 bg-verde-agua text-white font-semibold rounded-lg"
                                onClick={calculateTotal}
                            >
                                Calcular Costo
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Modal de resumen de reserva */}
            {showModal && (
                <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="modal-content bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                        <h3 className="text-xl font-bold text-verde-agua mb-4">Resumen de la Reserva</h3>
                        <div className="text-verde-agua mb-4">
                            <p><strong>Curso:</strong> {selectedSubject.name}</p>
                            <p><strong>Profesor:</strong> {selectedTeacher}</p>
                            <p><strong>Cantidad de Clases:</strong> {classCount}</p>
                            <p><strong>Total (sin impuestos):</strong> ${total.amount}</p>
                            <p><strong>Interés:</strong> {total.interestRate}%</p>
                            <p><strong>Total con Interés:</strong> ${total.finalAmount}</p>
                            <p><strong>IVA (21%):</strong> ${total.taxAmount}</p>
                            <p><strong>Total Final:</strong> ${total.totalWithTax}</p>
                        </div>

                        <div className="text-center mt-6">
                            <button
                                className="btn-reservar p-3 bg-verde-agua text-white font-semibold rounded-lg"
                                onClick={handleReserve}
                            >
                                Reservar
                            </button>
                            <button
                                className="btn-cerrar mt-3 p-3 bg-red-500 text-white font-semibold rounded-lg"
                                onClick={closeModal}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reservas;
