// src/pages/Home.jsx
import React from 'react';
import {
  Box,
  Heading,
  Button,
  VStack,
  Text,
  useToast,
  HStack
} from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ItemManager from '../components/ItemManager';
import OtherCostsManager from '../components/OtherCostsManager';

function Home() {
  const navigate = useNavigate();
  const toast = useToast();

  // Get items and otherCosts from Redux store
  const items = useSelector(state => state.items.items);
  const otherCosts = useSelector(state => state.otherCosts.otherCosts);

  // Calculate total project cost
  const totalItemsCost = items.reduce((sum, item) => sum + (item.cost || 0), 0);
  const totalOtherCosts = otherCosts.reduce((sum, cost) => sum + (cost.amount || 0), 0);
  const totalProjectCost = totalItemsCost + totalOtherCosts;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Logged out.',
        description: "You've been successfully logged out.",
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error.message);
      toast({
        title: 'Logout failed.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} maxWidth="800px" margin="auto">
      <HStack justifyContent="space-between" mb={6}>
        <Heading as="h1" size="xl">Welcome to Project Cost Tracker</Heading>
        <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
      </HStack>

      {/* Item Manager Section */}
      <ItemManager />

      {/* Other Costs Manager Section */}
      <Box mt={8}>
        <OtherCostsManager />
      </Box>

      {/* Total Project Cost Display (UNCOMMENT THIS) */}
      <Box mt={8} p={4} borderWidth="1px" borderRadius="md" bg="blue.50">
        <Heading as="h2" size="lg" mb={2} color="blue.700">
          Total Project Cost
        </Heading>
        <Text fontSize="3xl" fontWeight="bold" color="blue.900">
          ${totalProjectCost.toFixed(2)} {/* Display with 2 decimal places */}
        </Text>
      </Box>

      {/* You can remove this test text now if you wish */}
      {/* <Text mt={4} fontSize="xl" color="green.500">
        If you see this, Home.jsx is rendering!
      </Text> */}
    </Box>
  );
}

export default Home;