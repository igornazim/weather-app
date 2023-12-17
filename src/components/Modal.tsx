import React, { useState } from 'react';
import {
  Backdrop, Box, Modal, Fade, Button, Typography, TextField,
} from '@mui/material';
import useForecast from '../hooks/useForecast';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: '#7498F3',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 4,
};

const modalButtonStyle = {
  height: '56px',
  borderColor: '#fff',
  color: '#fff',
  '&:hover': {
    bgcolor: 'rgba(255, 255, 255, 0.2)',
    borderColor: '#fff',
    color: '#fff',
  },
};

const textFieldClasses = {
  '& .MuiInputLabel-root': { color: '#fff' },
  '& .MuiOutlinedInput-root': {
    '& > fieldset': { border: '1px solid #fff' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
  '& .MuiOutlinedInput-root.Mui-focused': {
    '& > fieldset': { border: '1px solid #fff' },
  },
  '& .MuiOutlinedInput-root:hover': {
    '& > fieldset': { border: '1px solid #fff' },
  },
};

interface ITransitionsModalProps {
  open: boolean;
  handleClose: () => void;
}

const TransitionsModal = ({ open, handleClose }: ITransitionsModalProps) => {
  const contextData = useForecast();
  const [city, setCity] = useState('');

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    contextData?.setLocation({ city });
    setCity('');
    handleClose();
  };

  return (
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
            sx={{ mb: 2, color: '#fff' }}
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
              sx={textFieldClasses}
              id="outlined-basic"
              label="City"
              variant="outlined"
            />
            <Button
              sx={modalButtonStyle}
              type="submit"
              variant="outlined"
            >
              Ok
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TransitionsModal;
