import { availableLocations } from "../assets/availableLocations";


// Dropdown de localidades españolas
export const Locations = ({ location, onLocationChange }) => {

    return (
        <select value={location} onChange={onLocationChange} className="form-select">
            <option value="">Selecciona una localidad</option>
            {availableLocations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
            ))}
        </select>
    );
}