import React from 'react';

const PaisesRow = ({ pais, onDelete, onEdit }) => {
  return (
    <tr className="pais-row">
      <td className="pais-cell">{pais.codigoiso}</td>  
      <td className="pais-cell">{pais.nombre}</td>
      <td className="pais-actions">
        <button className="pais-button-edit" onClick={() => onEdit(pais)}>Editar</button>
        <button className="pais-button-delete" onClick={() => onDelete(pais.codigoiso)}>Eliminar</button>
      </td>
    </tr>
  );
};

export default PaisesRow;