import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/');
    }
  }, [navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        'http://localhost:5000/auth/login',
        { email, password },
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
          <Heading>Login</Heading>
          {error && <span>{error}</span>}
        </Box>
        <Box my={4} textAlign='left'>
          <form onSubmit={loginHandler}>
            <FormControl isRequired>
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
          Dont have an account ? <Link to='/register'>register now!</Link>
        </Text>
        <Text mt={8}>
          Forgot your account ? <Link to='/forgotpassword'>reset password</Link>
        </Text>
      </Box>
    </Flex>
  );
}

export default Login;
