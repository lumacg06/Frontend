import React from "react";

const OcupacionesRow = ({ ocupacion, onDelete, onEdit }) => {
  return (
    <tr className="ocupacion-row">
      <td className="ocupacion-row-cell">{ocupacion.descripcion}</td>
      <td className="ocupacion-row-cell">{ocupacion.codigo}</td>
      <td className="ocupacion-row-cell">
        <button onClick={() => onEdit(ocupacion)} className="ocupacion-edit-button">Editar</button>
        <button onClick={() => onDelete(ocupacion.codigo)} className="ocupacion-delete-button">Eliminar</button>
      </td>
    </tr>
  );
};

export default OcupacionesRow;