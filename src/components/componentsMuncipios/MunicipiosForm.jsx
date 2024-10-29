import React, { useState, useEffect } from "react";

const MunicipiosForm = ({ municipio, onSave = () => {}, onCancel = () => {} }) => {
  // Evitar renderizar el formulario vacío
  if (!municipio) return null;

  const [nombre, setNombre] = useState(municipio.nombre || ""); // Cambiar a 'nombre'
  const [codigoMunicipio, setCodigoMunicipio] = useState(municipio.codigomunicipio || ""); // Cambiar a 'codigoMunicipio'

  useEffect(() => {
    if (municipio) {
      setNombre(municipio.nombre || ""); 
      setCodigoMunicipio(municipio.codigomunicipio || ""); // Cambiar a 'codigoMunicipio'
    }
  }, [municipio]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newMunicipio = {
      nombre,
      codigomunicipio: codigoMunicipio, 
    };

    if (municipio && municipio.id) {
      newMunicipio.id = municipio.id; 
    }


    const method = municipio && municipio.id ? "PUT" : "POST";
    const url = `http://localhost:8080/api/municipios${
      municipio && municipio.id ? `/${municipio.id}` : ""
    }`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMunicipio),
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
    setCodigoMunicipio(""); // Limpiar el campo de código del municipio
  };

  const handleCancel = () => {
    resetForm();
    onCancel(); // Llamar a onCancel para manejar la cancelación
  };

  return (
    <form className="municipiosform-container" onSubmit={handleSubmit}>
      <h2>{municipio && municipio.id ? "Editar" : "Agregar"} Municipio</h2>

      <div className="form-group">
        <label className="municipiosform-label-nombre" htmlFor="nombre">
          Nombre del Municipio:
        </label>
        <input
          id="nombre"
          className="municipiosform-input-nombre"
          type="text"
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          required
          placeholder="Ingrese el nombre del municipio"
        />
      </div>

      <div className="form-group">
        <label className="municipiosform-label-codigo" htmlFor="codigoMunicipio">
          Código Municipio:
        </label>
        <input
          id="codigoMunicipio"
          className="municipiosform-input-codigo"
          type="text"
          value={codigoMunicipio}
          onChange={(e) => setCodigoMunicipio(e.target.value)}
          required
          placeholder="Ingrese el código del municipio"
        />
      </div>

      <div className="municipiosform-buttons">
        <button
          className="municipiosform-button-save"
          type="submit"
          disabled={!nombre.trim() || !codigoMunicipio.trim()} // Deshabilitar si campos vacíos
        >
          {municipio && municipio.id ? "Actualizar" : "Guardar"}
        </button>
        <button
          className="municipiosform-button-cancel"
          type="button"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default MunicipiosForm;