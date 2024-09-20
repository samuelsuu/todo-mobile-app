import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, SafeAreaView, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const handleRegistration = async () => {
    try {
      // Get existing users from AsyncStorage
      const usersData = await AsyncStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      // Check if the username or email already exists
      const userExists = users.some(user => user.username === username || user.email === email);

      if (userExists) {
        Alert.alert('Username or email already exists');
      } else {
        // Add new user
        const newUser = { username, email, password };
        users.push(newUser);
        await AsyncStorage.setItem('users', JSON.stringify(users));

        Alert.alert('Registration successful!');
        navigation.replace('Login'); // Navigate to SignIn screen after successful registration
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('An error occurred during registration');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1064AB' }}>
      <Text style={{ fontSize: 24, marginBottom: 20, color: 'white' }}>Register</Text>
      <TextInput
        style={{ width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8, color: 'white' }}
        placeholder="Username"
        placeholderTextColor="white"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={{ width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8, color: 'white' }}
        placeholder="Email"
        placeholderTextColor="white"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={{ width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8, color: 'white' }}
        placeholder="Password"
        placeholderTextColor="white"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button title="Register" onPress={handleRegistration} />

      <Text style={{ color: 'white', marginTop: 10 }}>
        Don't have an account?{' '}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Sign In</Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  );
}

export default Registration;
