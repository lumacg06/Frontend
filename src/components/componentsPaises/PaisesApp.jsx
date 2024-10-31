import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PaisesApp.css";
import "./PaisesModal.css";
import PaisesTable from "./PaisesTable";
import PaisModal from "./PaisesModal";
import PaisSearch from "./PaisesSearch"; // Asegúrate de que la ruta sea correcta
import Swal from "sweetalert2";

const PaisesApp = () => {
  const [paises, setPaises] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
    console.log("ID a eliminar:", id); // Verifica el ID que se está pasando
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
            setPaises((prevPaises) =>
              prevPaises.filter((pais) => pais.id !== id)
            ); // Eliminamos el país de la lista
            Swal.fire({
              title: "¡Eliminado!",
              text: "El país ha sido eliminado correctamente.",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
          })
          .catch((error) => {
            console.error("Error al eliminar el país:", error);
            if (error.response) {
              console.error("Detalles del error:", error.response.data);
            }
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar el país",
              icon: "error",
              confirmButtonText: "Aceptar",
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
        setPaises((prevPaises) =>
          prevPaises.map((pais) =>
            pais.id === editing.id ? response.data : pais
          )
        );
        Swal.fire({
          title: "¡Actualizado!",
          text: "El país ha sido actualizado correctamente.",
          icon: "success",
        });
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/paises",
          newPais
        );
        setPaises((prevPaises) => [...prevPaises, response.data]);
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
    pais.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="paises-app-container">
      <h1 className="paises-app-title">Gestión de Países</h1>

      {/* Componente de búsqueda */}
      <PaisSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <button onClick={handleOpenModal} className="paises-add-button">
        Agregar País
      </button>

      <PaisesTable
        paises={filteredPaises} // Usar la lista filtrada
        onDelete={handleDelete}
        onEdit={handleEdit}
        className="paises-table"
      />

      {isModalOpen && (
        <div className="paises-modal-overlay">
          <div className="paises-modal-container">
            <PaisModal
              pais={editing || { codigoiso: "", nombre: "" }}
              onSave={handleSave}
              onClose={handleCloseModal} // Asegúrate de que esto sea onClose
              className="paises-modal"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaisesApp;