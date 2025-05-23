// src/components/OtherCostsManager.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Button, Input, NumberInput, NumberInputField,
  VStack, HStack, Text, useToast, Heading
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { addOtherCost, getOtherCosts, deleteOtherCost } from '../firebase/otherCosts'; // Import your Firebase functions
import { setOtherCosts } from '../features/otherCosts/otherCostsSlice'; // Import your Redux action

const OtherCostsManager = () => {
  const user = useSelector(state => state.auth.user);
  const otherCosts = useSelector(state => state.otherCosts.otherCosts); // Access otherCosts from Redux state
  const dispatch = useDispatch();
  const toast = useToast();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (user) {
      getOtherCosts(user.uid).then(data => dispatch(setOtherCosts(data)));
    }
  }, [user, dispatch]);

  const handleAdd = async () => {
    if (!description || !amount) {
      toast({
        title: 'Please fill all fields.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newOtherCost = { description, amount: Number(amount) };
    try {
      await addOtherCost(user.uid, newOtherCost);
      const updated = await getOtherCosts(user.uid);
      dispatch(setOtherCosts(updated)); // Update Redux state with latest data
      setDescription('');
      setAmount('');
      toast({ title: 'Other cost added', status: 'success' });
    } catch (error) {
      console.error("Error adding other cost:", error);
      toast({ title: 'Failed to add other cost', description: error.message, status: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOtherCost(user.uid, id);
      const updated = await getOtherCosts(user.uid);
      dispatch(setOtherCosts(updated)); // Update Redux state with latest data
      toast({ title: 'Other cost deleted', status: 'info' });
    } catch (error) {
      console.error("Error deleting other cost:", error);
      toast({ title: 'Failed to delete other cost', description: error.message, status: 'error' });
    }
  };

  return (
    <Box>
      <Heading as="h2" size="lg" mb="2">Other Costs</Heading>
      <HStack>
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <NumberInput value={amount} onChange={setAmount}>
          <NumberInputField placeholder="Amount" />
        </NumberInput>
        <Button onClick={handleAdd} colorScheme="purple">Add</Button>
      </HStack>

      <VStack align="start" mt="4">
        {otherCosts.length === 0 ? (
          <Text mt={4} color="gray.500">No other costs added yet.</Text>
        ) : (
          otherCosts.map(cost => (
            <HStack key={cost.id} justify="space-between" w="100%" p={2} borderWidth="1px" borderRadius="md">
              <Text>{cost.description}: ${cost.amount}</Text>
              <Button size="sm" colorScheme="red" onClick={() => handleDelete(cost.id)}>
                Delete
              </Button>
            </HStack>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default OtherCostsManager;