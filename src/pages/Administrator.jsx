import "../css/Administrator.css";
import Card from "../components/MyCard";
import { useNavigate } from "react-router-dom";

import { FaUsers, FaUserTie, FaChartBar, FaSignOutAlt } from "react-icons/fa";

export default function Administrator() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    navigate("/");
  };

  return (
    <Card>
      <h2 className="admin-title">Administración</h2>

      <div className="admin-option">
        <FaUsers className="icon" />
        Votantes
      </div>

      <div className="admin-option">
        <FaUserTie className="icon" />
        Candidatos
      </div>

      <div className="admin-option">
        <FaChartBar className="icon" />
        Estadísticas
      </div>

      <div className="admin-option" onClick={handleLogout}>
        <FaSignOutAlt className="icon" />
        Cerrar Sesión
      </div>
    </Card>
  );
}
