import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate
import axios from 'axios';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [cedula, setCedula] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Inicializar el hook useNavigate

  const handleLogin = async (event) => {
    event.preventDefault();

    // Validar que la cédula sea numérica
    if (!/^\d+$/.test(cedula)) {
      setError('La cédula debe contener solo números.');
      return; // Salir si la validación falla
    }

    const requestData = {
      cedula: Number(cedula),
      email: email,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/user/login', requestData);
      setError(''); // Limpiar el error si la solicitud es exitosa
      const userData = response.data.user; // Obtener los datos del usuario de la respuesta
      localStorage.setItem('user', JSON.stringify(userData)); // Almacenar el usuario en localStorage
      console.log('Respuesta del servidor:', response.data);
      navigate('/dashboard'); // Redirigir al Dashboard después de iniciar sesión
    } catch (error) {
      console.error('Error en la solicitud:', error.response ? error.response.data : error.message);
      setError('Error al iniciar sesión. Intenta nuevamente.'); // Mostrar error si la solicitud falla
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
        Iniciar Sesión
      </Typography>
      {error && <Typography color="error">{error}</Typography>} {/* Mostrar mensaje de error */}
      <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: 400 }}>
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
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Ingresar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" component={Link} to="/register" color="secondary" fullWidth>
              Registrarse
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
