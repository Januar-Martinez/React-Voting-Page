import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { show_alerta } from "../Function";

export function UseVotes() {
  const url = "http://localhost:5109/api/votes";

  const [statistics, setStatistics] = useState([]);
  const [voterId, setVoterId] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [title, setTitle] = useState("");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getStatistics();
  }, []);

  const getStatistics = async () => {
    try {
      const respuesta = await axios.get(`${url}/statistics`);
      setStatistics(respuesta.data.data);
    } catch (error) {
      show_alerta("Error al cargar estadisticas", "error");
      console.log(error);
    }
  };

  const openModal = () => {
    setTitle("Votar");
    setShowModal(true);
  };

  const validar = () => {
    let parametros;
    let metodo;

    if (candidateId.trim() === "") {
      show_alerta("Escribe el ID el candidato", "warning");
      return;
    }
    parametros = {
      voterId: voterId.trim(),
      candidateId: candidateId.trim(),
    };
    metodo = "POST";
    enviarSolicitud(metodo, parametros);
  };

  const enviarSolicitud = async (metodo, parametros) => {
    try {
      const respuesta = await axios({
        method: metodo,
        url: url,
        data: parametros,
      });
      if (
        respuesta.status === 204 ||
        respuesta.status === 200 ||
        respuesta.status === 201
      ) {
        show_alerta("Operación completada exitosamente", "success");
        setShowModal(false);
        getStatistics();
      }
    } catch (error) {
      show_alerta("Error en la solicitud", "error");
      console.log(error);
    }
  };

  return {
    statistics,
    voterId,
    setVoterId,
    candidateId,
    setCandidateId,
    title,
    showModal,
    setShowModal,
    openModal,
    validar,
  };
}
