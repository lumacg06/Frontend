import React, { useState, useEffect } from "react";

const PaisesForm = ({ pais, onSave = () => {}, onCancel = () => {} }) => {
  // Evitar renderizar el formulario vacío
  if (!pais) return null;

  const [nombre, setNombre] = useState(pais.nombre || ""); // Cambiar a 'nombre'
  const [codigoIso, setCodigoIso] = useState(pais.codigoiso || ""); // Cambiar a 'codigoIso'

  useEffect(() => {
    if (pais) {
      setNombre(pais.nombre || ""); 
      setCodigoIso(pais.codigoiso || ""); // Cambiar a 'codigoIso'
    }
  }, [pais]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPais = {
      nombre, // Cambiar 'tipoDocumento' a 'nombre'
      codigoiso: codigoIso, // Cambiar 'codigo' a 'codigoiso'
    };

    if (pais && pais.id) {
      newPais.id = pais.id; // Si es una actualización, agregar el ID
    }

    // Hacer una solicitud HTTP a la base de datos
    const method = pais && pais.id ? "PUT" : "POST";
    const url = `http://localhost:8080/api/paises${
      pais && pais.id ? `/${pais.id}` : ""
    }`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPais),
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
      onSave(data); // Llamar a onSave para guardar el país
      resetForm(); // Limpiar el formulario
    } catch (error) {
      console.error("Error al guardar:", error.message);
      // Aquí podrías agregar una notificación de error visual para el usuario
    }
  };

  const resetForm = () => {
    setNombre(""); // Limpiar el campo de nombre
    setCodigoIso(""); // Limpiar el campo de código ISO
  };

  const handleCancel = () => {
    resetForm();
    onCancel(); // Llamar a onCancel para manejar la cancelación
  };

  return (
    <form className="paisform-container" onSubmit={handleSubmit}>
      <h2>{pais && pais.id ? "Editar" : "Agregar"} País</h2>

      <div className="form-group">
        <label className="paisform-label-nombre" htmlFor="nombre">
          Nombre del País:
        </label>
        <input
          id="nombre"
          className="paisform-input-nombre"
          type="text"
          value={nombre} // Usar 'nombre'
          onChange={(e) => setNombre(e.target.value)} // Usar 'nombre'
          required
          placeholder="Ingrese el nombre del país"
        />
      </div>

      <div className="form-group">
        <label className="paisform-label-codigo" htmlFor="codigoIso">
          Código ISO:
        </label>
        <input
          id="codigoIso"
          className="paisform-input-codigo"
          type="text"
          value={codigoIso}
          onChange={(e) => setCodigoIso(e.target.value)}
          required
          placeholder="Ingrese el código ISO"
        />
      </div>

      <div className="paisform-buttons">
        <button
          className="paisform-button-save"
          type="submit"
          disabled={!nombre.trim() || !codigoIso.trim()} // Deshabilitar si campos vacíos
        >
          {pais && pais.id ? "Actualizar" : "Guardar"}
        </button>
        <button
          className="paisform-button-cancel"
          type="button"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default PaisesForm;