import React from 'react';

const DiscapacidadRow = ({ discapacidad, onDelete, onEdit }) => {
  return (
    <tr>
      <td>{discapacidad.categoria}</td>
      <td>
        <button onClick={() => onEdit(discapacidad)}>Editar</button>
        <button onClick={() => onDelete(discapacidad.id)}>Eliminar</button>
      </td>
    </tr>
  );
};

export default DiscapacidadRow;
