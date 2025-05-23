// src/pages/Authpage.jsx
import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Text,
  Link,
  useToast // Import useToast for user feedback
} from '@chakra-ui/react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../firebase'; // Ensure this path is correct for your firebase.js
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Authpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // State to toggle between login/signup form
  const toast = useToast(); // Initialize toast for notifications
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleAuthAction = async () => {
    try {
      if (isRegistering) {
        // Sign Up
        await createUserWithEmailAndPassword(auth, email, password);
        toast({
          title: 'Account created.',
          description: "You've successfully registered and logged in.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        // Log In
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: 'Logged in.',
          description: "You've successfully logged in.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
      // On successful login/signup, navigate to the home page
      navigate('/home');
    } catch (error) {
      // Handle errors from Firebase Authentication
      console.error("Authentication error:", error.message);
      toast({
        title: 'Authentication failed.',
        description: error.message, // Display Firebase's error message
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      p={8}
      maxWidth="500px"
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
      margin="auto"
      mt={20} // Top margin for centering
      bg="white"
    >
      <Heading mb={6} textAlign="center">
        {isRegistering ? 'Sign Up' : 'Login'}
      </Heading>

      <VStack spacing={4}>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button
          colorScheme="teal"
          size="lg"
          width="full"
          onClick={handleAuthAction}
        >
          {isRegistering ? 'Sign Up' : 'Login'}
        </Button>

        <Text>
          {isRegistering ? 'Already have an account?' : 'Don\'t have an account?'}{' '}
          <Link color="teal.500" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Login' : 'Create new account'}
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default Authpage;