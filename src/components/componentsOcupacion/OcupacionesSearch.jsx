import React from 'react';

const OcupacionSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="ocupacion-search">
      <input
        type="text"
        placeholder="Buscar ocupación por nombre..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="ocupacion-search-input"
      />
    </div>
  );
};

export default OcupacionSearch;