import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Locations } from '../components/locations';

export const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [location, setLocation] = useState('');
    const [level, setLevel] = useState(1);
    const [role, setRole] = useState('PLAYER');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault(); // evita que el formulario recargue la página al enviarse.
        setError(''); // Limpiar errores

        // Comprobar mail correcto
        if (!email.includes('@')) {
        setError('El email no es válido');
        return;
        }

        // Comprobar contraseñas iguales
        if (password !== password2) {
            setError('Las contraseñas no coinciden');
            return;
        }
        try {
            const response = await fetch(`${apiUrl}/ms-users/api/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    targetMethod: "POST",
                    queryParams: {},
                    body: { email, password, name, surname, location, level, role }
                })
            });
            if (response.ok) {
                navigate('/'); // Ir a login
            } else {
                setError('Error al crear la cuenta');
            }
        } catch {
            setError('Error de conexión');
        }
    };

    return (
        <div className="container mt-5" id="signin">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="card-title text-center mb-4" id="signin__h1">Crear Cuenta</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="email" className="form-label text-start w-100">*Email:</label>
                                        <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="password" className="form-label text-start w-100">*Contraseña:</label>
                                        <input type="password" className="form-control" id="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="password2" className="form-label text-start w-100">*Repetir Contraseña:</label>
                                        <input type="password" className="form-control" id="password2" placeholder="Repetir Contraseña" value={password2} onChange={e => setPassword2(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="name" className="form-label text-start w-100">*Nombre:</label>
                                        <input type="text" className="form-control" id="name" placeholder="Nombre"value={name} onChange={e => setName(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="surname" className="form-label text-start w-100">*Apellidos:</label>
                                        <input type="text" className="form-control" id="surname" placeholder="Apellidos" value={surname} onChange={e => setSurname(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="location" className="form-label text-start w-100">*Localidad:</label>
                                        <Locations location={location} onLocationChange={e => setLocation(e.target.value)} required/>
                                    </div>
                                    <div className="col-md-2 mb-3">
                                        <label htmlFor="level" className="form-label text-start w-100">*Nivel:</label>
                                        <input type="number" className="form-control" id="level" min="1" max="10" value={level} onChange={e => setLevel(e.target.value)} required />
                                    </div>
                                    <div className="col-md-4 mb-4">
                                        <label htmlFor="role" className="form-label text-start w-100">*Rol:</label>
                                        <select className="form-select" id="role" value={role} onChange={e => setRole(e.target.value)} required>
                                            <option value="PLAYER">PLAYER</option>
                                            <option value="CLUB">CLUB</option>
                                            {/*La opcion de usuario admin no se puede seleccionar desde aqui */}
                                        </select>
                                    </div>
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>} {/* Si error existe: mostrar mensaje*/}
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary btn-xl">Crear Cuenta</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}