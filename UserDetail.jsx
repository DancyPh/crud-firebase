import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const UserDetail = ({ route, navigation }) => {
  const { userId } = route.params; 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const userDoc = doc(db, 'users', userId);
      const userSnap = await getDoc(userDoc);
      if (userSnap.exists()) {
        setUser(userSnap.data());
        setUserName(userSnap.data().name);
        setUserEmail(userSnap.data().email);
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    // Sử dụng setOptions để thiết lập hàm callback
    navigation.setOptions({
      onUserDeleted: () => {
        navigation.goBack();
      }
    });
  }, [navigation]);

  const handleUpdateUser = async () => {
    if (userName.trim() === '' || userEmail.trim() === '') {
      Alert.alert('Error', 'Name and Email cannot be empty');
      return; // Dừng lại nếu có bất kỳ trường nào trống
    }
  
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { name: userName, email: userEmail });
      Alert.alert('Success', 'User updated successfully');
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };
  

  const handleDeleteUser = async () => {
    try {
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      Alert.alert('Success', 'User deleted successfully', [
        { text: 'OK', onPress: () => {
          const { onUserDeleted } = navigation.getState().routes.find(route => route.name === 'UserDetail').params;
          onUserDeleted && onUserDeleted(); // Gọi callback từ navigation options
        }}
      ]);
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      {user ? (
        <>
          <Text>Name:</Text>
          <TextInput
            value={userName}
            onChangeText={setUserName}
            style={{ borderWidth: 1, marginBottom: 10 }}
          />
          <Text>Email:</Text>
          <TextInput
            value={userEmail}
            onChangeText={setUserEmail}
            style={{ borderWidth: 1, marginBottom: 10 }}
          />
          <Button title="Update User" onPress={handleUpdateUser} />
          <Button title="Delete User" onPress={handleDeleteUser} color="red" />
        </>
      ) : (
        <Text>No user found</Text>
      )}
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default UserDetail;
