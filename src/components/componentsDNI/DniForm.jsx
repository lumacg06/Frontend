import React, { useState, useEffect } from "react";

const DniForm = ({ dni, onSave = () => {}, onCancel = () => {} }) => {
  // Evitar renderizar el formulario vacío
  if (!dni) return null;

  const [nombre, setNombre] = useState(dni.nombre || ""); // Cambiar a 'nombre'
  const [codigo, setCodigo] = useState(dni.codigo || "");

  useEffect(() => {
    if (dni) {
      setNombre(dni.nombre || ""); // Cambiar a 'nombre'
      setCodigo(dni.codigo || "");
    }
  }, [dni]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newDni = {
      nombre, // Cambiar 'tipoDocumento' a 'nombre'
      codigo,
    };

    if (dni && dni.id) {
      newDni.id = dni.id; // Si es una actualización, agregar el ID
    }

    // Hacer una solicitud HTTP a la base de datos
    const method = dni && dni.id ? "PUT" : "POST";
    const url = `http://localhost:8080/api/tipos-documento${
      dni && dni.id ? `/${dni.id}` : ""
    }`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDni),
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
      onSave(data); // Llamar a onSave para guardar el DNI
      resetForm(); // Limpiar el formulario
    } catch (error) {
      console.error("Error al guardar:", error.message);
      // Aquí podrías agregar una notificación de error visual para el usuario
    }
  };

  const resetForm = () => {
    setNombre(""); // Limpiar el campo de nombre
    setCodigo(""); // Limpiar el campo de código
  };

  const handleCancel = () => {
    resetForm();
    onCancel(); // Llamar a onCancel para manejar la cancelación
  };

  return (
    <form className="dniform-container" onSubmit={handleSubmit}>
      <h2>{dni && dni.id ? "Editar" : "Agregar"} tipo de documento</h2>

      <div className="form-group">
        <label className="dniform-label-documento" htmlFor="nombre">
          Nombre del Documento:
        </label>
        <input
          id="nombre"
          className="dniform-input-documento"
          type="text"
          value={nombre} // Usar 'nombre'
          onChange={(e) => setNombre(e.target.value)} // Usar 'nombre'
          required
          placeholder="Ingrese el nombre del documento"
        />
      </div>

      <div className="form-group">
        <label className="dniform-label-codigo" htmlFor="codigo">
          Código:
        </label>
        <input
          id="codigo"
          className="dniform-input-codigo"
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
          placeholder="Ingrese el código"
        />
      </div>

      <div className="dniform-buttons">
        <button
          className="dniform-button-save"
          type="submit"
          disabled={!nombre.trim() || !codigo.trim()} // Deshabilitar si campos vacíos
        >
          {dni && dni.id ? "Actualizar" : "Guardar"}
        </button>
        <button
          className="dniform-button-cancelar"
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
