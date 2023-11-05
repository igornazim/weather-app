import { PropsWithChildren } from 'react';

const Header = ({ children }: PropsWithChildren) => {

  return (
    <div className="header">
      <p>Weather App</p>
      {children}
    </div>
  );
}

export default Header;
