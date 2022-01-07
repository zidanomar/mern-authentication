import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        'http://localhost:5000/auth/register',
        { username, email, password },
        config
      );
      localStorage.setItem('authToken', data.token);

      navigate('/');
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000);
    }

    navigate('/');
  };

  return (
    <Flex width='full' align='center' justifyContent='center'>
      <Box
        p={8}
        maxWidth='500px'
        borderWidth={1}
        borderRadius={8}
        boxShadow='lg'
      >
        <Box textAlign='center'>
          <Heading>Register</Heading>
          {error && <span>{error}</span>}
        </Box>
        <Box my={4} textAlign='left'>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type='text'
                placeholder='username'
                size='lg'
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Email</FormLabel>
              <Input
                type='email'
                placeholder='test@test.com'
                size='lg'
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                placeholder='*******'
                size='lg'
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </FormControl>
            <Button
              type='submit'
              colorScheme='teal'
              variant='solid'
              width='full'
              mt={8}
            >
              Sign In
            </Button>
          </form>
        </Box>
        <Text mt={8}>
          Already have an account?
          <Link to='/login'> login now!</Link>
        </Text>
      </Box>
    </Flex>
  );
}

export default Register;
