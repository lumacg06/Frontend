import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DiscapacidadApp.css';
import DiscapacidadesTable from './DiscapacidadTable';
import DiscapacidadForm from './DiscapacidadForm';
import EditModal from './EditModal'; // Importar el componente de ventana emergente
import Swal from 'sweetalert2';

const DiscapacidadApp = () => {
  const [discapacidades, setDiscapacidades] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchDiscapacidades();
  }, []);

  const fetchDiscapacidades = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/discapacidades'
      );
      setDiscapacidades(response.data);
    } catch (error) {
      console.error('Error fetching discapacidades:', error);
    }
  };

  const handleEdit = (discapacidad) => {
    setEditing(discapacidad); // Actualizamos el estado de 'editing' con la discapacidad a editar
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta discapacidad?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/discapacidades/${id}`)
          .then(() => {
            setDiscapacidades(
              discapacidades.filter((discapacidad) => discapacidad.id !== id)
            ); // Eliminamos la discapacidad de la lista
            Swal.fire({
              title: 'Discapacidad eliminada con éxito!',
              text: 'La discapacidad ha sido eliminada correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  const handleSave = (newDiscapacidad) => {
    if (editing) {
      // Actualiza la discapacidad existente
      axios
        .put(
          `http://localhost:8080/api/discapacidades/${editing.id}`,
          newDiscapacidad
        )
        .then(() => {
          setDiscapacidades(
            discapacidades.map((discapacidad) =>
              discapacidad.id === editing.id ? newDiscapacidad : discapacidad
            )
          );
          setEditing(null); // Limpiar edición después de guardar
          Swal.fire({
            title: 'Discapacidad actualizada con éxito!',
            text: 'La discapacidad ha sido actualizada correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Añade una nueva discapacidad
      axios
        .post('http://localhost:8080/api/discapacidades', newDiscapacidad)
        .then((response) => {
          setDiscapacidades([...discapacidades, response.data]);
          Swal.fire({
            title: 'Discapacidad creada con éxito!',
            text: 'La discapacidad ha sido creada correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
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
    <div>
      <h1>Discapacidades</h1>

      <DiscapacidadForm discapacidad={editing || {}} onSave={handleSave} />

      <DiscapacidadesTable
        discapacidades={discapacidades}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {editing && (
        <EditModal
          discapacidad={editing}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default DiscapacidadApp;
