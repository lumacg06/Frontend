import React from 'react';

const DniModal = ({ dni, onClose, onSave }) => {
  const [tipoDocumento, setTipoDocumento] = React.useState(dni.tipoDocumento);
  const [codigo, setCodigo] = React.useState(dni.codigo);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newDni = { 
      tipoDocumento: tipoDocumento,
      codigo: codigo
    };
    onSave(newDni);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="dni-table-header">Editar Tipo Documento</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Tipo Documento:
            <input
              type="text"
              value={tipoDocumento}
              onChange={(event) => setTipoDocumento(event.target.value)}
            />
          </label>
          <label>
            Código:
            <input
              type="text"
              value={codigo}
              onChange={(event) => setCodigo(event.target.value)}
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

export default DniModal;