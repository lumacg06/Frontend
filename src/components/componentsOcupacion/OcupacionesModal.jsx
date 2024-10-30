import React from "react";
// import "./OcupacionModal.css"; // Asegúrate de crear este archivo CSS para los estilos

const OcupacionesModal = ({ ocupacion, onClose, onSave }) => {
  const [codigoOcupacion, setCodigoOcupacion] = React.useState(
    ocupacion.codigoocupacion
  );
  const [nombre, setNombre] = React.useState(ocupacion.nombre);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedOcupacion = {
      codigoocupacion: codigoOcupacion,
      nombre: nombre,
    };
    onSave(updatedOcupacion);
  };

  return (
    <div className="ocupacionmodal-overlay">
      <div className="ocupacionmodal-content">
        <h2 className="ocupacionmodal-title">Editar Ocupación</h2>
        <form className="ocupacionmodal-form" onSubmit={handleSubmit}>
          <table className="ocupacionmodal-table">
            <tbody>
              <tr className="ocupacionmodal-row">
                <td className="ocupacionmodal-cell">
                  <label className="ocupacionmodal-label">
                    Código Ocupación:
                    <input
                      className="ocupacionmodal-input"
                      type="text"
                      value={codigoOcupacion}
                      onChange={(event) =>
                        setCodigoOcupacion(event.target.value)
                      }
                    />
                  </label>
                </td>
                <td className="ocupacionmodal-cell">
                  <label className="ocupacionmodal-label">
                    Nombre:
                    <input
                      className="ocupacionmodal-input"
                      type="text"
                      value={nombre}
                      onChange={(event) => setNombre(event.target.value)}
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td className="ocupacionmodal-footer" colSpan="2">
                  <button className="ocupacionmodal-button-save" type="submit">
                    Guardar
                  </button>
                  <button
                    className="ocupacionmodal-button-cancel"
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

export default OcupacionesModal;