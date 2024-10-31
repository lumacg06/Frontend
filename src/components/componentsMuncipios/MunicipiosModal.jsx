import React, { useEffect, useState } from "react";

const MunicipiosModal = ({ municipio, onSave, onCancel }) => {
  const [codigoMunicipio, setCodigoMunicipio] = useState("");
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (municipio) {
      setCodigoMunicipio(municipio.codigomunicipio || "");
      setNombre(municipio.nombre || "");
    }
  }, [municipio]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedMunicipio = {
      codigomunicipio: codigoMunicipio,
      nombre: nombre,
    };
    onSave(updatedMunicipio);
  };

  return (
    <div className="municipiomodal-overlay">
      <div className="municipiomodal-content">
        <h2 className="municipiomodal-title">Editar Municipio</h2>
        <form className="municipiomodal-form" onSubmit={handleSubmit}>
          <table className="municipiomodal-table">
            <tbody>
              <tr className="municipiomodal-row">
                <td className="municipiomodal-cell">
                  <label className="municipiomodal-label">
                    Código Municipio:
                    <input
                      className="municipiomodal-input"
                      type="text"
                      value={codigoMunicipio}
                      onChange={(event) => setCodigoMunicipio(event.target.value)}
                    />
                  </label>
                </td>
                <td className="municipiomodal-cell">
                  <label className="municipiomodal-label">
                    Nombre:
                    <input
                      className="municipiomodal-input"
                      type="text"
                      value={nombre}
                      onChange={(event) => setNombre(event.target.value)}
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td className="municipiomodal-footer" colSpan="2">
                  <button className="municipiomodal-button-save" type="submit">
                    Guardar
                  </button>
                  <button
                    className="municipiomodal-button-cancel"
                    type="button"
                    onClick={onCancel}
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

export default MunicipiosModal;