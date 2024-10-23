import React from 'react';
import DniRow from './DniRow';

const DniTable = ({ dnis, onEdit, onDelete }) => {
  return (
    <div className="container">
      {/* Tabla de DNIs */}
      <table id="dni-table" className="dni-table"> {/* ID único para la tabla */}
        <thead>
          <tr>
            <th id="tipo-documento-header" className="dni-table-header">Tipo Documento</th> {/* ID único para la cabecera de tipo de documento */}
            <th id="codigo-header" className="dni-table-header">Codigo</th> {/* ID único para la cabecera de código */}
            <th id="acciones-header" className="dni-table-header">Acciones</th> {/* ID único para la cabecera de acciones */}
          </tr>
        </thead>
        <tbody id="dni-table-body"> {/* ID único para el cuerpo de la tabla */}
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