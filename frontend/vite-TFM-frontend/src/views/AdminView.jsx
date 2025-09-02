import React, { useState, useEffect } from "react";

const AdminView = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  // Estado para el formulario de club
  const [club, setClub] = useState({
    name: "",
    location: "",
    address: "",
    email: "",
    phone: "",
    ownerId: ""
  });
  const [clubId, setClubId] = useState("");
  const [message, setMessage] = useState("");

  // Crear club
  const handleCreateClub = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch(`${apiUrl}/ms-clubs/api/clubs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetMethod: "POST",
          queryParams: {},
          body: club
        })
      });
      if (response.ok) {
        setMessage("Club creado correctamente");
      } else {
        setMessage("Error al crear el club");
      }
    } catch {
      setMessage("Error de conexión");
    }
  };

  // Actualizar club
  const handleUpdateClub = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!clubId) return setMessage("Debes indicar el ID del club");
    try {
      const response = await fetch(`${apiUrl}/ms-clubs/api/clubs/${clubId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetMethod: "PUT",
          queryParams: {},
          body: club
        })
      });
      if (response.ok) {
        setMessage("Club actualizado correctamente");
      } else {
        setMessage("Error al actualizar el club");
      }
    } catch {
      setMessage("Error de conexión");
    }
  };

  // Eliminar club
  const handleDeleteClub = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!clubId) return setMessage("Debes indicar el ID del club");
    try {
      const response = await fetch(`${apiUrl}/ms-clubs/api/clubs/${clubId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetMethod: "DELETE",
          queryParams: {},
          body: {}
        })
      });
      if (response.ok) {
        setMessage("Club eliminado correctamente");
      } else {
        setMessage("Error al eliminar el club");
      }
    } catch {
      setMessage("Error de conexión");
    }
  };

  // Estado para el formulario de pista
  const [court, setCourt] = useState({
    name: "",
    courtType: "",
    openingTime: "",
    closingTime: "",
    slotMinutes: ""
  });
  const [courtId, setCourtId] = useState("");
  const [clubIdForCourt, setClubIdForCourt] = useState("");

  // Crear pista
  const handleCreateCourt = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!clubIdForCourt) return setMessage("Debes indicar el ID del club");
    try {
      const response = await fetch(`${apiUrl}/ms-clubs/api/courts/${clubIdForCourt}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetMethod: "POST",
          queryParams: {},
          body: court
        })
      });
      if (response.ok) {
        setMessage("Pista creada correctamente");
      } else {
        setMessage("Error al crear la pista");
      }
    } catch {
      setMessage("Error de conexión");
    }
  };

  // Actualizar pista
  const handleUpdateCourt = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!courtId) return setMessage("Debes indicar el ID de la pista");
    try {
      const response = await fetch(`${apiUrl}/ms-clubs/api/courts/${courtId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetMethod: "PATCH",
          queryParams: {},
          body: court
        })
      });
      if (response.ok) {
        setMessage("Pista actualizada correctamente");
      } else {
        setMessage("Error al actualizar la pista");
      }
    } catch {
      setMessage("Error de conexión");
    }
  };

  // Eliminar pista
  const handleDeleteCourt = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!courtId) return setMessage("Debes indicar el ID de la pista");
    try {
      const response = await fetch(`${apiUrl}/ms-clubs/api/courts/${courtId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetMethod: "DELETE",
          queryParams: {},
          body: {}
        })
      });
      if (response.ok) {
        setMessage("Pista eliminada correctamente");
      } else {
        setMessage("Error al eliminar la pista");
      }
    } catch {
      setMessage("Error de conexión");
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-2">Vista de Administrador</h1>
      <p className="text-center mb-4">Solo el admin puede ver esto.</p>

      <div className="mb-5">
        <h2 className="mb-3">Crear Club</h2>
        <form onSubmit={handleCreateClub} className="row g-2 align-items-center mb-3">
          <div className="col"><input type="text" className="form-control" placeholder="Nombre" value={club.name} onChange={e => setClub({...club, name: e.target.value})} required /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Localización" value={club.location} onChange={e => setClub({...club, location: e.target.value})} required /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Dirección" value={club.address} onChange={e => setClub({...club, address: e.target.value})} required /></div>
          <div className="col"><input type="email" className="form-control" placeholder="Email" value={club.email} onChange={e => setClub({...club, email: e.target.value})} required /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Teléfono" value={club.phone} onChange={e => setClub({...club, phone: e.target.value})} required /></div>
          <div className="col"><input type="number" className="form-control" placeholder="Owner ID" value={club.ownerId} onChange={e => setClub({...club, ownerId: e.target.value})} required /></div>
          <div className="col-auto"><button type="submit" className="btn btn-primary">Crear Club</button></div>
        </form>
      </div>

      <div className="mb-5">
        <h2 className="mb-3">Actualizar Club</h2>
        <form onSubmit={handleUpdateClub} className="row g-2 align-items-center mb-3">
          <div className="col"><input type="text" className="form-control" placeholder="ID del club" value={clubId} onChange={e => setClubId(e.target.value)} required /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Nombre" value={club.name} onChange={e => setClub({...club, name: e.target.value})} required /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Localización" value={club.location} onChange={e => setClub({...club, location: e.target.value})} required /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Dirección" value={club.address} onChange={e => setClub({...club, address: e.target.value})} required /></div>
          <div className="col"><input type="email" className="form-control" placeholder="Email" value={club.email} onChange={e => setClub({...club, email: e.target.value})} required /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Teléfono" value={club.phone} onChange={e => setClub({...club, phone: e.target.value})} required /></div>
          <div className="col"><input type="number" className="form-control" placeholder="Owner ID" value={club.ownerId} onChange={e => setClub({...club, ownerId: e.target.value})} required /></div>
          <div className="col-auto"><button type="submit" className="btn btn-warning">Actualizar Club</button></div>
        </form>
      </div>

      <div className="mb-5">
        <h2 className="mb-3">Eliminar Club</h2>
        <form onSubmit={handleDeleteClub} className="row g-2 align-items-center mb-3">
          <div className="col"><input type="text" className="form-control" placeholder="ID del club" value={clubId} onChange={e => setClubId(e.target.value)} required /></div>
          <div className="col-auto"><button type="submit" className="btn btn-danger">Eliminar Club</button></div>
        </form>
      </div>

      <hr className="my-5" />

      <div className="mb-5">
        <h2 className="mb-3">Crear Pista</h2>
        <form onSubmit={handleCreateCourt} className="row g-2 align-items-center mb-3">
          <div className="col"><input type="text" className="form-control" placeholder="ID del club" value={clubIdForCourt} onChange={e => setClubIdForCourt(e.target.value)} required /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Nombre" value={court.name} onChange={e => setCourt({...court, name: e.target.value})} required /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Tipo de pista" value={court.courtType} onChange={e => setCourt({...court, courtType: e.target.value})} required /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Hora apertura (HH:mm)" value={court.openingTime} onChange={e => setCourt({...court, openingTime: e.target.value})} required /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Hora cierre (HH:mm)" value={court.closingTime} onChange={e => setCourt({...court, closingTime: e.target.value})} required /></div>
          <div className="col"><input type="number" className="form-control" placeholder="Minutos por slot" value={court.slotMinutes} onChange={e => setCourt({...court, slotMinutes: e.target.value})} required /></div>
          <div className="col-auto"><button type="submit" className="btn btn-primary">Crear Pista</button></div>
        </form>
      </div>

      <div className="mb-5">
        <h2 className="mb-3">Actualizar Pista</h2>
        <form onSubmit={handleUpdateCourt} className="row g-2 align-items-center mb-3">
          <div className="col"><input type="text" className="form-control" placeholder="ID de la pista" value={courtId} onChange={e => setCourtId(e.target.value)} required /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Nombre" value={court.name} onChange={e => setCourt({...court, name: e.target.value})} required /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Tipo de pista" value={court.courtType} onChange={e => setCourt({...court, courtType: e.target.value})} required /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Hora apertura (HH:mm)" value={court.openingTime} onChange={e => setCourt({...court, openingTime: e.target.value})} required /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Hora cierre (HH:mm)" value={court.closingTime} onChange={e => setCourt({...court, closingTime: e.target.value})} required /></div>
          <div className="col"><input type="number" className="form-control" placeholder="Minutos por slot" value={court.slotMinutes} onChange={e => setCourt({...court, slotMinutes: e.target.value})} required /></div>
          <div className="col-auto"><button type="submit" className="btn btn-warning">Actualizar Pista</button></div>
        </form>
      </div>

      <div className="mb-5">
        <h2 className="mb-3">Eliminar Pista</h2>
        <form onSubmit={handleDeleteCourt} className="row g-2 align-items-center mb-3">
          <div className="col"><input type="text" className="form-control" placeholder="ID de la pista" value={courtId} onChange={e => setCourtId(e.target.value)} required /></div>
          <div className="col-auto"><button type="submit" className="btn btn-danger">Eliminar Pista</button></div>
        </form>
      </div>

      {message && <div className="alert alert-info mt-4">{message}</div>}
    </div>
  );
};

export default AdminView;
