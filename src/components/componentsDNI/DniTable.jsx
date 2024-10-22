import React from 'react';
import DniRow from './DniRow';

const DniTable = ({ dnis, onEdit, onDelete }) => {
  return (
    <div className="container">
      {/* Tabla de DNIs */}
      <table className="dni-table">
        <thead>
          <tr>
            <th className="dni-table-header">Tipo Documento</th>
            <th className="dni-table-header">Codigo</th>
            <th className="dni-table-header">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {dnis.map((dni) => (
            <DniRow
              key={dni.id}
              dni={dni}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DniTable;