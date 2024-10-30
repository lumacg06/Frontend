import React, { useState, useEffect } from "react";

const OcupacionesForm = ({ ocupacion, onSave = () => {}, onCancel = () => {} }) => {
  // Evitar renderizar el formulario vacío
  if (!ocupacion) return null;

  const [descripcion, setDescripcion] = useState(ocupacion.descripcion || ""); // Cambiado a 'descripcion'
  const [codigoOcupacion, setCodigoOcupacion] = useState(ocupacion.codigo || ""); // Cambiado a 'codigo'

  useEffect(() => {
    if (ocupacion) {
      setDescripcion(ocupacion.descripcion || ""); // Cambiado a 'descripcion'
      setCodigoOcupacion(ocupacion.codigo || ""); // Cambiado a 'codigo'
    }
  }, [ocupacion]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newOcupacion = {
      descripcion: descripcion, // Cambiado a 'descripcion'
      codigo: codigoOcupacion, // Cambiado a 'codigo'
    };

    if (ocupacion && ocupacion.id) {
      newOcupacion.id = ocupacion.id; 
    }

    const method = ocupacion && ocupacion.id ? "PUT" : "POST";
    const url = `http://localhost:8080/api/ocupaciones${
      ocupacion && ocupacion.id ? `/${ocupacion.id}` : ""
    }`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOcupacion),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error en la respuesta del servidor: ${
            errorData.message || response.statusText
          }`
        );
      }

      const data = await response.json();
      onSave(data); 
      resetForm(); 
    } catch (error) {
      console.error("Error al guardar:", error.message);
    }
  };

  const resetForm = () => {
    setDescripcion(""); // Limpiar el campo de descripcion
    setCodigoOcupacion(""); // Limpiar el campo de código
  };

  const handleCancel = () => {
    resetForm();
    onCancel(); // Llamar a onCancel para manejar la cancelación
  };

  return (
    <form className="ocupacionesform-container" onSubmit={handleSubmit}>
      <h2>{ocupacion && ocupacion.id ? "Editar" : "Agregar"} Ocupación</h2>

      <div className="form-group">
        <label className="ocupacionesform-label-descripcion" htmlFor="descripcion">
          Descripción de la Ocupación:
        </label>
        <input
          id="descripcion"
          className="ocupacionesform-input-descripcion"
          type="text"
          value={descripcion} 
          onChange={(e) => setDescripcion(e.target.value)} 
          required
          placeholder="Ingrese la descripción de la ocupación"
        />
      </div>

      <div className="form-group">
        <label className="ocupacionesform-label-codigo" htmlFor="codigoOcupacion">
          Código:
        </label>
        <input
          id="codigoOcupacion"
          className="ocupacionesform-input-codigo"
          type="text"
          value={codigoOcupacion}
          onChange={(e) => setCodigoOcupacion(e.target.value)}
          required
          placeholder="Ingrese el código de la ocupación"
        />
      </div>

      <div className="ocupacionesform-buttons">
        <button
          className="ocupacionesform-button-save"
          type="submit"
          disabled={!descripcion.trim() || !codigoOcupacion.trim()} // Deshabilitar si campos vacíos
        >
          {ocupacion && ocupacion.id ? "Actualizar" : "Guardar"}
        </button>
        <button
          className="ocupacionesform-button-cancel"
          type="button"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default OcupacionesForm;