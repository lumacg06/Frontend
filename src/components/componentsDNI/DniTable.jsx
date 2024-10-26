import React from "react";
import DniRow from "./DniRow";

const DniTable = ({ dnis, onDelete, onEdit }) => {
  return (
    <div className="dni-container"> 
    <table className="dni-table">
      <thead className="dni-table-thead">
        <tr className="dni-table-row">
          <th className="dni-header-nombre">Tipo de documento</th>
          <th className="dni-header-codigo">Código</th>
          <th className="dni-header-acciones">Acciones</th>
        </tr>
      </thead>
      <tbody className="dni-table-body">
        {dnis.map((dni) => (
          <DniRow 
            key={dni.id}
            dni={dni} 
            onDelete={onDelete} 
            onEdit={onEdit} 
          />
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default DniTable;