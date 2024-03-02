import React from 'react';
import Box from '@mui/material/Box';

interface NoTasksAlertProps {
  text: string;
}

const NoTasksAlert: React.FC<NoTasksAlertProps> = ({ text }) => {
  return (
    <Box
      sx={{
        border: '2px solid #40E0D0',
        borderRadius: '5px',
        backgroundColor: '#AFEEEE',
        padding: '10px',
        textAlign: 'center',
        fontWeight: 'bold',
        width: '40vw',
        position: 'fixed',
        top: '50%',
        left: '33%',
        boxShadow: '3px 3px 5px 5px rgba(0, 0, 0, 0.4) ',
      }}
    >
      {text}
    </Box>
  );
};

export default NoTasksAlert;
