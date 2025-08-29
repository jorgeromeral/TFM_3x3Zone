import "../styles/searchbar.css";
import { Locations } from "./locations";
import { useState } from "react";

export const SearchBar = ({ query, handleSearch, location, onLocationChange }) => {


    return (
        <div className="search-bar-container">
            <div className="flex-grow-1">
                <input type="text" placeholder="Buscar..." value={query} onChange={handleSearch} className="search-bar__input" />
            </div>
            <div className="ms-3">
                <Locations location={location} onLocationChange={onLocationChange} />
            </div>
        </div>
    );
};
