import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ChangePass = () => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('userEmail');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Las contraseñas nuevas no coinciden');
        } else {
            try {
                const loginResponse = await fetch(`${apiUrl}/ms-users/api/users/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        targetMethod: "POST",
                        queryParams: {},
                        body: { email, password: oldPassword }
                    })
                });

                if (!loginResponse.ok) {
                    setError('La contraseña actual es incorrecta');
                } else {
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
        <div className="container my-5 d-flex flex-column align-items-center">
            <div className="col-12 col-md-8 col-lg-6">
                <div className="card shadow mb-4">
                    <div className="card-body py-2 px-2">
                        <h3 className="card-title mb-3 text-primary text-center">Cambiar contraseña</h3>
                        <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: 400, margin: "0 auto" }}>
                            <div className="mb-3 text-start">
                                <label className="form-label">Contraseña Actual</label>
                                <input type="password" className="form-control" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
                            </div>
                            <div className="mb-3 text-start">
                                <label className="form-label">Nueva contraseña</label>
                                <input type="password" className="form-control" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                            </div>
                            <div className="mb-3 text-start">
                                <label className="form-label">Confirmar nueva contraseña</label>
                                <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                            </div>
                            <div className="d-flex justify-content-center gap-3 mt-3">
                                <button type="submit" className="btn btn-primary">Actualizar</button>
                                <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancelar</button>
                            </div>
                        </form>
                        {success && <div className="alert alert-success mt-3 text-center">{success}</div>}
                        {error && <div className="alert alert-danger mt-3 text-center">{error}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}