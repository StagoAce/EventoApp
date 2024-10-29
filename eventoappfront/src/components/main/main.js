import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid2 } from '@mui/material';

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

export default function BoxBasic() {
  return (
    <Grid2 container spacing={2} justifyContent="center" alignItems="center" >
      <Grid2 item size={12}>
        <h1 style={{ textAlign: 'center' }}>Mi Aplicación de React</h1>
      </Grid2>
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
  );
}
