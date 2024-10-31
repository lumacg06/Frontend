import React from "react";
import OcupacionRow from "./OcupacionesRow"; // Asegúrate de que este componente exista

const OcupacionesTable = ({ ocupaciones, onDelete, onEdit }) => {
  return (
    <div className="ocupaciones-container">
    <table className="ocupaciones-table">
      <thead className="ocupaciones-table-header">
        <tr className="ocupaciones-table-row">
          <th className="ocupaciones-table-header-cell">Descripción</th>
          <th className="ocupaciones-table-header-cell">Código</th>
          <th className="ocupaciones-table-header-cell">Acciones</th>
        </tr>
      </thead>
      <tbody className="ocupaciones-table-body">
        {ocupaciones.length > 0 ? (
          ocupaciones.map((ocupacion, index) => (
            <OcupacionRow
              key={`${ocupacion.codigo}-${index}`} // Cambiado a 'codigo'
              ocupacion={ocupacion}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        ) : (
          <tr>
            <td colSpan="3" className="ocupaciones-table-no-results">
              No se encontraron resultados.
            </td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  );
};

export default OcupacionesTable;