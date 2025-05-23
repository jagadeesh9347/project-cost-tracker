// src/App.jsx
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
// Fix this line:
import { auth } from './firebase'; // <--- Change from '../firebase' to './firebase'

import { useDispatch } from 'react-redux';
import { setUser, clearUser } from './features/auth/authSlice';
import { useNavigate, Routes, Route } from 'react-router-dom';

import Authpage from './pages/AuthPage';
import Home from './pages/Home';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
        // No explicit navigate here as we want router to handle initial load
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Authpage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
