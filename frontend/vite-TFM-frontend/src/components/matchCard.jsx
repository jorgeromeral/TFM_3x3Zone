
// Obtener la URL base de la API
const apiUrl = import.meta.env.VITE_BACKEND_URL;






export const MatchCard = ({ id, minLevel, matchType, status, location, playersId }) => {
    const userId = localStorage.getItem("userId");
    const isJoined = Array.isArray(playersId) && playersId.map(String).includes(String(userId));

    // Función para apuntarse al partido
    const handleJoinMatch = async () => {
        if (!userId) {
            alert("No se ha encontrado el usuario");
            return;
        }
        try {
            const response = await fetch(`${apiUrl}/ms-matches/api/matches/${id}/join?playerId=${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    targetMethod: "PATCH",
                    queryParams: {},
                    body: {}
                })
            });
            if (response.ok) {
                alert("Te has apuntado al partido correctamente");
            } else {
                alert("Error al apuntarse al partido");
            }
        } catch {
            alert("Error de conexión");
        }
    };

    // Función para desapuntarse del partido {{gateway_host}}/ms-matches/api/matches/{{id_match}}/leave?playerId={{id_user}}
    const handleLeaveMatch = async () => {
        try {
            const response = await fetch(`${apiUrl}/ms-matches/api/matches/${id}/leave?playerId=${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    targetMethod: "PATCH",
                    queryParams: {},
                    body: {}
                })
            });
            if (response.ok) {
                alert("Te has desapuntado del partido");
            } else {
                alert("Error al desapuntarse del partido");
            }
        } catch {
            alert("Error de conexión");
        }
    };

    return (
        <div className="card shadow p-0 m-3 rounded-4 border-0 text-start bg-light position-relative">
            <div className="card-body d-flex flex-column justify-content-between">
                <div>
                    <div className="position-absolute top-0 end-0 translate-middle bg-white rounded-circle shadow border border-secondary d-flex align-items-center justify-content-center fw-bold" style={{ width: '48px', height: '48px', fontSize: '18px' }}>
                        {Array.isArray(playersId) ? playersId.length : 0}
                    </div>
                    <h5 className="card-title fw-bold mb-2">Nivel Mínimo: {minLevel}</h5>
                    <p className="card-text mb-1">Tipo de Partido: {matchType}</p>
                    <p className="card-text mb-1">Localización: {location || "-"}</p>
                    <p className="card-text text-muted mb-2">Estado: {status}</p>
                </div>
                <div className="d-flex gap-2 mt-3">
                    <button className="btn btn-primary btn-lg" onClick={handleJoinMatch} disabled={isJoined}>
                        Apuntarse
                    </button>
                    {isJoined && (
                        <button className="btn btn-danger btn-lg" onClick={handleLeaveMatch}>
                            Desapuntarse
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MatchCard;
