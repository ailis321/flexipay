
import React from 'react';

const CustomHeader = ({ color, companyName, logoUrl }) => {
  const headerStyle = {
    backgroundColor: color,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '40px 150px'
  };

  const logoStyle = {
    height: '120px', 
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
