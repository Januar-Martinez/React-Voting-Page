import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../components/MyCard";
import "../css/Administrator.css";
import { FaUserTie, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { useCurrentUser } from "../hook/UseCurrentUser";

export default function Candidate() {
  const { name, EmailOrParty, HasVotedOrVotes } = useCurrentUser();
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
          <h2 className="admin-heading admin-title2">{name}</h2>
          <h4 className="admin-heading admin-subtitle">{EmailOrParty}</h4>

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
        {activeSection === "candidatos" && <p>Aquí van los candidatos</p>}
        {activeSection === "estadisticas" && <p>Aquí van las estadísticas</p>}
      </div>
    </div>
  );
}
