
import React from 'react';

const CustomHeader = ({ color, companyName, logoUrl }) => {
  const headerStyle = {
    backgroundColor: color,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px'
  };

  const logoStyle = {
    height: '50px', // Adjust as needed
    marginRight: '10px'
  };

  return (
    <header style={headerStyle}>
      {logoUrl && <img src={logoUrl} alt={`${companyName} Logo`} style={logoStyle} />}
      <h1>{companyName}</h1>
    </header>
  );
};

export default CustomHeader;
