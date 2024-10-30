import React, { useState, useEffect } from "react";

const OcupacionesForm = ({ ocupacion, onSave = () => {}, onCancel = () => {} }) => {
  // Evitar renderizar el formulario vacío
  if (!ocupacion) return null;

  const [nombre, setNombre] = useState(ocupacion.nombre || ""); // Cambiar a 'nombre'
  const [codigoOcupacion, setCodigoOcupacion] = useState(ocupacion.codigoocupacion || ""); // Cambiar a 'codigoOcupacion'

  useEffect(() => {
    if (ocupacion) {
      setNombre(ocupacion.nombre || ""); 
      setCodigoOcupacion(ocupacion.codigoocupacion || ""); // Cambiar a 'codigoOcupacion'
    }
  }, [ocupacion]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newOcupacion = {
      nombre,
      codigoocupacion: codigoOcupacion, 
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
    setNombre(""); // Limpiar el campo de nombre
    setCodigoOcupacion(""); // Limpiar el campo de código de ocupación
  };

  const handleCancel = () => {
    resetForm();
    onCancel(); // Llamar a onCancel para manejar la cancelación
  };

  return (
    <form className="ocupacionesform-container" onSubmit={handleSubmit}>
      <h2>{ocupacion && ocupacion.id ? "Editar" : "Agregar"} Ocupación</h2>

      <div className="form-group">
        <label className="ocupacionesform-label-nombre" htmlFor="nombre">
          Nombre de la Ocupación:
        </label>
        <input
          id="nombre"
          className="ocupacionesform-input-nombre"
          type="text"
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          required
          placeholder="Ingrese el nombre de la ocupación"
        />
      </div>

      <div className="form-group">
        <label className="ocupacionesform-label-codigo" htmlFor="codigoOcupacion">
          Código Ocupación:
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
          disabled={!nombre.trim() || !codigoOcupacion.trim()} // Deshabilitar si campos vacíos
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