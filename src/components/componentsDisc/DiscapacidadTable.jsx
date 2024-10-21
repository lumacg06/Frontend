import React from 'react';
import DiscapacidadRow from './DiscpacidadRow';

const DiscapacidadesTable = ({ discapacidades, onEdit, onDelete }) => {
  return (
    <div className="container">
      {/* Tabla de Discapacidades */}
      <table className="discapacidades-table">
        <thead>
          <tr>
            <th className="discapacidades-table-header">Categoría</th>
            <th className="discapacidades-table-header">Acciones</th>
          </tr>
        </thead>
        <tbody>
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
