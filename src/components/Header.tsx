import { PropsWithChildren } from 'react';
import React from 'react';
import TransitionsModal from './Modal';

const Header = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="header">
      <p>Weather App</p>
      {children}
      <TransitionsModal open={open} handleOpen={handleOpen} handleClose={handleClose} />
    </div>
  );
}

export default Header;
