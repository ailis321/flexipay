import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ searchTerm, setSearchTerm, label }) => {
  return (
    <TextField
      fullWidth
      label={label || "Search..."}
      variant="outlined"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ marginBottom: 20 }}
    />
  );
};

export default SearchBar;
