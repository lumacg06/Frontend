import React from "react";

const EtniaRow = ({ etnia, onDelete, onEdit }) => {
  return (
    <tr className="etnia-row">
      <td className="etnia-name">{etnia.etnia}</td>
      <td className="etnia-actions">
        <button className="etnia-edit-button" onClick={() => onEdit(etnia)}>
          Editar
        </button>
        <button
          className="etnia-delete-button"
          onClick={() => onDelete(etnia.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default EtniaRow;
