import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatBookingSlot } from "../utils/formatBookingSlot";

export const ClubDetails = () => {
    const { id } = useParams();
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    const { fetchResponse: clubResponse } = useFetch(
        `${apiUrl}/ms-clubs/api/clubs/${id}`,
        { method: "GET", queryParams: {}, body: {} }
    );
    const { fetchResponse: courtResponse, loading, error } = useFetch(
        `${apiUrl}/ms-clubs/api/courts/${id}`,
        { method: "GET", queryParams: {}, body: {} }
    );
    const [activeTab, setActiveTab] = useState(0);
    const [selectedDate, setSelectedDate] = useState("");
    const pistas = Array.isArray(courtResponse) ? courtResponse : courtResponse?.pistas || [];

    const courtId = pistas[activeTab]?.id;
    const bookingsUrl = courtId ? `${apiUrl}/ms-bookings/api/bookings/court/${courtId}` : null;
    const { fetchResponse: bookingsResponse, loading: bookingsLoading, error: bookingsError } = useFetch(
        bookingsUrl,
        { method: "GET", queryParams: {}, body: {} }
    );

    const handleBooking = async (booking) => {
        if (booking.available) {
            const response = await fetch(`${apiUrl}/ms-bookings/api/bookings/${booking.id}/reserve`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    targetMethod: "PATCH",
                    queryParams: {},
                    body: { available: false }
                })
            });
            if (response.ok) {
                alert("Reserva realizada");
            } else {
                alert("Error al reservar");
            }
        }
    };

    const navigate = useNavigate();
    const handleMatch = (booking) => {
        navigate("/createMatch", {
            state: {
                slotData: {
                    location: clubResponse?.location,
                    dateTime: booking.startDateTime
                }
            }
        });
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow mb-4">
                        <div className="card-body py-2 px-2 text-center">
                            <h2 className="card-title mb-3 text-primary text-center">Detalles de {clubResponse.name}</h2>
                            {clubResponse && (
                                <div className="mb-3">
                                    <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 py-1 px-2 rounded bg-light shadow-sm">
                                        <div className="d-flex align-items-center me-4">
                                            <i className="bi bi-geo-alt text-danger me-2 fw-bold">Localidad:</i>
                                            <span>{clubResponse.location}</span>
                                        </div>
                                        <div className="d-flex align-items-center me-4">
                                            <i className="bi bi-house-door text-success me-2 fw-bold">Dirección:</i>
                                            <span>{clubResponse.address}</span>
                                        </div>
                                        <div className="d-flex align-items-center me-4">
                                            <i className="bi bi-envelope text-warning me-2 fw-bold">Email:</i>
                                            <span>{clubResponse.email}</span>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-telephone text-info me-2 fw-bold">Teléfono:</i>
                                            <span>{clubResponse.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="card shadow mb-4">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-3 flex-wrap">
                                <h4 className="mb-0 mr-3">Pistas</h4>
                                {loading && <span className="ml-3 text-muted">Cargando pistas...</span>}
                                {error && <span className="ml-3 text-danger">Error al cargar pistas</span>}
                                <div className="ml-auto" style={{ minWidth: 180 }}>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={e => setSelectedDate(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <ul className="nav nav-pills mb-3">
                                {pistas.map((pista, index) => (
                                    <li className="nav-item" key={pista.id}>
                                        <button
                                            className={`nav-link ${activeTab === index ? "active" : ""}`}
                                            onClick={() => setActiveTab(index)}
                                        >
                                            {pista.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            {pistas[activeTab] && (
                                <div>
                                    <h5 className="mb-3">{pistas[activeTab].name}</h5>
                                    {bookingsLoading && <p className="text-muted">Cargando slots...</p>}
                                    {bookingsError && (!Array.isArray(bookingsResponse) || bookingsResponse.length === 0) && (
                                        <p className="text-danger">{bookingsError.message ? bookingsError.message : String(bookingsError)}</p>
                                    )}
                                    <div className="table-responsive">
                                        <table className="table table-hover table-bordered align-middle">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">Hora</th>
                                                    <th scope="col">Estado</th>
                                                    <th scope="col" className="text-center">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(bookingsResponse) && bookingsResponse.length > 0 ? (
                                                    bookingsResponse
                                                        .filter(booking => {
                                                            if (!selectedDate) return true;
                                                            const slotDate = new Date(booking.startDateTime).toISOString().slice(0, 10);
                                                            return slotDate === selectedDate;
                                                        })
                                                        .map((booking) => (
                                                            <tr key={booking.id}>
                                                                <td>{formatBookingSlot(booking)}</td>
                                                                <td>
                                                                    <span className={`badge ${booking.available ? "bg-success" : "bg-danger"}`}>
                                                                        {booking.available ? "Disponible" : "Ocupada"}
                                                                    </span>
                                                                </td>
                                                                <td className="text-center">
                                                                    <button
                                                                        onClick={() => handleBooking(booking)}
                                                                        className={`btn btn-sm ${booking.available ? "btn-success" : "btn-secondary"} me-2`}
                                                                        disabled={!booking.available}
                                                                    >
                                                                        Reservar
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleMatch(booking)}
                                                                        className={`btn btn-sm ${booking.available ? "btn-primary" : "btn-secondary"} ms-2`}
                                                                        disabled={!booking.available}
                                                                    >
                                                                        Crear partido
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="3" className="text-center text-muted">No hay slots disponibles</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClubDetails;
// ...existing code...