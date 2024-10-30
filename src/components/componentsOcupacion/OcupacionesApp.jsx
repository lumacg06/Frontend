import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OcupacionesApp.css"; 
import OcupacionesTable from "./OcupacionesTable"; 
import OcupacionesModal from "./OcupacionesModal"; 
import OcupacionesSearch from "./OcupacionesSearch"; // Asegúrate de que la ruta sea correcta
import Swal from "sweetalert2";

const OcupacionesApp = () => {
  const [ocupaciones, setOcupaciones] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOcupaciones();
  }, []);

  const fetchOcupaciones = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/ocupaciones");
      setOcupaciones(response.data);
    } catch (error) {
      console.error("Error fetching occupations:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar las ocupaciones",
        icon: "error",
      });
    }
  };

  const handleEdit = (ocupacion) => {
    setEditing(ocupacion);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar esta ocupación?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/ocupaciones/${id}`)
          .then(() => {
            setOcupaciones((prevOcupaciones) => prevOcupaciones.filter((ocupacion) => ocupacion.id !== id));
            Swal.fire({
              title: "¡Eliminado!",
              text: "La ocupación ha sido eliminada correctamente.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar la ocupación",
              icon: "error",
            });
          });
      }
    });
  };

  const handleSave = async (newOcupacion) => {
    try {
      if (editing) {
        const response = await axios.put(
          `http://localhost:8080/api/ocupaciones/${editing.id}`,
          newOcupacion
        );
        setOcupaciones((prevOcupaciones) => 
          prevOcupaciones.map((ocupacion) => (ocupacion.id === editing.id ? response.data : ocupacion))
        );
        Swal.fire({
          title: "¡Actualizado!",
          text: "La ocupación ha sido actualizada correctamente.",
          icon: "success",
        });
      } else {
        const response = await axios.post("http://localhost:8080/api/ocupaciones", newOcupacion);
        setOcupaciones((prevOcupaciones) => [...prevOcupaciones, response.data]);
        Swal.fire({
          title: "¡Creado!",
          text: "La ocupación ha sido creada correctamente.",
          icon: "success",
        });
      }
      handleCloseModal();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar la ocupación",
        icon: "error",
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

  // Filtrar ocupaciones según el término de búsqueda
  const filteredOcupaciones = ocupaciones.filter((ocupacion) =>
    ocupacion.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ocupaciones-app-container">
      <h1 className="ocupaciones-app-title">Gestión de Ocupaciones</h1>
  
      {/* Componente de búsqueda */}
      <OcupacionesSearch 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
  
      <button onClick={handleOpenModal} className="ocupaciones-add-button">
        Agregar Ocupación
      </button>
  
      <OcupacionesTable
        ocupaciones={filteredOcupaciones} // Usar la lista filtrada
        onDelete={handleDelete}
        onEdit={handleEdit}
        className="ocupaciones-table"
      />
  
      { isModalOpen && (
        <div className="ocupaciones-modal-overlay">
          <div className="ocupaciones-modal-container">
            <OcupacionesModal
              ocupacion={editing || { codigoocupacion: "", nombre: "" }}
              onSave={handleSave}
              onCancel={handleCloseModal}
              className="ocupaciones-modal"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OcupacionesApp;