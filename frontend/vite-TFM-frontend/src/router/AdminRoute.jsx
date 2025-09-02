import { Navigate } from "react-router-dom";

// Usado para que las rutas dentro de este sean privadas a usuarios admin
const AdminRoute = ({ children }) => {
  // Obtener el usuario y rol desde localStorage
  const role = localStorage.getItem("userRole");
  const isAdmin = role === "ADMIN";

  return isAdmin ? children : <Navigate to="/error" />; 
};

export default AdminRoute;
