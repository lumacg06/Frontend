import React from 'react';

const DniRow = ({ dni, onDelete, onEdit }) => {
  return (
    <tr id={`dni-row-${dni.id}`}> {/* ID único para la fila usando el id del DNI */}
      <td>{dni.tipoDocumento}</td>
      <td>{dni.codigo}</td>
      <td>
        <button id={`edit-button-${dni.id}`} onClick={() => onEdit(dni)}>Editar</button> {/* ID único para el botón de editar */}
        <button id={`delete-button-${dni.id}`} onClick={() => onDelete(dni.id)}>Eliminar</button> {/* ID único para el botón de eliminar */}
      </td>
    </tr>
  );
};

export default DniRow;