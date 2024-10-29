// AllEvents.js
import React, { useEffect, useState } from 'react';
import { Paper, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import { Masonry } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import LoadingIndicator from './LoadingIndicator';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const colorOptions = [
  '#E0F7FA', // Cyan 100
  '#E1BEE7', // Purple 100
  '#FFEBEE', // Pink 100
  '#FFECB3', // Yellow 100
  '#C8E6C9', // Green 100
];

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')); 
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // o 'error'


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/evento/all/');
        setEvents(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRegister = async (eventId) => {
    try {
       const response = await axios.post(`http://127.0.0.1:8000/user/subscribe/${user?.cedula}`, {
        id_evento: eventId,
      });
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage(error.response.data.error || 'Error al registrarse');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  };
  

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Typography variant="h6">Error al cargar eventos: {error.message}</Typography>;
  }

  return (
    <div>
      <Masonry columns={3} spacing={2}>
        {events.map((event) => (
          <Paper key={event._id} sx={{ padding: 2, backgroundColor: colorOptions[Math.floor(Math.random() * colorOptions.length)] }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ justifyContent: 'center' }}>
                <Typography variant="h5" align="center">{event.nombre}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">Organizador: {event.organizador}</Typography>
                <Typography variant="body1">Lugar: {event.lugar}</Typography>
                <Typography variant="body1">Dirección: {event.direccion}</Typography>
                <Typography variant="body1">Fecha de inicio: {new Date(event.fecha_inicio).toLocaleString()}</Typography>
                <Typography variant="body1">Fecha de finalización: {new Date(event.fecha_finalizacion).toLocaleString()}</Typography>
                <Typography variant="body1">Descripción: {event.descripcion}</Typography>
                <Typography variant="body1">Estado: {event.estado}</Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 1 }} onClick={() => handleRegister(event._id)}>
                  Registrarse
                </Button>
              </AccordionDetails>
            </Accordion>
          </Paper>
        ))}
      </Masonry>
      
      {/* Snackbar para mostrar mensajes */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <MuiAlert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
  
};

export default AllEvents;

