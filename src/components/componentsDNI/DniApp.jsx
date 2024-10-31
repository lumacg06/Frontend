import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DniApp.css";
import "./DniModal.css"
import DniTable from "./DniTable";
import DniForm from "./DniForm";
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
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar los tipos de documento",
        icon: "error"
      });
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
              title: "¡Eliminado!",
              text: "El tipo de documento ha sido eliminado correctamente.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar el tipo de documento",
              icon: "error"
            });
          });
      }
    });
  };

  const handleSave = async (newDni) => {
    try {
      if (editing) {
        // Actualizar documento existente
        const response = await axios.put(
          `http://localhost:8080/api/tipos-documento/${editing.id}`,
          newDni
        );
        setDnis(dnis.map((dni) => (dni.id === editing.id ? response.data : dni)));
        Swal.fire({
          title: "¡Actualizado!",
          text: "El tipo de documento ha sido actualizado correctamente.",
          icon: "success",
        });
      } else {
        // Crear nuevo documento
        const response = await axios.post(
          "http://localhost:8080/api/tipos-documento",
          newDni
        );
        setDnis([...dnis, response.data]);
        Swal.fire({
          title: "¡Creado!",
          text: "El tipo de documento ha sido creado correctamente.",
          icon: "success",
        });
      }
      handleCloseModal();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el tipo de documento",
        icon: "error"
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
    <div className="dni-app-container">
      <h1 className="dni-app-title">Tipos de Documento</h1>

      <button onClick={handleOpenModal} className="dni-add-button">
        Agregar tipo de documento
      </button>

      <DniTable
        dnis={dnis}
        onEdit={handleEdit}
        onDelete={handleDelete}
        className="dni-table"
      />

      {isModalOpen && (
        <div className="dni-modal-overlay">
          <div className="dni-modal-container">
            <DniForm
              dni={editing || { tipoDocumento: "", codigo: "" }} // Proporciona un objeto vacío con la estructura correcta
              onSave={handleSave}
              onCancel={handleCloseModal}
              className="dni-form"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DniApp;