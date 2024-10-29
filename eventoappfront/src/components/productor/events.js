import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import ResponsiveAppBar from '../navbar/navbar';

const Events = () => {
  const [value, setValue] = useState(0); // Estado para controlar qué pestaña está activa
  const user = JSON.parse(localStorage.getItem('user')); // Obtener el usuario

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <ResponsiveAppBar />
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" align="center">Eventos</Typography>
        
        <Tabs value={value} onChange={handleTabChange} sx={{ marginBottom: 2 }}>
          <Tab label="Eventos propios" />
          <Tab label="Crear evento" />
        </Tabs>

        {value === 0 ? <createEvent user = {user} /> : <createEvent user={user} />}
      </Box>
    </>
  );
};

export default Events;