import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ChangePass = () => {
    // URL de la API
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    // ID y email del usuario guardado tras login
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('userEmail');

    // Estados para el formulario con las distintas contraseñas
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

    // Estados para manejar mensajes de éxito y error
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');

        // Validar contraseña nueva con la de confirmación
        if (newPassword !== confirmPassword) {
            setError('Las contraseñas nuevas no coinciden');
        } else {
            // Validar la contraseña actual con el backend (realizando login falso)
            try {
                const loginResponse = await fetch(`${apiUrl}/ms-users/api/users/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        targetMethod: "POST",
                        queryParams: {},
                        // Pongo password: oldPassword porque al ser campo "password"
                        // el backend espera que se llame "password"
                        body: { email, password: oldPassword } 
                    })
                });

                // Si la respuesta es correcta --> contraseña actual válida
                if (!loginResponse.ok) {
                    setError('La contraseña actual es incorrecta');
                } else {
                    // Si la contraseña actual es correcta, actualiza la contraseña
                    const response = await fetch(`${apiUrl}/ms-users/api/users/${userId}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            targetMethod: 'PATCH',
                            queryParams: {},
                            body: { password: newPassword }
                        })
                    });

                    if (response.ok) {
                        setSuccess('Contraseña actualizada correctamente');
                        setOldPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                        navigate('/');
                    } else {
                        setError('Error al actualizar la contraseña');
                    }
                }
            } catch {
                setError('Error de conexión');
            }
        }
    }

    return (
        <div className="container mt-5">
            <h2>Cambiar contraseña</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Contraseña Actual</label>
                    <input type="password" className="form-control" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
                    <label className="form-label">Nueva contraseña</label>
                    <input type="password" className="form-control" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                    <label className="form-label">Confirmar nueva contraseña</label>
                    <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Actualizar</button>
            </form>
            {success && <div className="alert alert-success mt-3">{success}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
}