import { useState, useEffect } from 'react';

const Pagos = () => {
  const [reservations, setReservations] = useState([]);
  const [activeTab, setActiveTab] = useState('pendientes'); // Estado para controlar la tab activa
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [selectedReservation, setSelectedReservation] = useState(null); // Estado para la reserva seleccionada
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    acceptedTerms: false,
  });
  const [cursosVigentes, setCursosVigentes] = useState([]); // Lista de cursos vigentes del perfil

  useEffect(() => {
    const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    setReservations(storedReservations);
    const storedCourses = JSON.parse(localStorage.getItem('cursosVigentes')) || [];
    setCursosVigentes(storedCourses);
  }, []);

  const handlePayment = (reservation) => {
    // Establecer la reserva seleccionada y mostrar el modal
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCardInfo({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
      acceptedTerms: false,
    });
  };

  const handleCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!cardInfo.acceptedTerms) {
      alert('Debe aceptar los términos y condiciones.');
      return;
    }

    // Marcar como pagado y cerrar el modal
    const updatedReservations = reservations.map((reservation) => {
      if (reservation === selectedReservation) {
        return { ...reservation, paid: true };
      }
      return reservation;
    });

    // Actualizar los cursos vigentes
    const updatedCursosVigentes = [...cursosVigentes, {
      nombre: selectedReservation.subject,
      fecha: 'Fecha del pago',
      completado: false,
    }];

    // Actualizar el estado de reservas y cursos en el localStorage
    setReservations(updatedReservations);
    setCursosVigentes(updatedCursosVigentes);
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
    localStorage.setItem('cursosVigentes', JSON.stringify(updatedCursosVigentes));

    alert('Pago realizado con éxito');
    handleModalClose();
  };

  const pendingPayments = reservations.filter(reservation => !reservation.paid);
  const paidPayments = reservations.filter(reservation => reservation.paid);

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-4xl m-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-verde-agua">Gestión de Pagos</h1>

      {/* Botones de navegación entre tabs */}
      <div className="flex justify-center space-x-8 mb-6">
        <button
          onClick={() => setActiveTab('pendientes')}
          className={`py-3 px-6 rounded-lg font-medium text-lg transition-all duration-300 ${activeTab === 'pendientes' ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg' : 'bg-teal-100 text-teal-700 hover:bg-teal-200'}`}
        >
          Pagos Pendientes
        </button>
        <button
          onClick={() => setActiveTab('realizados')}
          className={`py-3 px-6 rounded-lg font-medium text-lg transition-all duration-300 ${activeTab === 'realizados' ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg' : 'bg-teal-100 text-teal-700 hover:bg-teal-200'}`}
        >
          Pagos Realizados
        </button>
      </div>

      {/* Sección de Pagos Pendientes */}
      {activeTab === 'pendientes' && (
        <div>
          <h2 className="text-3xl font-semibold text-verde-agua mb-6">Pagos Pendientes</h2>
          {pendingPayments.length > 0 ? (
            <div className="space-y-4">
              {pendingPayments.map((reservation, index) => (
                <div key={index} className="flex justify-between items-center p-5 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
                  <div className="flex flex-col space-y-2">
                    <span className="font-semibold text-verde-agua text-lg">{reservation.subject}</span>
                    <span className="text-gray-600">Profesor: {reservation.teacher}</span>
                    <span className="font-medium text-gray-800">Total a pagar: ${reservation.total.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => handlePayment(reservation)}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                  >
                    Pagar
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg text-gray-500">No tienes pagos pendientes.</p>
          )}
        </div>
      )}

      {/* Sección de Pagos Realizados */}
      {activeTab === 'realizados' && (
        <div>
          <h2 className="text-3xl font-semibold text-verde-agua mb-6">Pagos Realizados</h2>
          {paidPayments.length > 0 ? (
            <div className="space-y-4">
              {paidPayments.map((reservation, index) => (
                <div key={index} className="flex justify-between items-center p-5 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
                  <div className="flex flex-col space-y-2">
                    <span className="font-semibold text-verde-agua text-lg">{reservation.subject}</span>
                    <span className="text-gray-600">Profesor: {reservation.teacher}</span>
                    <span className="font-medium text-gray-800">Total Pagado: ${reservation.total.toFixed(2)}</span>
                  </div>
                  <span className="text-teal-600 font-semibold">Pagado</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg text-gray-500">No hay pagos realizados.</p>
          )}
        </div>
      )}

      {/* Modal para el formulario de pago */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold text-teal-600 mb-6">Detalles del Pago</h2>
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-gray-700">Número de Tarjeta</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={cardInfo.cardNumber}
                  onChange={handleCardInfoChange}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                  placeholder="Ingrese el número de tarjeta"
                  required
                />
              </div>
              <div>
                <label htmlFor="cardHolder" className="block text-gray-700">Titular de la tarjeta</label>
                <input
                  type="text"
                  id="cardHolder"
                  name="cardHolder"
                  value={cardInfo.cardHolder}
                  onChange={handleCardInfoChange}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                  placeholder="Nombre del titular"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="expiryDate" className="block text-gray-700">Fecha de expiración</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={cardInfo.expiryDate}
                    onChange={handleCardInfoChange}
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                    placeholder="MM/AA"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="cvv" className="block text-gray-700">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={cardInfo.cvv}
                    onChange={handleCardInfoChange}
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                    placeholder="CVV"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="acceptedTerms" className="flex items-center">
                  <input
                    type="checkbox"
                    id="acceptedTerms"
                    name="acceptedTerms"
                    checked={cardInfo.acceptedTerms}
                    onChange={(e) => setCardInfo({ ...cardInfo, acceptedTerms: e.target.checked })}
                    className="mr-2"
                  />
                  Acepto los términos y condiciones
                </label>
              </div>
              <div className="flex justify-between items-center mt-6">
                <button type="button" onClick={handleModalClose} className="py-2 px-6 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg">Cancelar</button>
                <button type="submit" className="py-2 px-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg">Confirmar Pago</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagos;
