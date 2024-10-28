import React from "react";
import PaisRow from "./PaisesRow";

const PaisesTable = ({ paises, onDelete, onEdit }) => {
  return (
    <table className="paises-table">
      <thead className="paises-table-header">
        <tr className="paises-table-row">
          <th className="paises-table-header-cell">Nombre</th>
          <th className="paises-table-header-cell">Código ISO</th>
          <th className="paises-table-header-cell">Acciones</th>
        </tr>
      </thead>
      <tbody className="paises-table-body">
        {paises.length > 0 ? (
          paises.map((pais, index) => (
            <PaisRow
              key={`${pais.codigoiso}-${index}`}
              pais={pais}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        ) : (
          <tr>
            <td colSpan="3" className="paises-table-no-results">
              {" "}
              No se encontraron resultados.{" "}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PaisesTable;
