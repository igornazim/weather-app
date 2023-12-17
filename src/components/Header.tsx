import React, { PropsWithChildren } from 'react';
import { ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import TransitionsModal from './Modal';
import useForecast from '../hooks/useForecast';

const openModalButtonStyle = {
  width: '160px',
  height: '32px',
  borderColor: '#fff',
  bgcolor: 'rgba(255, 255, 255, 0.2)',
  color: '#fff',
  border: '1px solid #fff',
  borderRadius: '10px',
  '&:hover': {
    bgcolor: 'rgba(255, 255, 255, 0.2)',
    borderColor: '#fff',
    color: '#fff',
    border: '1px solid #fff',
  },
};

const btnStyles = {
  width: '56px',
  height: '32px',
  borderColor: '#fff',
  borderRadius: '10px',
  color: '#fff',
  '&.Mui-selected': {
    color: '#fff',
    bgcolor: 'rgba(255, 255, 255, 0.2)',
  },
};

const ColorToggleButton = () => {
  const contextData = useForecast();

  return (
    <ToggleButtonGroup
      color="primary"
      exclusive
      aria-label="Platform"
    >
      <ToggleButton
        onClick={() => contextData?.setMetric('C')}
        sx={btnStyles}
        value="C"
      >
        C
      </ToggleButton>
      <ToggleButton
        onClick={() => contextData?.setMetric('F')}
        sx={btnStyles}
        value="F"
      >
        F
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const Header = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="header">
      <div className="headercontainer">
        <ColorToggleButton />
        <p>Weather App</p>
        {children}
        <Button
          sx={openModalButtonStyle}
          onClick={handleOpen}
        >
          Search
        </Button>
        <TransitionsModal open={open} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default Header;
