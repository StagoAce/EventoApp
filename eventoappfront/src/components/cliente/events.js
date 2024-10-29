import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import ResponsiveAppBar from '../navbar/navbar';
import AllEvents from './AllEvents';
import RegisteredEvents from './RegisteredEvents';

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
          <Tab label="Todos los Eventos" />
          <Tab label="Eventos Inscritos" />
        </Tabs>

        {value === 0 ? <AllEvents /> : <RegisteredEvents user={user} />}
      </Box>
    </>
  );
};

export default Events;
