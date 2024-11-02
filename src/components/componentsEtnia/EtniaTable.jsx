import React from "react";
import EtniaRow from "./EtniaRow";

const EtniasTable = ({ etnias, onEdit, onDelete }) => {
  return (
    <div className="etnias-container">
      {/* Tabla de Etnias */}
      <table className="etnias-table">
        <thead className="etnias-table-header">
          <tr className="etnias-table-row">
            <th className="etnias-header-name">Etnia</th>
            <th className="etnias-header-actions">Acciones</th>
          </tr>
        </thead>
        <tbody className="etnias-table-body">
          {etnias.map((etnia) => (
            <EtniaRow
              key={etnia.id}
              etnia={etnia}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EtniasTable;
