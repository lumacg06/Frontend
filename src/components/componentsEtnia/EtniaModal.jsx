import React, { useEffect } from 'react';

const EditModal = ({ etnia, onClose, onSave }) => {
  const [etniaValue, setEtniaValue] = React.useState(etnia.etnia);

  useEffect(() => {
    setEtniaValue(etnia.etnia); // Actualiza el valor cuando cambie la etnia
  }, [etnia]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEtnia = { etnia: etniaValue };
    onSave(newEtnia);
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-content">
        <h2 className="edit-modal-header">Editar etnia</h2>
        <form className="edit-modal-form" onSubmit={handleSubmit}>
          <label className="edit-modal-label">
            Etnia:
            <input
              className="edit-modal-input"
              type="text"
              value={etniaValue}
              onChange={(event) => setEtniaValue(event.target.value)}
            />
          </label>
          <button className="edit-modal-save-button" type="submit">
            Guardar
          </button>
          <button className="edit-modal-cancel-button" type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;