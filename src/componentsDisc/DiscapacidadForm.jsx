import React, { useState, useEffect } from 'react';

const DiscapacidadForm = ({ discapacidad, onSave = () => {} }) => {
  if (!discapacidad) return null;

  const [discapacidadValue, setDiscapacidadValue] = useState(
    discapacidad.discapacidad
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const newDiscapacidad = { discapacidad: discapacidadValue };
    if (discapacidad) {
      newDiscapacidad.id = discapacidad.id;
    }

    // Hacer una solicitud HTTP a la base de datos
    fetch('/api/discapacidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDiscapacidad),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    onSave(newDiscapacidad); // Llamar a onSave para guardar la discapacidad
    setDiscapacidadValue(''); // Limpiar el campo de la etnia
  };

  return (
    <form className="discapacidad-form" onSubmit={handleSubmit}>
      <label className="discapacidad-form-label">
        Nueva Discapacidad:
        <input
          className="discapacidad-form-input"
          type="text"
          value={discapacidadValue}
          onChange={(event) => setDiscapacidadValue(event.target.value)}
        />
      </label>
      <button className="discapacidad-form-button" type="submit">
        Guardar
      </button>
    </form>
  );
};

export default DiscapacidadForm;
