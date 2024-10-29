// src/components/LoadingIndicator.js
import React, { useEffect, useState } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

const LoadingIndicator = () => {
  const [progress, setProgress] = useState(0); // Progreso de carga
  const [buffer, setBuffer] = useState(0); // Buffer para el progreso
  const [isVisible, setIsVisible] = useState(true); // Estado para controlar la visibilidad

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(oldProgress + 10, 100);
      });
      setBuffer((oldBuffer) => {
        if (oldBuffer === 100) {
          return 100;
        }
        return Math.min(oldBuffer + 5, 100);
      });
    }, 300); // Ajusta la velocidad de incremento según lo necesites

    // Temporizador para asegurarse de que la animación dure al menos 10 segundos
    const timer = setTimeout(() => {
      setIsVisible(false); // Ocultar la animación después de 10 segundos
    }, 10000); // 10000 ms = 10 segundos

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) {
    return null; // No renderiza nada si no se debe mostrar
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} sx={{ width: '100%', marginBottom: 2 }} />
      <Typography variant="h6">Cargando eventos...</Typography>
    </Box>
  );
};

export default LoadingIndicator;

