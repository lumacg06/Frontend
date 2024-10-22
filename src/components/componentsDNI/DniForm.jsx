import React, { useState, useEffect } from 'react';

const DniForm = ({ dni, onSave = () => {} }) => {
  if (!dni) return null; // Evitar renderizar el formulario vacío

  const [tipoDocumento, setTipoDocumento] = useState(dni.tipoDocumento || '');
  const [codigo, setCodigo] = useState(dni.codigo || '');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newDni = { 
      tipoDocumento: tipoDocumento,
      codigo: codigo
    };
    if (dni && dni.id) {
      newDni.id = dni.id;
    }

    // Hacer una solicitud HTTP a la base de datos
    fetch('/api/tipos-documento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDni),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    onSave(newDni); // Llamar a onSave para guardar el DNI
    setTipoDocumento(''); // Limpiar el campo del tipo de documento
    setCodigo(''); // Limpiar el campo del código
  };

  return (
    <form className="dni-form" onSubmit={handleSubmit}>
      <label className="dni-form-label">
        Tipo de Documento:
        <input
          className="dni-form-input"
          type="text"
          value={tipoDocumento}
          onChange={(event) => setTipoDocumento(event.target.value)}
        />
      </label>
      <label className="dni-form-label">
        Código:
        <input
          className="dni-form-input"
          type="text"
          value={codigo}
          onChange={(event) => setCodigo(event.target.value)}
        />
      </label>
      <button className="dni-form-button" type="submit">
        Guardar
      </button>
    </form>
  );
};

export default DniForm;