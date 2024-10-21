import React from 'react';

const EditModal = ({ etnia, onClose, onSave }) => {
  const [etniaValue, setEtniaValue] = React.useState(etnia.etnia);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEtnia = { etnia: etniaValue };
    onSave(newEtnia);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="etnias-table-header">Editar etnia</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Etnia:
            <input
              type="text"
              value={etniaValue}
              onChange={(event) => setEtniaValue(event.target.value)}
            />
          </label>
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
