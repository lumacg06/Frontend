import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MunicipiosApp.css";
import "./MunicipiosModal.css";
import MunicipiosTable from "./MunicipiosTable";
import MunicipiosModal from "./MunicipiosModal";
import MunicipiosSearch from "./MunicipiosSearch";
import Swal from "sweetalert2";

const MunicipiosApp = () => {
  const [municipios, setMunicipios] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMunicipios();
  }, []);

  const fetchMunicipios = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/municipios");
      setMunicipios(response.data);
    } catch (error) {
      console.error("Error fetching municipalities:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar los municipios",
        icon: "error",
      });
    }
  };

  const handleEdit = (municipio) => {
    setEditing(municipio);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar este municipio?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/municipios/${id}`)
          .then(() => {
            setMunicipios((prevMunicipios) =>
              prevMunicipios.filter((municipio) => municipio.id !== id)
            );
            Swal.fire({
              title: "¡Eliminado!",
              text: "El municipio ha sido eliminado correctamente.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar el municipio",
              icon: "error",
            });
          });
      }
    });
  };

  const handleSave = async (newMunicipio) => {
    try {
      if (editing) {
        const response = await axios.put(
          `http://localhost:8080/api/municipios/${editing.codigomunicipio}`, // Asegúrate de usar el ID correcto
          newMunicipio
        );
        setMunicipios((prevMunicipios) =>
          prevMunicipios.map((municipio) =>
            municipio.codigomunicipio === editing.codigomunicipio ? response.data : municipio
          )
        );
        Swal.fire({
          title: "¡Actualizado!",
          text: "El municipio ha sido actualizado correctamente.",
          icon: "success",
        });
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/municip ios",
          newMunicipio
        );
        setMunicipios((prevMunicipios) => [...prevMunicipios, response.data]);
        Swal.fire({
          title: "¡Creado!",
          text: "El municipio ha sido creado correctamente.",
          icon: "success",
        });
      }
      handleCloseModal();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el municipio",
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

  // Filtrar municipios según el término de búsqueda
  const filteredMunicipios = municipios.filter((municipio) =>
    municipio.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="municipios-app-container">
      <h1 className="municipios-app-title">Gestión de Municipios</h1>

      {/* Componente de búsqueda */}
      <MunicipiosSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <button onClick={handleOpenModal} className="municipios-add-button">
        Agregar Municipio
      </button>

      <MunicipiosTable
        municipios={filteredMunicipios} // Usar la lista filtrada
        onDelete={handleDelete}
        onEdit={handleEdit}
        className="municipios-table"
      />

      {isModalOpen && (
        <div className="municipios-modal-overlay">
          <div className="municipios-modal-container">
            <MunicipiosModal
              municipio={editing || { codigomunicipio: "", nombre: "" }}
              onSave={handleSave}
              onCancel={handleCloseModal}
              className="municipios-modal"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MunicipiosApp;
