import React from 'react';

const MunicipioSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="municipio-search">
      <input
        type="text"
        placeholder="Buscar municipio por nombre..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="municipio-search-input"
      />
    </div>
  );
};

export default MunicipioSearch;