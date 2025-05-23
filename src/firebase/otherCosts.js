// src/firebase/otherCosts.js
import { db } from '../firebase'; // Import the 'db' (Firestore) instance
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc, // Include updateDoc for completeness
} from 'firebase/firestore';

const OTHER_COSTS_COLLECTION = 'otherCosts'; // Define your Firestore collection name for other costs

// Function to add an other cost
export const addOtherCost = async (userId, costData) => {
  try {
    const docRef = await addDoc(collection(db, OTHER_COSTS_COLLECTION), {
      ...costData,
      userId: userId, // Link the other cost to the user who added it
      createdAt: new Date(),
    });
    console.log("Other cost document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding other cost document: ", e);
    throw e;
  }
};

// Function to get other costs for a specific user
export const getOtherCosts = async (userId) => {
  try {
    const q = query(collection(db, OTHER_COSTS_COLLECTION), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const otherCosts = [];
    querySnapshot.forEach((doc) => {
      otherCosts.push({ id: doc.id, ...doc.data() });
    });
    return otherCosts;
  } catch (e) {
    console.error("Error getting other cost documents: ", e);
    throw e;
  }
};

// Function to update an other cost
export const updateOtherCost = async (userId, costId, newData) => {
  try {
    const costRef = doc(db, OTHER_COSTS_COLLECTION, costId);
    // Optional: Add a check to ensure the user owns the cost before updating
    // const costSnap = await getDoc(costRef);
    // if (costSnap.exists() && costSnap.data().userId === userId) {
    await updateDoc(costRef, newData);
    console.log("Other cost document updated successfully");
    // } else {
    //   console.warn("Attempted to update other cost not owned by user or non-existent.");
    // }
  } catch (e) {
    console.error("Error updating other cost document: ", e);
    throw e;
  }
};

// Function to delete an other cost
export const deleteOtherCost = async (userId, costId) => {
  try {
    const costRef = doc(db, OTHER_COSTS_COLLECTION, costId);
    // Optional: Add a check to ensure the user owns the cost before deleting
    // const costSnap = await getDoc(costRef);
    // if (costSnap.exists() && costSnap.data().userId === userId) {
    await deleteDoc(costRef);
    console.log("Other cost document deleted successfully");
    // } else {
    //   console.warn("Attempted to delete other cost not owned by user or non-existent.");
    // }
  } catch (e) {
    console.error("Error deleting other cost document: ", e);
    throw e;
  }
};