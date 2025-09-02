import { SearchBar } from "../components/searchBar";
import { useSearchBar } from "../hooks/useSearchBar";
import { useFetch } from "../hooks/useFetch";
import { useMemo } from "react";
import { useState } from "react";
import { MatchCard } from "../components/matchCard";

import { Locations } from "../components/locations";

export const Matches = () => {
    // Obtener el id del usuario
    const userId = localStorage.getItem("userId");

    // Peticion a API Rest para obtener partidos
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const { fetchResponse, error, loading } = useFetch(
        `${apiUrl}/ms-matches/api/matches`, 
        { 
            method: "GET",
            queryParams: {}, 
            body: {} 
        });

    // Extrae el array de partidos de la respuesta 
    const matches = useMemo(() => Array.isArray(fetchResponse) ? fetchResponse : fetchResponse?.matches || [], [fetchResponse]);


    // Filtros de estado
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [onlyOpen, setOnlyOpen] = useState(false);
    const [onlyMine, setOnlyMine] = useState(false);

    // Filtrar partidos según los filtros seleccionados
    const filteredMatches = useMemo(() => {
        return matches.filter(match => {
            // Localizacion del partido
            const locationOk = selectedLocation ? match.location === selectedLocation : true;
            // Tipo de partido (3x3 o 5x5)
            const typeOk = selectedType ? match.matchType === selectedType : true;
            // Buscar solo partidos a los que poder unirme
            const openOk = onlyOpen ? match.status === "OPEN" : true;
            // Buscar solo partidos en los que estoy apuntado (filtrar mis partido)
            let mineOk = true;
            if (onlyMine && userId) {
                if (Array.isArray(match.playersId)) {
                    mineOk = match.playersId.some(pid => pid == userId);
                } else {
                    mineOk = false;
                }
            }
            return locationOk && typeOk && openOk && mineOk;
        });
    }, [matches, selectedLocation, selectedType, onlyOpen, onlyMine, userId]);

    return(
        <div className="mt-4">
            <h2>Encuentra partidos en tu zona</h2>
            {loading && <p className="text-muted">Cargando...</p>}
            {error && <p className="text-danger">Error al cargar partidos</p>}
            {/* Filtros en una sola fila */}
            <div className="d-flex align-items-center mb-4">
                {/* Componente Locations para filtrar por localidad */}
                <div className="col-3">
                    <Locations location={selectedLocation} onLocationChange={e => setSelectedLocation(e.target.value)} />
                </div>
                {/* Dropdown de tipo de partido */}
                <select
                    className="form-select mx-2"
                    value={selectedType}
                    onChange={e => setSelectedType(e.target.value)}
                >
                    <option value="">Partidos</option>
                    <option value="_3X3">3x3</option>
                    <option value="_5X5">5x5</option>
                </select>
                {/* Botón para filtrar solo partidos OPEN */}
                <button
                    className={`btn mx-2 ${onlyOpen ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setOnlyOpen(prev => !prev)}
                >
                    {onlyOpen ? "Solo OPEN" : "Todos los estados"}
                </button>
                {/* Checkbox para filtrar solo partidos en los que estoy apuntado */}
                <div className="form-check mx-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="onlyMine"
                        checked={onlyMine}
                        onChange={e => setOnlyMine(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="onlyMine">
                        Mis partidos
                    </label>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {filteredMatches.length > 0 ? (
                    filteredMatches.map((element) => (
                        <div className="col" key={element.id}>
                                <MatchCard 
                                    key={element.id}
                                    id={element.id}
                                    minLevel={element.minLevel}
                                    matchType={element.matchType}
                                    status={element.status}
                                    location={element.location}
                                    playersId={element.playersId}
                                />
                        </div>
                    ))
                ) : (
                    <div className="col">
                        <p>No se encontraron partidos.</p>
                    </div>
                )}
            </div>
        </div>
    );
}