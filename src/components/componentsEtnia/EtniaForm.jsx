import React, { useState, useEffect } from 'react';

const EtniaForm = ({ etnia, onSave = () => {} }) => {
  if (!etnia) return null; // Agregar esta línea para evitar renderizar el formulario vacío

  const [etniaValue, setEtniaValue] = useState(etnia.etnia);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEtnia = { etnia: etniaValue };
    if (etnia) {
      newEtnia.id = etnia.id;
    }

    // Hacer una solicitud HTTP a la base de datos
    fetch('/api/etnias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEtnia),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    onSave(newEtnia); // Llamar a onSave para guardar la etnia
    setEtniaValue(''); // Limpiar el campo de la etnia
  };

  return (
    <form className="etnia-form" onSubmit={handleSubmit}>
      <label className="etnia-form-label">
        Nueva Etnia:
        <input
          className="etnia-form-input"
          type="text"
          value={etniaValue}
          onChange={(event) => setEtniaValue(event.target.value)}
        />
      </label>
      <button className="etnia-form-button" type="submit">
        Guardar
      </button>
    </form>
  );
};

export default EtniaForm;
