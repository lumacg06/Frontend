import React, { useState, useEffect } from "react";
import axios from 'axios';

const DniForm = ({ dni, onSave, onCancel }) => {
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [codigo, setCodigo] = useState("");

  useEffect(() => {
    if (dni) {
      setTipoDocumento(dni.tipoDocumento || "");
      setCodigo(dni.codigo || "");
    }
  }, [dni]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const newDni = {
      tipoDocumento,
      codigo,
    };

    if (dni && dni.id) {
      newDni.id = dni.id;
    }

    try {
      const url = `http://localhost:8080/api/tipos-documento${dni.id ? `/${dni.id}` : ''}`;
      const method = dni.id ? 'put' : 'post';
      
      const response = await axios[method](url, newDni);
      
      if (response.data) {
        onSave(response.data);
        resetForm();
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      // Aquí podrías agregar una notificación de error
    }
  };

  const resetForm = () => {
    setTipoDocumento("");
    setCodigo("");
  };

  const handleCancel = () => {
    resetForm();
    if (onCancel) onCancel();
  };

  return (
    <form className="dniform-container" onSubmit={handleSubmit}>
      <h2>{dni && dni.id ? 'Editar' : 'Agregar'} Tipo de Documento</h2>
      
      <div className="form-group">
        <label className="dniform-label-documento">
          Tipo de Documento:
          <input
            className="dniform-input-documento"
            type="text"
            value={tipoDocumento}
            onChange={(e) => setTipoDocumento(e.target.value)}
            required
            placeholder="Ingrese el tipo de documento"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="dniform-label-codigo">
          Código:
          <input
            className="dniform-input-codigo"
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
            placeholder="Ingrese el código"
          />
        </label>
      </div>

      <div className="dniform-buttons">
        <button 
          className="dniform-button-save" 
          type="submit"
          disabled={!tipoDocumento.trim() || !codigo.trim()}
        >
          {dni && dni.id ? 'Actualizar' : 'Guardar'}
        </button>
        <button 
          className="dniform-button-cancel" 
          type="button" 
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default DniForm;