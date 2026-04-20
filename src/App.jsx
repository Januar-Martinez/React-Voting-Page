import "./App.css";
import Card from "./components/MyCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseVoters } from "./hook/UseVoters";
import { UseCandidates } from "./hook/UseCandidates";

function App() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const { getVoterById } = UseVoters();
  const { getCandidateById } = UseCandidates();

  const handleLogin = async () => {
    try {
      if (id === "0" && name === "Admin") {
        localStorage.setItem("isAuth", "true");
        navigate("/admin");
        return;
      }

      let voter = null;
      try {
        voter = await getVoterById(id);
      } catch (error) {
        console.log(error);
      }

      if (voter && id === String(voter.id) && name === voter.name) {
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("userId", voter.id);
        localStorage.setItem("userName", voter.name);
        localStorage.setItem("userEmailOrParty", voter.email);
        localStorage.setItem("userHasVotedOrVotes", voter.hasVoted);
        navigate("/voter");
        return;
      }

      let candidate = null;
      try {
        candidate = await getCandidateById(id);
      } catch (error) {
        console.log(error);
      }

      if (candidate && id === String(candidate.id) && name === candidate.name) {
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("userId", candidate.id);
        localStorage.setItem("userName", candidate.name);
        localStorage.setItem("userEmailOrParty", candidate.party);
        localStorage.setItem("userHasVotedOrVotes", candidate.votes);
        navigate("/candidate");
        return;
      }

      alert("Datos incorrectos");
    } catch (error) {
      console.log(error);
      alert("Error en el servidor");
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
        <label>NOMBRE</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <button onClick={handleLogin}>INGRESAR</button>
    </Card>
  );
}

export default App;
