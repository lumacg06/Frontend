import React from "react";

const DiscapacidadModal = ({ discapacidad, onClose, onSave }) => {
  const [discapacidadValue, setDiscapacidadValue] = React.useState(
    discapacidad?.categoria || '' // Cambiado de discapacidad.discapacidad a discapacidad?.categoria
  );

  // Actualizar el valor cuando cambia la prop discapacidad
  React.useEffect(() => {
    if (discapacidad) {
      setDiscapacidadValue(discapacidad.categoria || '');
    }
  }, [discapacidad]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newDiscapacidad = { 
      categoria: discapacidadValue,  // Cambiado de discapacidad a categoria
      ...(discapacidad?.id && { id: discapacidad.id })
    };
    onSave(newDiscapacidad);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="discapacidades-table-header">Editar discapacidad</h2>
        <form className="edit-form-discapacides" onSubmit={handleSubmit}>
          <label className="edit-modal-discapacides">
            Discapacidad:
            <input
              className="edit-modal-input-discapacidades"
              type="text"
              value={discapacidadValue}
              onChange={(event) => setDiscapacidadValue(event.target.value)}
              required
              maxLength={255}
            />
          </label>
          <button 
            className="edit-modal-guardar-button" 
            type="submit"
            disabled={!discapacidadValue.trim()}
          >
            Guardar
          </button>
          <button
            className="edit-modal-cancelar-button"
            type="button"
            onClick={onClose}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiscapacidadModal;