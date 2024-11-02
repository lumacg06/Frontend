import React from "react";

const DniRow = ({ dni, onDelete, onEdit }) => {
  return (
    <tr className="dni-row">
      <td className="dni-cell">{dni.nombre}</td>
      <td className="dni-cell">{dni.codigo}</td>
      <td className="dni-actions">
        <button className="dni-button-edit" onClick={() => onEdit(dni)}>
          Editar
        </button>
        <button className="dni-button-delete" onClick={() => onDelete(dni.id)}>
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default DniRow;
