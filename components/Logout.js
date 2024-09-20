import { StyleSheet, View, Button } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native'; // Import CommonActions

const Logout = () => {
  const navigation = useNavigation();

  // Handle logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userSession'); // Clear user session data
    
    // Reset the navigation stack so the user cannot navigate back
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Reg' }], // Replace 'Reg' with your login/registration screen name
      })
    );
  };

  return (
    <View>
      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({});
