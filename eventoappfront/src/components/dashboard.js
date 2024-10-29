import React from 'react';
import { Box, Typography, Button, Grid2 } from '@mui/material'; // Cambiado a Grid en lugar de Grid2
import { useNavigate } from 'react-router-dom'; // Cambiado de useHistory a useNavigate
import ResponsiveAppBar from './navbar/navbar';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles'; // Importar styled aquí


const Dashboard = () => {
  const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory

  const handleLogout = () => {
    localStorage.removeItem('user'); // Eliminar el usuario de localStorage
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  const user = JSON.parse(localStorage.getItem('user')); // Obtener el usuario

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        <Typography variant="h4">Bienvenido, {user?.nombre}</Typography>
      </Box>
      <Grid2 container spacing={2} justifyContent="center" alignItems="center" >
        <Grid2 item size={5}>
          <Item>
            <Typography variant="h6" component="h2">
              Usuario
            </Typography>
            <Button variant="contained" color="primary">
              Ingresar
            </Button>
          </Item>
        </Grid2>
        <Grid2 item size={5}>
          <Item>
            <Typography variant="h6" component="h2">
              Creador
            </Typography>
            <Button variant="contained" color="primary">
              Ingresar
            </Button>
          </Item>
        </Grid2>
      </Grid2>
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </Box>
    </>
  );
};

export default Dashboard;

