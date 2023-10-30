import React, { PropsWithChildren } from 'react';
import '../App.css';

const Header = ({ children }: PropsWithChildren) => {

  return (
    <div className="header">
      <p>Weather App</p>
      {children}
    </div>
  );
}

export default Header;
