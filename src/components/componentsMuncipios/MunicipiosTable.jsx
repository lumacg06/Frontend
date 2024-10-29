import React from "react";
import MunicipioRow from "./MunicipiosRow";

const MunicipiosTable = ({ municipios, onDelete, onEdit }) => {
  return (
    <table className="municipios-table">
      <thead className="municipios-table-header">
        <tr className="municipios-table-row">
          <th className="municipios-table-header-cell">Nombre</th>
          <th className="municipios-table-header-cell">Código Municipio</th>
          <th className="municipios-table-header-cell">Acciones</th>
        </tr>
      </thead>
      <tbody className="municipios-table-body">
        {municipios.length > 0 ? (
          municipios.map((municipio, index) => (
            <MunicipioRow
              key={`${municipio.codigomunicipio}-${index}`}
              municipio={municipio}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        ) : (
          <tr>
            <td colSpan="3" className="municipios-table-no-results">
              No se encontraron resultados.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default MunicipiosTable;