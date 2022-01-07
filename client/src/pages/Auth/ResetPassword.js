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
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword() {
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setError('');
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `http://localhost:5000/auth/passwordreset/${resetToken}`,
        {
          password,
        },
        config
      );

      setSuccess(data.data);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
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
          <Heading>Reset Password</Heading>
          {error && <span className='error-message'>{error}</span>}
          {success && <span className='success-message'>{success}</span>}
        </Box>
        <Box my={4} textAlign='left'>
          <form onSubmit={resetPasswordHandler}>
            <FormControl isRequired mt={6}>
              <FormLabel>New Password</FormLabel>
              <Input
                type='password'
                placeholder='*******'
                size='lg'
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                type='password'
                placeholder='*******'
                size='lg'
                onChange={(event) =>
                  setConfirmPassword(event.currentTarget.value)
                }
              />
            </FormControl>
            <Button
              type='submit'
              colorScheme='teal'
              variant='solid'
              width='full'
              mt={8}
            >
              Reset my password
            </Button>
          </form>
        </Box>
        <Text mt={8}>
          Dont have an account ? <Link to='/register'>register now!</Link>
        </Text>
      </Box>
    </Flex>
  );
}

export default ResetPassword;
