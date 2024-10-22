import React from 'react';

const DniRow = ({ dni, onDelete, onEdit }) => {
  return (
    <tr>
      <td>{dni.tipoDocumento}</td>
      <td>{dni.codigo}</td>
      <td>
        <button onClick={() => onEdit(dni)}>Editar</button>
        <button onClick={() => onDelete(dni.id)}>Eliminar</button>
      </td>
    </tr>
  );
};

export default DniRow;