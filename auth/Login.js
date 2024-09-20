import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import SplashScreen from "../components/SplashScreen";

function SignIn() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSplash, setShowSplash] = useState(true); // Splash initially visible

  const navigation = useNavigation();

  // Show splash screen first, hide after the timer
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // Handle sign-in functionality
  const handleSignIn = async () => {
    try {
      // Get users from AsyncStorage
      const usersData = await AsyncStorage.getItem("users");
      const users = usersData ? JSON.parse(usersData) : [];

      // Check if the user exists and password matches
      const user = users.find(
        (user) =>
          (user.username === usernameOrEmail || user.email === usernameOrEmail) &&
          user.password === password
      );

      if (user) {
        Alert.alert("Sign in successful!");
        navigation.replace("Todo"); // Navigate to Todo screen on success
      } else {
        Alert.alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      Alert.alert("An error occurred during sign in");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1064AB" }}>
      <Text style={{ fontSize: 24, marginBottom: 20, color: "white" }}>Sign In</Text>
      <TextInput
        style={{
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          padding: 8,
          color: "white", // Input text color
        }}
        placeholder="Username or Email"
        placeholderTextColor="white" // Placeholder text color
        autoCapitalize="none"
        value={usernameOrEmail}
        onChangeText={setUsernameOrEmail}
      />
      <TextInput
        style={{
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          padding: 8,
          color: "white", // Input text color
        }}
        placeholder="Password"
        placeholderTextColor="white" // Placeholder text color
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />

      <Text style={{ color: "white", marginTop: 10 }}>
        Don't have an account?{" "}
        <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Sign Up</Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  );
}

export default SignIn;
