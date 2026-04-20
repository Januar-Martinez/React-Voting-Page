import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../Function";

export function UseCandidates() {
  const url = "http://localhost:5109/api/candidates";

  const [candidates, setCandidates] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [title, setTitle] = useState("");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getCandidates();
  }, []);

  const getCandidates = async () => {
    try {
      const respuesta = await axios.get(url);
      setCandidates(respuesta.data.data);
    } catch (error) {
      show_alerta("Error al cargar candidatos", "error");
      console.log(error);
    }
  };

  const getCandidateById = async (id) => {
  try {
    const respuesta = await axios.get(`${url}/${id}`);
    return respuesta.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

  const openModal = () => {
    setTitle("Registrar Candidato");
    setShowModal(true);
  };

  const validar = () => {
    let parametros;
    let metodo;

    if (name.trim() === "") {
      show_alerta("Escribe el nombre del candidato", "warning");
      return;
    }

    parametros = {
      name: name.trim(),
      party: party.trim(),
    };
    metodo = "POST";
    enviarSolicitud(metodo, parametros);
  };

  const enviarSolicitud = async (metodo, parametros, idOverride = null) => {
    const idUsed = idOverride !== null ? idOverride : id;
    let urlFinal = url;
    if (metodo === "DELETE") {
      urlFinal = `${url}/${idUsed}`;
    }

    try {
      const respuesta = await axios({
        method: metodo,
        url: urlFinal,
        data: parametros,
      });
      if (respuesta.status === 204 || respuesta.status === 200 || respuesta.status === 201) {
        show_alerta("Operación completada exitosamente", "success");
        setShowModal(false);
        getCandidates();
      }
    } catch (error) {
      show_alerta("Error en la solicitud", "error");
      console.log(error);
    }
  };

  const deleteCandidate = (id, name) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `¿Seguro de eliminar el candidato ${name}?`,
      icon: "question",
      text: "No se podrá dar marcha atrás",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setId(id);
        enviarSolicitud("DELETE", null, id);
      } else {
        show_alerta("El candidato NO fue eliminado", "info");
      }
    });
  };

  return {
    candidates,
    id,
    setId,
    name,
    setName,
    party,
    setParty,
    title,
    showModal,
    setShowModal,
    openModal,
    validar,
    deleteCandidate,
    getCandidateById,
  };
}
