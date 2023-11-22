import React, { useContext, PropsWithChildren } from 'react';
import TransitionsModal from './Modal';
import { ToggleButton } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';
import { ForecastContext } from '../contexts/index';

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
}

const ColorToggleButton = () => {
  const contextData = useContext(ForecastContext);
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton
        onClick={() => contextData?.setMetric('C')}
        sx={btnStyles}
        value="C">
        C
      </ToggleButton>
      <ToggleButton
        onClick={() => contextData?.setMetric('F')}
        sx={btnStyles}
        value="F">
        F
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

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
        <TransitionsModal open={open} handleOpen={handleOpen} handleClose={handleClose} />
      </div>
    </div>
  );
}

export default Header;
