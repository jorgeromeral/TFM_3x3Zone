import { Link } from "react-router";



export const MatchCard = ({ minLevel, matchType, status }) => (
    <div className="card shadow p-0 m-3 rounded-4 border-0 text-start bg-light">
        <div className="card-body d-flex flex-column justify-content-between">
            <div>
                <h5 className="card-title fw-bold mb-2">Nivel Mínimo: {minLevel}</h5>
                <p className="card-text mb-1">Tipo de Partido: {matchType}</p>
                <p className="card-text text-muted mb-2">Estado: {status}</p>
            </div>
            <div>
                <Link className="btn btn-primary btn-lg mt-3 align-self-start">
                    Apuntarse
                </Link>
            </div>
        </div>
    </div>
);

export default MatchCard;
