import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Text } from '@chakra-ui/react';

function Home() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <Box>
      <Text>private</Text>
      <Button onClick={logoutHandler}>Logout</Button>
    </Box>
  );
}

export default Home;
