import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/login/login';
import Dashboard from './components/dashboard';
import Events from './components/productor/events';
import RegisterForm from './components/login/registrarse'; // Importar el componente de registro

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} /> {/* Ruta para el registro */}
        <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
        <Route path="/cliente/eventos/all" element={<PrivateRoute component={Events} />} />
        <Route path="/productor/eventos/all" element={<PrivateRoute component={Events} />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

const PrivateRoute = ({ component: Component }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Comprobar si hay un usuario en localStorage

  return user ? <Component /> : <Navigate to="/login" />;
};

export default App;


