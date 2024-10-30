// ProducerEvents.js
import React, { useEffect, useState } from 'react';
import { Paper, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Masonry } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import LoadingIndicator from '../cliente/LoadingIndicator';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const colorOptions = [
  '#E0F7FA', // Cyan 100
  '#E1BEE7', // Purple 100
  '#FFEBEE', // Pink 100
  '#FFECB3', // Yellow 100
  '#C8E6C9', // Green 100
];

const ProducerEvents = ({ producerId }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchProducerEvents = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/evento/producer/${producerId}`);
        setEvents(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducerEvents();
  }, [producerId]);

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
                <Typography variant="body1">Número de asistentes: {event.num_asistentes || 0}</Typography> {/* Número de asistentes */}
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

export default ProducerEvents;