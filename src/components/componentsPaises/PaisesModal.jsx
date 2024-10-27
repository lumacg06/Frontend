import React from "react";
// import "./PaisModal.css"; // Asegúrate de crear este archivo CSS para los estilos

const PaisesModal = ({ pais, onClose, onSave }) => {
  const [codigoIso, setCodigoIso] = React.useState(pais.codigoiso);
  const [nombre, setNombre] = React.useState(pais.nombre);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedPais = {
      codigoiso: codigoIso,
      nombre: nombre,
    };
    onSave(updatedPais);
  };

  return (
    <div className="paismodal-overlay">
      <div className="paismodal-content">
        <h2 className="paismodal-title">Editar País</h2>
        <form className="paismodal-form" onSubmit={handleSubmit}>
          <table className="paismodal-table">
            <tbody>
              <tr className="paismodal-row">
                <td className="paismodal-cell">
                  <label className="paismodal-label">
                    Código ISO:
                    <input
                      className="paismodal-input"
                      type="text"
                      value={codigoIso}
                      onChange={(event) => setCodigoIso(event.target.value)}
                    />
                  </label>
                </td>
                <td className="paismodal-cell">
                  <label className="paismodal-label">
                    Nombre:
                    <input
                      className="paismodal-input"
                      type="text"
                      value={nombre}
                      onChange={(event) => setNombre(event.target.value)}
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td className="paismodal-footer" colSpan="2">
                  <button
                    className="paismodal-button-save"
                    type="submit"
                  >
                    Guardar
                  </button>
                  <button
                    className="paismodal-button-cancel"
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

export default PaisesModal;