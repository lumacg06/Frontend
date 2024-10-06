import React from 'react';
import EtniaRow from './EtniaRow';

const EtniasTable = ({ etnias, onEdit, onDelete }) => {
  return (
    <div className="container">
      {/* Tabla de Etnias */}
      <table className="etnias-table">
        <thead>
          <tr>
            <th className="etnias-table-header">Etnia</th>
            <th className="etnias-table-header">Acciones</th>
          </tr>
        </thead>
        <tbody>
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
