import React from "react";
import "./DniModal.css";

const DniModal = ({ dni, onClose, onSave }) => {
  const [tipoDocumento, setTipoDocumento] = React.useState(dni.tipoDocumento);
  const [codigo, setCodigo] = React.useState(dni.codigo);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newDni = {
      tipoDocumento: tipoDocumento,
      codigo: codigo,
    };
    onSave(newDni);
  };

  return (
    <div className="dnimodal-overlay">
      <div className="dnimodal-content">
        <h2 className="dnimodal-title">Editar Tipo Documento</h2>
        <form className="dnimodal-form" onSubmit={handleSubmit}>
          <table className="dnimodal-table">
            <tbody>
              <tr className="dnimodal-row">
                <td className="dnimodal-cell">
                  <label className="dnimodal-label">
                    Tipo Documento:
                    <input
                      className="dnimodal-input"
                      type="text"
                      value={tipoDocumento}
                      onChange={(event) => setTipoDocumento(event.target.value)}
                    />
                  </label>
                </td>
                <td className="dnimodal-cell">
                  <label className="dnimodal-label">
                    Código:
                    <input
                      className="dnimodal-input"
                      type="text"
                      value={codigo}
                      onChange={(event) => setCodigo(event.target.value)}
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td className="dnimodal-footer">
                  <button
                    className="dnimodal-button-save"
                    type="submit"
                  >
                    Guardar
                  </button>
                  <button
                    className="dnimodal-button-cancel"
                    type="button"
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default DniModal;
