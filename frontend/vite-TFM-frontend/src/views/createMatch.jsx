import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Obtener la URL base de la API
const apiUrl = import.meta.env.VITE_BACKEND_URL;

export const CreateMatch = () => {
	// Recoger datos pasados desde clubDetails (por ejemplo, location y dateTime)
	const locationNav = useLocation();
	const slotData = locationNav.state?.slotData || {};

	// Estado para los campos del formulario
	const [minLevel, setMinLevel] = useState(3);
	const [location, setLocation] = useState(slotData.location || "");
	const [dateTime, setDateTime] = useState(slotData.dateTime || "");
	const [matchType, setMatchType] = useState("_3X3");
	const navigate = useNavigate();

	// Función para manejar el submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		// Construir el objeto de datos para la API
		const matchData = {
			minLevel,
			location,
			dateTime,
			matchType,
		};
		try {
			const response = await fetch(`${apiUrl}/ms-matches/api/matches`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					targetMethod: "POST",
					queryParams: {},
					body: matchData
				})
			});
			if (response.ok) {
				// Tras crear el partido, automáticamente apuntar al creador del equipo
				const data = await response.json();
				handleJoinMatch(data.id);
				navigate("/clubs");
			} else {
				alert("Error al crear el partido");
			}
		} catch {
			alert("Error de conexión");
		}
	};

	const handleJoinMatch = async (id) => {
		const userId = localStorage.getItem("userId");
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
        } catch {
            alert("Error de conexión");
        }
	};

	return (
		<div className="container mt-5">
			<h2>Crear Partido</h2>
			{/* Mostrar info de fecha, hora y localización seleccionada */}
			<div className="alert alert-info">
				<strong>Fecha y hora seleccionada:</strong> {dateTime ? new Date(dateTime).toLocaleString() : "No seleccionada"}<br/>
				<strong>Localización:</strong> {location}
			</div>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label className="form-label">Nivel mínimo</label>
					<input type="number" className="form-control" value={minLevel} onChange={e => setMinLevel(Number(e.target.value))} min={1} max={10} required />
				</div>
				{/* Localización no editable si viene de slotData */}
				{/* Fecha y hora solo editable si no viene de slotData */}
				{!slotData.dateTime && (
					<div className="mb-3">
						<label className="form-label">Fecha y hora</label>
						<input type="datetime-local" className="form-control" value={dateTime} onChange={e => setDateTime(e.target.value)} required />
					</div>
				)}
				<div className="mb-3">
					<label className="form-label">Tipo de partido</label>
					<select className="form-control" value={matchType} onChange={e => setMatchType(e.target.value)} required>
						<option value="_3X3">3x3</option>{/* Value _3x3 porque lo pide el backend así */}
						<option value="_5X5">5x5</option>{/* Value _5x5 porque lo pide el backend así */}
					</select>
				</div>
				{/* El estado se calcula por backend, no editable por el usuario */}
				<button type="submit" className="btn btn-primary">Crear partido</button>
			</form>
		</div>
	);
};

export default CreateMatch;
