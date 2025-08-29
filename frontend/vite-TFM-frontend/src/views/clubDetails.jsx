import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useState } from "react";

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
    // Petición para obtener reservas de las pistas
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
    const pistas = Array.isArray(courtResponse) ? courtResponse : courtResponse?.pistas || [];

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
            <div className="d-flex mb-3">
                {pistas.map((pista, index) => (
                    <button
                        key={pista.id}
                        className={`btn btn-outline-primary mx-1 ${activeTab === index ? "active" : ""}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {pista.name}
                    </button>
                ))}
            </div>
            {/* Horario y reservas de la pista activa */}
            {pistas[activeTab] && (
                <div>
                    <h6>{pistas[activeTab].name}</h6>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Hora</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pistas[activeTab].reservas?.map((reserva, i) => (
                                    <tr key={i}>
                                        <td>{reserva.hora}</td>
                                        <td>{reserva.ocupada ? "Ocupada" : "Disponible"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClubDetails;
