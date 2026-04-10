import "./App.css";
import Card from "./components/MyCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const adminUser = {
    id: "0",
    email: "Admin@email.com",
  };

  const handleLogin = () => {
    if (id === adminUser.id && email === adminUser.email) {
      localStorage.setItem("isAuth", "true");
      navigate("/admin");
    } else {
      alert("Datos incorrectos");
    }
  };

  return (
    <Card>
      <h2 className="card-title">SISTEMA DE VOTACIÓN</h2>

      <div className="form-group">
        <label>ID</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      </div>

      <div className="form-group">
        <label>NOMBRE/EMAIL</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button onClick={handleLogin}>INGRESAR</button>
    </Card>
  );
}

export default App;
