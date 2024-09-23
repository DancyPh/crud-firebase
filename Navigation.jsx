import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserManagement from './UserManagement';
import UserDetail from './UserDetail';

const Stack = createNativeStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="UserManagement">
      <Stack.Screen name="UserManagement" component={UserManagement} />
      <Stack.Screen name="UserDetail" component={UserDetail} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
