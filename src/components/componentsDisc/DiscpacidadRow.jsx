import React from "react";

const DiscapacidadRow = ({ discapacidad, onDelete, onEdit }) => {
  return (
    <tr className="discapacidad-row">
      <td className="discapacidad-name">{discapacidad.categoria}</td>
      <td className="discapacidad-actions">
        <button
          className="discapacidades-editar-button"
          onClick={() => onEdit(discapacidad)}
        >
          Editar
        </button>
        <button
          className="discapacidades-eliminar-button"
          onClick={() => onDelete(discapacidad.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default DiscapacidadRow;
