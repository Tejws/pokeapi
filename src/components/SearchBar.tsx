// src/components/SearchBar.tsx
import React from 'react';

// Define the types for the props
interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search Pokémon..."
      style={{
        marginBottom: '20px',
        padding: '10px',
        width: '300px',
        border: '2px solid #9b59b6',
        borderRadius: '4px',
        backgroundColor: '#2c2c2c',
        color: '#e0e0e0',
        outline: 'none',
      }}
    />
  );
};

export default SearchBar;
