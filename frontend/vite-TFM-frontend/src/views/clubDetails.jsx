import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Estado para la fecha seleccionada en el filtro
import { formatBookingSlot } from "../utils/formatBookingSlot";

export const ClubDetails = () => {
    // Usando el hook useParams para obtener el ID del club
    const { id } = useParams();
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    // Petición para obtener info del club y sus pistas
    const { fetchResponse: clubResponse} = useFetch(
        `${apiUrl}/ms-clubs/api/clubs/${id}`,
        { 
            method: "GET",
            queryParams: {},
            body: {}
        }
    );
    // Petición para obtener las pistas del club
    const { fetchResponse: courtResponse, loading, error } = useFetch(
        `${apiUrl}/ms-clubs/api/courts/${id}`,
        { 
            method: "GET",
            queryParams: {},
            body: {}
        }
    );
    // Estado para la pestaña activa
    const [activeTab, setActiveTab] = useState(0);
    // Estado para la fecha seleccionada
    const [selectedDate, setSelectedDate] = useState("");
    const pistas = Array.isArray(courtResponse) ? courtResponse : courtResponse?.pistas || [];

    // Petición para obtener los bookings de la pista activa
    const courtId = pistas[activeTab]?.id;
    const bookingsUrl = courtId ? `${apiUrl}/ms-bookings/api/bookings/court/${courtId}` : null;
    const { fetchResponse: bookingsResponse, loading: bookingsLoading, error: bookingsError } = useFetch(
        bookingsUrl,
        {
            method: "GET",
            queryParams: {},
            body: {}
        }
    );

    // Realizar reserva
    const handleBooking =  async (booking) => {
        if (booking.available){
            // Función para reservar un slot
            const response = await fetch(`${apiUrl}/ms-bookings/api/bookings/${booking.id}/reserve`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    targetMethod: "PATCH",
                    queryParams: {},
                    body: { available: false }
                })
            });
            // Opcional: puedes mostrar una confirmación o refrescar la lista de bookings
            if (response.ok) {
                alert("Reserva realizada");
            } else {
                alert("Error al reservar");
            }
        }
    };

    const navigate = useNavigate();
    const handleMatch = (booking) => {
        // Navegar a la vista de crear partido y pasar datos del slot
        navigate("/createMatch", {
            // Le pasamos la información del slot de reserva
            state: {
                slotData: {
                    location: clubResponse?.location,
                    dateTime: booking.startDateTime
                }
            }
        });
    };

    return (
        <div className="mt-4">
            <h2>Detalles del Club</h2>
            {clubResponse && (
                <div className="mb-4">
                    <h4>{clubResponse.name}</h4>
                    <p>{clubResponse.location}</p>
                    <p>{clubResponse.address}</p>
                    <div>
                        <h5>Contáctanos:</h5>
                        <p>{clubResponse.email}</p>
                        <p>{clubResponse.phone}</p>
                    </div>
                </div>
            )}
            <h4>Pistas</h4>
            {loading && <p>Cargando pistas...</p>}
            {error && <p>Error al cargar pistas</p>}
            <div className="d-flex mb-3 align-items-center">
                {pistas.map((pista, index) => (
                    <button
                        key={pista.id}
                        className={`btn btn-outline-primary mx-1 ${activeTab === index ? "active" : ""}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {pista.name}
                    </button>
                ))}
                {/* Filtro por día */}
                <div className="ml-auto mr-2">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                        className="form-control"
                    />
                </div>
            </div>
            {/* Horario y reservas de la pista activa */}
            {pistas[activeTab] && (
                <div>
                    <h6>{pistas[activeTab].name}</h6>
                    {bookingsLoading && <p>Cargando slots...</p>}
                    {bookingsError && (!Array.isArray(bookingsResponse) || bookingsResponse.length === 0) && (
                        <p className="text-danger">{bookingsError.message ? bookingsError.message : String(bookingsError)}</p>
                    )}
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Hora</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(bookingsResponse) && bookingsResponse.length > 0 ? (
                                    bookingsResponse
                                        .filter(booking => {
                                            if (!selectedDate) return true;
                                            // Formatear la fecha de inicio del slot a YYYY-MM-DD
                                            const slotDate = new Date(booking.startDateTime).toISOString().slice(0, 10);
                                            return slotDate === selectedDate;
                                        })
                                        .map((booking) => (
                                            <tr key={booking.id}>
                                                <td>{formatBookingSlot(booking)}</td>
                                                <td>{booking.available ? "Disponible" : "Ocupada"}</td>
                                                <td>
                                                    <button
                                                        onClick={() => handleBooking(booking)}
                                                        className={`btn btn-sm ${booking.available ? "btn-success" : "btn-secondary"}`}
                                                        disabled={!booking.available}
                                                    >
                                                        Reservar
                                                    </button>
                                                    <button
                                                        onClick={() => handleMatch(booking)}
                                                        className={`btn btn-sm mx-4 ${booking.available ? "btn-primary" : "btn-secondary"}`}
                                                        disabled={!booking.available}
                                                    >
                                                        Crear partido
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr><td colSpan="2">No hay slots disponibles</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClubDetails;
