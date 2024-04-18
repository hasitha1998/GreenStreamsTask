import React from 'react';
import AppRoutes from './routes/app-routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <AppRoutes />
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
