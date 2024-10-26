import React, { useState } from 'react';

const EtniaForm = ({ etnia, onSave = () => {} }) => {
  if (!etnia) return null; // Evitar renderizar el formulario vacío

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
    <form className="etnia-form-container" onSubmit={handleSubmit}>
      <label className="etnia-form-label">
        Nueva etnia:
        <input
          className="etnia-input-field"
          type="text"
          value={etniaValue}
          onChange={(event) => setEtniaValue(event.target.value)}
        />
      </label>
      <button className="etnia-submit-button" type="submit">
        Guardar
      </button>
    </form>
  );
};

export default EtniaForm;