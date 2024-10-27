import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PaisesApp.css"; // Asegúrate de crear este archivo CSS para los estilos
import PaisesTable from "./PaisesTable"; // Componente para mostrar la tabla de países
import PaisModal from "./PaisesModal"; // Componente para el modal de edición/agregado
import Swal from "sweetalert2";

const PaisesApp = () => {
  const [paises, setPaises] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  useEffect(() => {
    fetchPaises();
  }, []);

  const fetchPaises = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/paises");
      setPaises(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar los países",
        icon: "error",
      });
    }
  };

  const handleEdit = (pais) => {
    setEditing(pais);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar este país?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/paises/${id}`)
          .then(() => {
            setPaises(paises.filter((pais) => pais.id !== id));
            Swal.fire({
              title: "¡Eliminado!",
              text: "El país ha sido eliminado correctamente.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar el país",
              icon: "error",
            });
          });
      }
    });
  };

  const handleSave = async (newPais) => {
    try {
      if (editing) {
        const response = await axios.put(
          `http://localhost:8080/api/paises/${editing.id}`,
          newPais
        );
        setPaises(paises.map((pais) => (pais.id === editing.id ? response.data : pais)));
        Swal.fire({
          title: "¡Actualizado!",
          text: "El país ha sido actualizado correctamente.",
          icon: "success",
        });
      } else {
        const response = await axios.post("http://localhost:8080/api/paises", newPais);
        setPaises([...paises, response.data]);
        Swal.fire({
          title: "¡Creado!",
          text: "El país ha sido creado correctamente.",
          icon: "success",
        });
      }
      handleCloseModal();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el país",
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

  // Filtrar países según el término de búsqueda
  const filteredPaises = paises.filter((pais) =>
    pais.nombre.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrar por coincidencia
  );

  return (
    <div className="paises-app-container">
      <h1 className="paises-app-title">Gestión de Países</h1>

      <input
        type="text"
        placeholder="Buscar país..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="paises-search-input" // Asegúrate de agregar estilos para esta clase
      />

      <button onClick={handleOpenModal} className="paises-add-button">
        Agregar País
      </button>

      <PaisesTable
        paises={filteredPaises} // Usar la lista filtrada onEdit={handleEdit}
        onDelete={handleDelete}
        className="paises-table"
      />

      {isModalOpen && (
        <div className="paises-modal-overlay">
          <div className="paises-modal-container">
            <PaisModal
              pais={editing || { codigoiso: "", nombre: "" }}
              onSave={handleSave}
              onCancel={handleCloseModal}
              className="paises-modal"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaisesApp;