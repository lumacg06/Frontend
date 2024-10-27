import React from 'react';

const PaisSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="pais-search">
      <input
        type="text"
        placeholder="Buscar país por nombre..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pais-search-input"
      />
    </div>
  );
};

export default PaisSearch;