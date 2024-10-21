import React from 'react';

const EditDiscapacidadModal = ({ discapacidad, onClose, onSave }) => {
  const [discapacidadValue, setDiscapacidadValue] = React.useState(
    discapacidad.discapacidad
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const newDiscapacidad = { discapacidad: discapacidadValue };
    onSave(newDiscapacidad);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="discapacidades-table-header">Editar discapacidad</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Discapacidad:
            <input
              type="text"
              value={discapacidadValue}
              onChange={(event) => setDiscapacidadValue(event.target.value)}
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

export default EditDiscapacidadModal;
