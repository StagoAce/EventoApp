import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom'; // Importar Link
import axios from 'axios';

export default function RegisterForm() {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();

    // Crear el objeto de datos para el registro
    const requestData = {
        cedula: Number(cedula), // Asegúrate de convertir a número
        nombre: nombre,
        apellidos: apellidos,
        email: email,
    };

    try {
        const response = await axios.post('http://127.0.0.1:8000/user/add/', requestData);
        console.log('Respuesta del servidor:', response.data);
        // Aquí puedes manejar la respuesta, como redirigir al usuario o mostrar un mensaje de éxito
    } catch (error) {
        console.error('Error en la solicitud de registro:', error.response ? error.response.data : error.message);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
    }
};

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Registrarse
      </Typography>
      <form onSubmit={handleRegister} style={{ width: '100%', maxWidth: 400 }}>
        <TextField
          label="Cédula"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          required
        />
        <TextField
          label="Nombre"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <TextField
          label="Apellidos"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
        />
        <TextField
          label="Correo electrónico"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Registrarse
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button 
              component={Link} // Usar Link para enlazar
              to="/" // Ruta a la página de inicio o login
              variant="outlined" 
              color="secondary" 
              fullWidth
            >
              Volver
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
