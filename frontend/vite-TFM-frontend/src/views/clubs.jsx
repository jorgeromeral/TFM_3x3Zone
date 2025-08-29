import { SearchBar } from "../components/searchBar";
import { ClubCard } from "../components/clubCard";
import { useSearchBar } from "../hooks/useSearchBar";
import { useFetch } from "../hooks/useFetch";
import { useMemo } from "react";
import { useState } from "react";

export const Clubs = () => {

    // Peticion a API Rest para obtener clubes
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const { fetchResponse, error, loading } = useFetch(
        `${apiUrl}/ms-clubs/api/clubs`, 
        { 
            method: "GET",
            queryParams: {}, 
            body: {} 
        }
    );

    // Extrae el array de clubes de la respuesta 
    // Se usa useMemo para memorizar el resultado en cada render y evitar bucles
    const clubs = useMemo(() => Array.isArray(fetchResponse) ? fetchResponse : fetchResponse?.clubs || [], [fetchResponse]);
    
    // Filtros:
    // - Filtrado por localidad
    const [selectedLocation, setSelectedLocation] = useState("");
    // - Manejo de la barra de búsqueda para filtrar clubes
    const { query, handleSearch, filteredElements } = useSearchBar(clubs, selectedLocation);


    return(
        <div className="mt-4">
            <h2>Encuentra clubes en tu zona</h2>
            
            <SearchBar 
                query={query} 
                handleSearch={handleSearch} 
                location={selectedLocation}
                onLocationChange={e => setSelectedLocation(e.target.value)} 
            />
            
            {loading && <p className="text-muted">Cargando...</p>} {/*Si loading es true */}
            {error && <p className="text-danger">Error al cargar clubes</p>} {/*Si error es true */}
            
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {filteredElements.length > 0 ? (
                    filteredElements.map((element) => (
                        <div className="col" key={element.id}>
                            <ClubCard 
                                key={element.id}
                                id={element.id}
                                name={element.name}
                                location={element.location}
                                address={element.address}
                            />
                        </div>
                    ))
                ) : (
                    <div className="col">
                        <p>No se encontraron clubes.</p>
                    </div>
                )}
            </div>
        </div>
    );
}