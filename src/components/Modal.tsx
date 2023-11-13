import React, { useState, useContext } from 'react';
import { ForecastContext } from '../contexts/index';
import { Backdrop } from '@mui/material';
import { Box } from '@mui/material';
import { Modal } from '@mui/material';
import { Fade } from '@mui/material';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: 'rgba(255, 255, 255, 0.2)',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 4,
};

const openModalButtonStyle = {
  width: '160px',
  height: '32px',
  borderColor: '#fff',
  bgcolor: 'rgba(255, 255, 255, 0.2)',
  color: '#fff',
  border: '1px solid #fff',
  borderRadius: '10px',
  '&:hover': {
    bgcolor: 'rgba(255, 255, 255, 0.1)',
    borderColor: '#fff',
    color: '#fff',
    border: '1px solid #fff',
  },
}

const modalButtonStyle = {
  height: '56px',
  borderColor: '#fff',
  color: '#fff',
  '&:hover': {
    bgcolor: 'rgba(255, 255, 255, 0.1)',
    borderColor: '#fff',
    color: '#fff',
  },
}

const textFieldClasses = {
  "& .MuiInputLabel-root": {color: '#fff'},//styles the label
  "& .MuiOutlinedInput-root": {
    "& > fieldset": { border: '1px solid #fff', },
  },
  "& .MuiInputLabel-root.Mui-focused": {color: '#fff'},
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": { border: '1px solid #fff', }
  },
  "& .MuiOutlinedInput-root:hover": {
    "& > fieldset": { border: '1px solid #fff', },
  }
}

interface TransitionsModalProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const TransitionsModal: React.FC<TransitionsModalProps> = ({ open, handleOpen, handleClose }) => {
  const contextData = useContext(ForecastContext);
  const [city, setCity] = useState('');

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    contextData?.getData({city});
    setCity('');
    handleClose();
  };

  return (
    <div>
      <Button
        sx={openModalButtonStyle}
        onClick={handleOpen}>
        Search
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Typography
              sx={{mb: 2, color: '#fff'}}
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              Enter your city
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                value={city}
                onChange={handleCityChange}
                sx={ textFieldClasses }
                id="outlined-basic"
                label="City"
                variant="outlined"
              />
              <Button
                sx={modalButtonStyle}
                type="submit"
                variant="outlined">
                Ok
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default TransitionsModal;