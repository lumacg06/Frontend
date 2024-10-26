import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EtniaApp.css";
import EtniasTable from "./EtniaTable";
import EtniaForm from "./EtniaForm";
import EditModal from "./EtniaModal"; // Importar el componente de ventana emergente
import Swal from "sweetalert2";

const EtniaApp = () => {
  const [etnias, setEtnias] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchEtnias();
  }, []);

  const fetchEtnias = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/etnias");
      setEtnias(response.data);
    } catch (error) {
      console.error("Error fetching etnias:", error);
    }
  };

  const handleEdit = (etnia) => {
    setEditing(etnia); // Actualizamos el estado de 'editing' con la etnia a editar
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar esta etnia?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/etnias/${id}`)
          .then(() => {
            setEtnias(etnias.filter((etnia) => etnia.id !== id)); // Eliminamos la etnia de la lista
            Swal.fire({
              title: "Etnia eliminada con éxito!",
              text: "La etnia ha sido eliminada correctamente.",
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

  const handleSave = (newEtnia) => {
    if (editing) {
      // Actualiza la etnia existente
      axios
        .put(`http://localhost:8080/api/etnias/${editing.id}`, newEtnia)
        .then(() => {
          setEtnias(
            etnias.map((etnia) => (etnia.id === editing.id ? newEtnia : etnia))
          );
          setEditing(null); // Limpiar edición después de guardar
          Swal.fire({
            title: "Etnia actualizada con éxito!",
            text: "La etnia ha sido actualizada correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Añade una nueva etnia
      axios
        .post("http://localhost:8080/api/etnias", newEtnia)
        .then((response) => {
          setEtnias([...etnias, response.data]);
          Swal.fire({
            title: "Etnia creada con éxito!",
            text: "La etnia ha sido creada correctamente.",
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
  };

  return (
    <div className="etnia-app-container">
      <h1 className="etnia-app-title">Etnias</h1>

      <EtniaForm
        className="etnia-form"
        etnia={editing || {}}
        onSave={handleSave}
      />

      <EtniasTable
        className="etnias-table"
        etnias={etnias}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {editing && (
        <EditModal
          className="etnia-edit-modal"
          etnia={editing}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default EtniaApp;
