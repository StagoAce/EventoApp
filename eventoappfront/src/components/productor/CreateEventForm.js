import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const CreateEventForm = ({ producerId }) => {
  const initialFormState = {
    nombre: '',
    lugar: '',
    direccion: '',
    fecha_inicio: '',
    fecha_finalizacion: '',
    descripcion: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (Object.values(formData).some((field) => field === '')) {
      setSnackbarMessage('Todos los campos deben estar llenos');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post(`http://127.0.0.1:8000/evento/add/${producerId}`, formData);
      setSnackbarMessage(response.data.message || 'Evento creado con éxito');
      setSnackbarSeverity('success');

      // Limpiar el formulario tras envío exitoso
      setFormData(initialFormState);
    } catch (error) {
      setSnackbarMessage(error.response?.data.error || 'Error al crear el evento');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 500, margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>Crear Evento</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Lugar"
          name="lugar"
          value={formData.lugar}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Dirección"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Fecha de Inicio"
          name="fecha_inicio"
          type="datetime-local"
          value={formData.fecha_inicio}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Fecha de Finalización"
          name="fecha_finalizacion"
          type="datetime-local"
          value={formData.fecha_finalizacion}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Descripción"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Crear Evento
        </Button>
      </form>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default CreateEventForm;


