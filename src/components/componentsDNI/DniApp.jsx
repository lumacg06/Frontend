import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DniApp.css";
import DniTable from "./DniTable";
import DniForm from "./DniForm";
//import DniModal from "./DniModal";
import Swal from "sweetalert2";

const DniApp = () => {
  const [dnis, setDnis] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchDnis();
  }, []);

  const fetchDnis = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/tipos-documento"
      );
      setDnis(response.data);
    } catch (error) {
      console.error("Error fetching DNIs:", error);
    }
  };

  const handleEdit = (dni) => {
    setEditing(dni);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar este tipo de documento?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/tipos-documento/${id}`)
          .then(() => {
            setDnis(dnis.filter((dni) => dni.id !== id));
            Swal.fire({
              title: "Tipo de documento eliminado con éxito!",
              text: "El tipo de documento ha sido eliminado correctamente.",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  const handleSave = (newDni) => {
    if (editing) {
      axios
        .put(`http://localhost:8080/api/tipos-documento/${editing.id}`, newDni)
        .then(() => {
          setDnis(dnis.map((dni) => (dni.id === editing.id ? newDni : dni)));
          setEditing(null);
          setIsModalOpen(false);
          Swal.fire({
            title: "Tipo de documento actualizado con éxito!",
            text: "El tipo de documento ha sido actualizado correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post("http://localhost:8080/api/tipos-documento", newDni)
        .then((response) => {
          setDnis([...dnis, response.data]);
          setIsModalOpen(false);
          Swal.fire({
            title: "Tipo de documento creado con éxito!",
            text: "El tipo de documento ha sido creado correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleCloseModal = () => {
    setEditing(null);
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setEditing(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>Tipos de Documento</h1>

      <button onClick={handleOpenModal} className="add-dni-button">
        Agregar Tipo Documento
      </button>

      <DniTable dnis={dnis} onEdit={handleEdit} onDelete={handleDelete} />

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <DniForm
              dni={editing || {}}
              onSave={handleSave}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DniApp;
