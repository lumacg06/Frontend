

import React from 'react';

const MunicipioRow = ({ municipio, onDelete, onEdit }) => {
  return (
    <tr className="municipio-row">
      <td className="municipio-cell">{municipio.nombre}</td>
      <td className="municipio-cell">{municipio.codigomunicipio}</td>
      <td className="municipio-actions">
        <button className="municipio-button-edit" onClick={() => onEdit(municipio)}>Editar</button>
        <button className="municipio-button-delete" onClick={() => onDelete(municipio.codigomunicipio)}>Eliminar</button>
      </td>
    </tr>
  );
};

export default MunicipioRow;