import { Link } from "react-router";

export const Header = () => {

    return (
        <header className="border-bottom bg-white">
            <div className="container container-xl d-flex align-items-center justify-content-between py-2">
                <div className="d-flex align-items-center">
                    <Link to="/clubs">
						<img src="/logo.png" alt="Logo" width="120" height="40" className="me-3" />
					</Link>
                </div>
                <div className="d-flex align-items-center">
                    <nav className="d-flex">
                        <Link to="/clubs" className="nav-link px-3">Clubes</Link>
                        <Link to="/matches" className="nav-link px-3">Partidos</Link>
                    </nav>
                    <Link to="/profile" className="ms-4">
                        <img src="/user.svg" width="32" height="32" alt="User Icon"/>
                    </Link>
                </div>
            </div>
        </header>
    );
}