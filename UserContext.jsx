import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users: ", error);
    } finally {
      setLoading(false);
    }
  };

  const modifyUser = async (action, id = null, data = null) => {
    setLoading(true);
    try {
      const docRef = id ? doc(db, 'users', id) : collection(db, 'users');
      if (action === 'add') await addDoc(docRef, data);
      if (action === 'update') await updateDoc(docRef, data);
      if (action === 'delete') await deleteDoc(docRef);
      fetchUsers();
    } catch (error) {
      console.error(`Error during ${action}: `, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <UserContext.Provider value={{ users, loading, modifyUser, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
