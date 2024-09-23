import React from 'react';
import { SafeAreaView } from 'react-native';
import { UserProvider } from './UserContext';
import Navigation from './Navigation';

const App = () => (
  <UserProvider>
    <SafeAreaView style={{ flex: 1, marginTop: 25, paddingHorizontal: 10 }}>
      <Navigation />
    </SafeAreaView>
  </UserProvider>
);

export default App;
