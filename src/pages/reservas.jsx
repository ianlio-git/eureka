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
    const [taxRate] = useState(0.21);

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

        switch (paymentMethod) {
            case 3:
                interestRate = 0.05;
                break;
            case 6:
                interestRate = 0.10;
                break;
            case 12:
                interestRate = 0.15;
                break;
            default:
                interestRate = 0;
        }

        const finalAmount = totalCost + (totalCost * interestRate);
        const taxAmount = finalAmount * taxRate;
        const totalWithTax = finalAmount + taxAmount;

        // Actualizamos el estado total con los valores calculados
        setTotal({
            amount: totalCost,
            interestRate: interestRate * 100,
            finalAmount: finalAmount,
            taxAmount: taxAmount,
            totalWithTax: totalWithTax
        });

        setShowReserveButton(true);
    };

    const handleReserve = () => {
        // Validación adicional al hacer la reserva
        if (!selectedSubject || !selectedTeacher || classCount < 1 || !paymentMethod) {
            alert("Por favor, completa todos los campos antes de hacer la reserva.");
            return;
        }

        alert('Reserva realizada con éxito');
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
                                    {subject.name} - ${subject.price} por clase
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
                            required
                        >
                            <option value="1">Efectivo</option>
                            <option value="3">3 cuotas (5% Interés)</option>
                            <option value="6">6 cuotas (10% Interés)</option>
                            <option value="12">12 cuotas (15% Interés)</option>
                        </select>

                        <button
                            type="button"
                            className="btn btn-success bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={calculateTotal}
                        >
                            Calcular Costo
                        </button>
                    </div>
                </div>

                {total.amount > 0 && (
                    <div id="result" className="mt-4 alert alert-info bg-green-100 border border-green-400 text-verde-agua px-4 py-3 rounded">
                        <strong>Total: </strong>${total.amount.toFixed(2)}<br />
                        <strong>Cantidad de Cuotas: </strong>{paymentMethod}<br />
                        <strong>Intereses: </strong>{total.interestRate.toFixed(2)}%<br />
                        <strong>Pago Final: </strong>${total.finalAmount.toFixed(2)}<br />
                        <strong>Impuesto (21%): </strong>${total.taxAmount.toFixed(2)}<br />
                        <strong>Total con Impuestos: </strong>${total.totalWithTax.toFixed(2)}
                    </div>
                )}

                {showReserveButton && (
                    <button
                        id="reserve-button"
                        type="button"
                        className="btn btn-success bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-8 w-full rounded"
                        onClick={handleReserve}
                    >
                        Reservar
                    </button>
                )}
            </form>
        </div>
    );
};

export default Reservas;
