import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";

export const Profile = () => {
    // URL API GATEWAY
    const apiUrl = import.meta.env.VITE_BACKEND_URL; 
    // ID del usuario guardado en login
    const userId = localStorage.getItem('userId');
    // Modo para editar campos usuario
    const [editMode, setEditMode] = useState(false);

    // Navegar tras eliminar cuenta
    const navigate = useNavigate();

    // Estados para los campos del formulario
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [location, setLocation] = useState('');
    const [level, setLevel] = useState(1);
    const [role, setRole] = useState('PLAYER');

    // GET by ID para obtener perfil usuario
    const { fetchResponse } = useFetch(
        `${apiUrl}/ms-users/api/users/${userId}`, 
        { 
            method: "GET",
            queryParams: {}, 
            body: {} 
        }
    );

    // Establecer valores a campos correspondientes
    useEffect(() => {
        if (fetchResponse) {
            setEmail(fetchResponse.email);
            setName(fetchResponse.name);
            setSurname(fetchResponse.surname);
            setLocation(fetchResponse.location);
            setLevel(fetchResponse.level);
            setRole(fetchResponse.role);
        }
    }, [fetchResponse]);

    // Activar modo edicion
    const handleEdit = () => {
        setEditMode(true);
    };

    // Desactivar modo edicion
    const handleCancel = () => {
        setEditMode(false);
    };

    // Guardar cambios (PATCH API)
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/ms-users/api/users/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    targetMethod: 'PATCH',
                    queryParams: {},
                    body: { email, name, surname, location, level, role }
                })
            });
            if (response.ok) {
                setEditMode(false);
            } else {
                alert('Error al actualizar el perfil');
            }
        } catch (err) {
            alert('Error de conexión');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${apiUrl}/ms-users/api/users/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    targetMethod: 'DELETE',
                    queryParams: {},
                    body: {}
                })
            });
            if (response.ok) {
                alert('Cuenta eliminada');
                navigate('/');
            } else {
                alert('Error al eliminar la cuenta');
            }
        } catch (err) {
            alert('Error de conexión');
        }
    };

    return (
    <div className="container my-5 d-flex flex-column align-items-center">
        <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow mb-4">
                <div className="card-body py-2 px-2">
                    <div className="d-flex flex-column align-items-center mb-3">
                        <div className="position-relative">
                            <img src="user.svg" alt="Foto de perfil" className="rounded-circle border border-2" width={120} height={120} />
                            {!editMode && (
                                <button
                                    className="btn btn-light position-absolute top-0 end-0"
                                    onClick={handleEdit}
                                    aria-label="Editar perfil"
                                    style={{ transform: "translate(30%, -30%)" }}
                                >
                                    <img src="/edit.svg" alt="Editar" width={24} height={24} />
                                </button>
                            )}
                        </div>
                    </div>
                    <h3 className="card-title mb-3 text-primary text-center">Perfil de Usuario</h3>
                    <div className="d-flex flex-column align-items-center">
                        <div className="w-100" style={{ maxWidth: 400 }}>
                            {editMode ? (
                                <form onSubmit={handleSave}>
                                    <div className="mb-3 text-start">
                                        <label className="form-label">Nombre</label>
                                        <input type="text" className="form-control" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                    </div>
                                    <div className="mb-3 text-start">
                                        <label className="form-label">Apellidos</label>
                                        <input type="text" className="form-control" name="surname" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                                    </div>
                                    <div className="mb-3 text-start">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="mb-3 text-start">
                                        <label className="form-label">Localidad</label>
                                        <input type="text" className="form-control" name="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                                    </div>
                                    <div className="mb-3 text-start">
                                        <label className="form-label">Nivel</label>
                                        <input type="number" className="form-control" name="level" value={level} onChange={(e) => setLevel(e.target.value)} />
                                    </div>
                                    <div className="mb-3 text-start">
                                        <label className="form-label">Rol</label>
                                        <input type="text" className="form-control" name="role" value={role} onChange={(e) => setRole(e.target.value)} />
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <button type="submit" className="btn btn-primary">Guardar</button>
                                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                                    </div>
                                </form>
                            ) : (
                                <div className="text-start">
                                    <div className="mb-2">
                                        <strong>Nombre:</strong> {name}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Apellidos:</strong> {surname}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Email:</strong> {email}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Localidad:</strong> {location}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Nivel:</strong> {level}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Rol:</strong> {role}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center gap-3 mt-3">
                <Link className="btn btn-secondary" to="/changePass">Cambiar Contraseña</Link>
                <button className="btn btn-danger" onClick={handleDelete}>Eliminar Cuenta</button>
            </div>
        </div>
    </div>
    );
}

