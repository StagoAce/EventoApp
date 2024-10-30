import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import ResponsiveAppBar from '../navbar/navbar';
import ProducerEvents from './AllEventsByProductor';
import CreateEventForm from './CreateEventForm';

const EventsProductor = () => {
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
        
        <Tabs
          value={value}
          onChange={handleTabChange}
          centered
          sx={{ marginBottom: 2 }}
        >
          <Tab label="Mis eventos" />
          <Tab label="Crear evento" />
        </Tabs>

        {value === 0 ? (
          <ProducerEvents producerId={user.cedula} /> // Pasar `producerId` en vez de `user`
        ) : (
          <CreateEventForm producerId={user.cedula}/>
        )}
      </Box>
    </>
  );
};

export default EventsProductor;

