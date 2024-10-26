import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DiscapacidadApp.css';
import DiscapacidadesTable from './DiscapacidadTable';
import DiscapacidadForm from './DiscapacidadForm';
import EditModal from './EditModal';
import Swal from 'sweetalert2';

const API_URL = 'http://localhost:8080/api/discapacidades';

const DiscapacidadApp = () => {
  const [discapacidades, setDiscapacidades] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDiscapacidades();
  }, []);

  const fetchDiscapacidades = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setDiscapacidades(response.data);
    } catch (error) {
      console.error('Error fetching discapacidades:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar las discapacidades',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (discapacidad) => {
    setEditing(discapacidad);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro de eliminar esta discapacidad?',
        text: 'No podrás revertir esta acción.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar',
      });

      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/${id}`);
        setDiscapacidades(discapacidades.filter(disc => disc.id !== id));
        
        await Swal.fire({
          title: 'Discapacidad eliminada con éxito!',
          text: 'La discapacidad ha sido eliminada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar la discapacidad',
        icon: 'error',
      });
    }
  };

  const handleSave = async (newDiscapacidad) => {
    try {
      if (editing) {
        const response = await axios.put(
          `${API_URL}/${editing.id}`,
          newDiscapacidad
        );
        
        setDiscapacidades(discapacidades.map(disc =>
          disc.id === editing.id ? response.data : disc
        ));
        
        setEditing(null);
        
        await Swal.fire({
          title: 'Discapacidad actualizada con éxito!',
          text: 'La discapacidad ha sido actualizada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      } else {
        const response = await axios.post(API_URL, newDiscapacidad);
        setDiscapacidades([...discapacidades, response.data]);
        
        await Swal.fire({
          title: 'Discapacidad creada con éxito!',
          text: 'La discapacidad ha sido creada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo guardar la discapacidad',
        icon: 'error',
      });
    }
  };

  const handleCloseModal = () => {
    setEditing(null);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="discapacidades-app-container">
      <h1 className="discapacidades-app-tittle">Discapacidades</h1>

      <DiscapacidadForm 
        className="discapacidades-form" 
        discapacidad={editing || { discapacidad: '' }}
        onSave={handleSave} 
      />

      <DiscapacidadesTable
        className="discapacidades-table"
        discapacidades={discapacidades}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {editing && (
        <EditModal
          className="discapacidades-edit-modal"
          discapacidad={editing}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default DiscapacidadApp;