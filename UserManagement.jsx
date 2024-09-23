import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, Pressable, Alert } from 'react-native';
import { useUserContext } from './UserContext';

const UserManagement = ({ navigation }) => {
  const { users, loading, modifyUser, fetchUsers } = useUserContext();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const addUser = () => {
    if(userName.trim() === '' || userEmail.trim() ===''){
      Alert.alert('User', 'Not null!')
      return
    }
    modifyUser('add', null, { name: userName, email: userEmail });
    setUserName('');
    setUserEmail('');
  };

  const handleUserDeleted = () => fetchUsers();

  return (
    <View>
      <TextInput placeholder="Name" value={userName} onChangeText={setUserName} />
      <TextInput placeholder="Email" value={userEmail} onChangeText={setUserEmail} />
      <Button title="Add User" onPress={addUser} />
      <Button title="Reload" onPress={fetchUsers} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.navigate('UserDetail', { userId: item.id, onUserDeleted: handleUserDeleted })}
              style={{ borderRadius: 50, borderColor: 'red', borderWidth: 2, padding: 10, marginTop: 20 }}
            >
              <Text>{item.name} - {item.email}</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
};

export default UserManagement;
