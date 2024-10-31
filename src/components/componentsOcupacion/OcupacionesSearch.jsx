import React, { useState } from 'react';

const OcupacionSearch = ({ searchTerm, onSearchChange }) => {
  const [searchInput, setSearchInput] = useState(searchTerm);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <div className="ocupacion-search">
      <input
        type="text"
        placeholder="Buscar ocupación por nombre..."
        value={searchInput}
        onChange={handleSearchChange}
        className="ocupacion-search-input"
      />
    </div>
  );
};

export default OcupacionSearch;