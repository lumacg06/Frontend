import React from 'react';

const EtniaRow = ({ etnia, onDelete, onEdit }) => {
  return (
    <tr>
      <td>{etnia.etnia}</td>
      <td>
        <button onClick={() => onEdit(etnia)}>Editar</button>
        <button onClick={() => onDelete(etnia.id)}>Eliminar</button>
      </td>
    </tr>
  );
};

export default EtniaRow;
