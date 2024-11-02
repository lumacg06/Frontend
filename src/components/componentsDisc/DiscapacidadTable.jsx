import React from "react";
import DiscapacidadRow from "./DiscpacidadRow";

const DiscapacidadesTable = ({ discapacidades, onEdit, onDelete }) => {
  return (
    <div className="container-dicapacidad">
      {/* Tabla de Discapacidades */}
      <table className="discapacidades-table">
        <thead className="discapacidades-thead">
          <tr className="discapacidades-table-row">
            <th className="discapacidades-header-name">Categoría</th>
            <th className="discapacidades-header-actions">Acciones</th>
          </tr>
        </thead>
        <tbody className="discapacidades-table-body">
          {discapacidades.map((discapacidad) => (
            <DiscapacidadRow
              key={discapacidad.id}
              discapacidad={discapacidad}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiscapacidadesTable;
