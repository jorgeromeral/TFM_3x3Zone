import { Link } from "react-router-dom";

// Componente para mostrar la información de un club. El id se utiliza para mostrar despues los detalles
export const ClubCard = ({ id, name, location, address }) => (
    <div className="card shadow p-0 m-3 rounded-4 border-0 text-start bg-light">
        <div className= "rounded-top-4">
            <img
                src="club.jpg"
                alt={name}
                className="w-100 rounded-top-4 object-fit-cover d-block"
                height="190"
            />
        </div>
        <div className="card-body d-flex flex-column justify-content-between">
            <div>
                <h5 className="card-title fw-bold mb-2">{name}</h5>
                <p className="card-text mb-1">{location}</p>
                <p className="card-text text-muted mb-2">{address}</p>
            </div>
            <Link to={`/clubdetails/${id}`} className="btn btn-primary btn-lg mt-3 align-self-start rounded-pill">
                Reserva
            </Link>
        </div>
    </div>
);

export default ClubCard;
