import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';

function Header() {
  const token = localStorage.getItem('token');

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      <Button component={Link} to="/" variant="contained" color="primary">
        Home
      </Button>
      {/* <Box sx={{ marginLeft: '10px' }}>
        <Button component={Link} to="/logout" variant="contained" color="secondary">
          {token ? 'Logout' : 'Login'}
        </Button>
      </Box> */}
    </Box>
  );
}

export default Header;
