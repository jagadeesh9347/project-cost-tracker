// src/firebase/items.js
import { db } from '../firebase'; // Import the 'db' (Firestore) instance from your main firebase.js
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc // Not currently used in ItemManager, but good to have
} from 'firebase/firestore';

const ITEMS_COLLECTION = 'items'; // Define your Firestore collection name

// Function to add an item
export const addItem = async (userId, itemData) => {
  try {
    const docRef = await addDoc(collection(db, ITEMS_COLLECTION), {
      ...itemData,
      userId: userId, // Link the item to the user who added it
      createdAt: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e; // Re-throw the error for calling function to handle
  }
};

// Function to get items for a specific user
export const getItems = async (userId) => {
  try {
    const q = query(collection(db, ITEMS_COLLECTION), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  } catch (e) {
    console.error("Error getting documents: ", e);
    throw e;
  }
};

// Function to update an item (example - not used in your current ItemManager, but common)
export const updateItem = async (userId, itemId, newData) => {
  try {
    const itemRef = doc(db, ITEMS_COLLECTION, itemId);
    // Optional: Add a check to ensure the user owns the item before updating
    // const itemSnap = await getDoc(itemRef);
    // if (itemSnap.exists() && itemSnap.data().userId === userId) {
    await updateDoc(itemRef, newData);
    console.log("Document updated successfully");
    // } else {
    //   console.warn("Attempted to update item not owned by user or non-existent.");
    // }
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e;
  }
};

// Function to delete an item
export const deleteItem = async (userId, itemId) => {
  try {
    const itemRef = doc(db, ITEMS_COLLECTION, itemId);
    // Optional: Add a check to ensure the user owns the item before deleting
    // const itemSnap = await getDoc(itemRef);
    // if (itemSnap.exists() && itemSnap.data().userId === userId) {
    await deleteDoc(itemRef);
    console.log("Document deleted successfully");
    // } else {
    //   console.warn("Attempted to delete item not owned by user or non-existent.");
    // }
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw e;
  }
};