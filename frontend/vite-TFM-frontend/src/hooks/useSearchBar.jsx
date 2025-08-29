import { useState, useEffect } from 'react';

export const useSearchBar = (elements, selectedLocation) => {
    const [query, setQuery] = useState('');
    const [filteredElements, setFilteredElements] = useState([]);

    useEffect(() => {
        setFilteredElements(
            elements.filter((element) =>
                element.name.toLowerCase().includes(query.toLowerCase()) &&
                (selectedLocation === "" || element.location === selectedLocation)
            )
        );
    }, [elements, query, selectedLocation]);

    const handleSearch = (event) => {
        setQuery(event.target.value);
    };

    return { query, handleSearch, filteredElements };
};