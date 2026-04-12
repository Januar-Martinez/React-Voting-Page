import "../css/Administrator.css";
import Card from "../components/MyCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUsers, FaUserTie, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import ShowVoters from "../components/ShowVoters";

export default function Administrator() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    navigate("/");
  };

  const handleOption = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className={`admin-layout ${activeSection ? "expanded" : ""}`}>
      <div className="admin-card-wrapper">
        <Card>
          <h2 className="admin-title">Administración</h2>

          <div
            className={`admin-option ${activeSection === "votantes" ? "active" : ""}`}
            onClick={() => handleOption("votantes")}
          >
            <FaUsers className="icon" />
            Votantes
          </div>

          <div
            className={`admin-option ${activeSection === "candidatos" ? "active" : ""}`}
            onClick={() => handleOption("candidatos")}
          >
            <FaUserTie className="icon" />
            Candidatos
          </div>

          <div
            className={`admin-option ${activeSection === "estadisticas" ? "active" : ""}`}
            onClick={() => handleOption("estadisticas")}
          >
            <FaChartBar className="icon" />
            Estadísticas
          </div>

          <div className="admin-option" onClick={handleLogout}>
            <FaSignOutAlt className="icon" />
            Cerrar Sesión
          </div>
        </Card>
      </div>

      <div className={`admin-content ${activeSection ? "visible" : ""}`}>
        {activeSection === "votantes" && <ShowVoters />}
        {activeSection === "candidatos" && (
          <p>Aquí va la tabla de candidatos</p>
        )}
        {activeSection === "estadisticas" && <p>Aquí van las estadísticas</p>}
      </div>
    </div>
  );
}
