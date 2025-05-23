// src/components/ItemManager.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Button, Input, NumberInput, NumberInputField,
  VStack, HStack, Text, useToast
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, getItems, updateItem, deleteItem } from '../firebase/items';
import { setItems } from '../features/items/itemsSlice';

const ItemManager = () => {
  const user = useSelector(state => state.auth.user);
  const items = useSelector(state => state.items.items);
  const dispatch = useDispatch();
  const toast = useToast();

  const [name, setName] = useState('');
  const [cost, setCost] = useState('');

  useEffect(() => {
    if (user) {
      getItems(user.uid).then(data => dispatch(setItems(data)));
    }
  }, [user, dispatch]);

  const handleAdd = async () => {
    if (!name || !cost) return;
    const newItem = { name, cost: Number(cost) };
    await addItem(user.uid, newItem);
    const updated = await getItems(user.uid);
    dispatch(setItems(updated));
    setName('');
    setCost('');
    toast({ title: 'Item added', status: 'success' });
  };

  const handleDelete = async (id) => {
    await deleteItem(user.uid, id);
    const updated = await getItems(user.uid);
    dispatch(setItems(updated));
    toast({ title: 'Item deleted', status: 'info' });
  };

  return (
    <Box>
      <Text fontSize="xl" mb="2">Items</Text>
      <HStack>
        <Input
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <NumberInput value={cost} onChange={setCost}>
          <NumberInputField placeholder="Cost" />
        </NumberInput>
        <Button onClick={handleAdd} colorScheme="teal">Add</Button>
      </HStack>

      <VStack align="start" mt="4">
        {items.map(item => (
          <HStack key={item.id} justify="space-between" w="100%">
            <Text>{item.name}: ${item.cost}</Text>
            <Button size="sm" colorScheme="red" onClick={() => handleDelete(item.id)}>
              Delete
            </Button>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default ItemManager;
