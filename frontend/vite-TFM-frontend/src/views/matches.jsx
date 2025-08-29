import { SearchBar } from "../components/searchBar";
import { useSearchBar } from "../hooks/useSearchBar";
import { useFetch } from "../hooks/useFetch";
import { useMemo } from "react";
import { useState } from "react";
import { MatchCard } from "../components/matchCard";

export const Matches = () => {

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
    // Se usa useMemo para memorizar el resultado en cada render y evitar bucles
    const matches = useMemo(() => Array.isArray(fetchResponse) ? fetchResponse : fetchResponse?.matches || [], [fetchResponse]);

    // Filtros:
    // - Filtrado por localidad
    //const [selectedLocation, setSelectedLocation] = useState("");


    return(
        <div className="mt-4">
            <h2>Encuentra partidos en tu zona</h2>
            
            {loading && <p className="text-muted">Cargando...</p>} {/*Si loading es true */}
            {error && <p className="text-danger">Error al cargar partidos</p>} {/*Si error es true */}
            
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {matches.length > 0 ? (
                    matches.map((element) => (
                        <div className="col" key={element.id}>
                            <MatchCard 
                                key={element.id}
                                minLevel={element.minLevel}
                                matchType={element.matchType}
                                status={element.status}
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