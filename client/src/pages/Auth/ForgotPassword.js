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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        '/auth/forgotpassword',
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail('');
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
          <form onSubmit={forgotPasswordHandler}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type='email'
                placeholder='test@test.com'
                size='lg'
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </FormControl>
            <Button
              type='submit'
              colorScheme='teal'
              variant='solid'
              width='full'
              mt={8}
            >
              Reset Password
            </Button>
          </form>
        </Box>
        <Text mt={8}>
          Back to <Link to='/register'>login page</Link>
        </Text>
      </Box>
    </Flex>
  );
}

export default ForgotPassword;
