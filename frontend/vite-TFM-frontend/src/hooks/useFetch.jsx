import { useEffect, useState } from "react";

// Peticion a API Rest
export const useFetch = (url, { method = "GET", queryParams = {}, body = {} } = {}) => {

    const [fetchResponse, setFetchResponse] = useState("...");
    const [error, setError] = useState(null); // Mostrar si hay error
    const [loading, setLoading] = useState(true); // Para mostrar si se está procesando la petición

    // Siempre POST por motivos de seguridad (Gateway ACL)
    useEffect(() => {
        const fetchRequest = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, {
                    method: "POST", // Siempre POST al gateway
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        targetMethod: method,
                        queryParams,
                        body
                    })
                });
                const data = await response.json();
                setFetchResponse(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchRequest();
        // Se ejecutará cuando alguno de estos cambie
    }, [url, method, JSON.stringify(queryParams), JSON.stringify(body)]);

    return { fetchResponse, error, loading };
};