import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../Function";

export function UseVoters() {
  const url = "http://localhost:5109/api/voters";

  const [voters, setvoters] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getVoters();
  }, []);

  const getVoters = async () => {
    try {
      const respuesta = await axios.get(url);
      setvoters(respuesta.data.data);
    } catch (error) {
      show_alerta("Error al cargar votantes", "error");
      console.log(error);
    }
  };

  const getVoterById = async (id) => {
  try {
    const respuesta = await axios.get(`${url}/${id}`);
    return respuesta.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

  const openModal = () => {
    setTitle("Registrar Votante");
    setShowModal(true);
  };

  const validar = () => {
    let parametros;
    let metodo;

    if (name.trim() === "") {
      show_alerta("Escribe el nombre del votante", "warning");
      return;
    } else if (email.trim() === "") {
      show_alerta("Escribe el email del votante", "warning");
      return;
    }

    parametros = {
      name: name.trim(),
      email: email.trim(),
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
        getVoters();
      }
    } catch (error) {
      show_alerta("Error en la solicitud", "error");
      console.log(error);
    }
  };

  const deleteVoter = (id, name) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `¿Seguro de eliminar el votante ${name}?`,
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
        show_alerta("El votante NO fue eliminado", "info");
      }
    });
  };

  return {
    voters,
    id,
    setId,
    name,
    setName,
    email,
    setEmail,
    title,
    showModal,
    setShowModal,
    openModal,
    validar,
    deleteVoter,
    getVoterById,
  };
}
