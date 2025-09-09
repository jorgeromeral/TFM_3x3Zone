import { Link } from "react-router-dom";
import "../styles/clubCard.css";

// Componente para mostrar la información de un club
export const ClubCard = ({ id, name, location, address }) => (
    <div
        id="club_card"
        className="card shadow p-0 m-3 border-0 text-start bg-light"
        style={{
            backgroundImage: `url('club.jpg')`
        }}
    >
        <div className="club_card-content">
            <div style={{ minWidth: 0, flex: 1 }}>
                <div className="club_card-title">{name}</div>
                <div className="club_card-location">{location}</div>
                <div className="club_card-address">{address}</div>
            </div>
            <Link
                to={`/clubdetails/${id}`}
                className="btn btn-primary rounded-pill ms-2"
            >
                Reserva
            </Link>
        </div>
    </div>
);

export default ClubCard;