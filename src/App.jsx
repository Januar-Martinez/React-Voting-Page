import "./App.css";
import Card from "./components/MyCard";

function App() {
  return (
    <Card>
      <h2 className="card-title">SISTEMA DE VOTACIÓN</h2>

      <div className="form-group">
        <label>ID</label>
        <input type="text" />
      </div>

      <div className="form-group">
        <label>NOMBRE/EMAIL</label>
        <input type="text" />
      </div>

      <button>INGRESAR</button>
    </Card>
  );
}

export default App;
