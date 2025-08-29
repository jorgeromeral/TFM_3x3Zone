
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Login = () => {
    // Hooks para manejar el estado del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // Hook para redireccionar al loggearse
    const navigate = useNavigate();
    // URL de la API
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    // Cuando se envía el formulario, se manda petición login
    // No se usa useFetch ya que no se puede incluir en función asíncrona
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // Proceso de login si falla devolvemos error
        try {
            const response = await fetch(`${apiUrl}/ms-users/api/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    targetMethod: "POST",
                    queryParams: {},
                    body: { email, password }
                })
            });
            if (response.ok) {
                const { id, email } = await response.json(); // Obtenemos el valor del id devuelto por el backend
                localStorage.setItem('userId', id); // Guarda el id del usuario en localStorage para usarlo mas en adelante
                localStorage.setItem('userEmail', email); // Guarda el email del usuario en localStorage
                navigate('/clubs');
            } else {
                setError('Usuario o contraseña incorrectos');
            }
        } catch {
            setError('Error de conexión');
        }
    };

    return (
        <div className="container mt-5" id="login">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-center mb-4">
                                <h1 className="card-title text-center me-3 " id="login__h1">Bienvenido a </h1>
						        <img src="/logo.png" alt="Logo" width="135" height="45" />
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label w-100 text-start">Email:</label>
                                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="email" placeholder="Email" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label w-100 text-start">Contraseña:</label>
                                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="password" placeholder="Contraseña" required />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className="d-grid gap-2 mb-2">
                                    <button type="submit" className="btn btn-primary btn-xl">Login</button>
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="button" className="btn btn-secondary btn-xl" onClick={() => navigate('/signin')} id="login__link-signin">Crear Cuenta</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} // onchange actualiza el valor de email y password cuando cambia el input