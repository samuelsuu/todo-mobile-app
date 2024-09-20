import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Reg from "./navigations/Reg";
import TodoNav from "./navigations/TodoNav";


const Stack = createNativeStackNavigator();

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function App() {
  useEffect(() => {
    const hideSplashScreen = async () => {
      // Simulate some loading task or app initialization
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Hide the splash screen after the app is ready
      await SplashScreen.hideAsync();
    };

    hideSplashScreen();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Registration Screen */}
        <Stack.Screen
          name="Reg"
          component={Reg}
          options={{ headerShown: false }}
        />

        {/* Todo Screen */}
        <Stack.Screen
          name="Todo"
          component={TodoNav}
          options={{ headerShown: false }}
        />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
