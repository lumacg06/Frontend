import React from "react";

const OcupacionesRow = ({ ocupacion, onDelete, onEdit }) => {
  return (
    <tr className="ocupacion-row">
      <td className="ocupacion-row-cell">{ocupacion.nombre}</td>
      <td className="ocupacion-row-cell">{ocupacion.codigoocupacion}</td>
      <td className="ocupacion-row-cell">
        <button onClick={() => onEdit(ocupacion)} className="ocupacion-edit-button">Editar</button>
        <button onClick={() => onDelete(ocupacion.codigoocupacion)} className="ocupacion-delete-button">Eliminar</button>
      </td>
    </tr>
  );
};

export default OcupacionesRow;