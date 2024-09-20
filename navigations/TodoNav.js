import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodoScreen from '../screens/TodoScreen';
import AddTodoScreen from '../screens/AddTodoScreen';
import { FontAwesome } from "@expo/vector-icons"; // For tab icons
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

export default function TodoNav() {
  return (
    
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Add Todo') {
              iconName = 'home';
            } else if (route.name === 'Todo List') {
              iconName = 'list';
            }

            // You can return any icon component here
            return <FontAwesome name={iconName} size={size} color={"#1064AB"} />;
          },

          tabBarLabel: ({ focused }) => {
            if (focused) {
              let labelColor = focused ? "#1064AB" : "#1e90ff";
              return (
                <Text
                  style={{ color: labelColor, fontSize: 12, marginBottom: 5 }}
                >
                  {route.name}
                </Text>
              );
            } else  {
              return null; // Hide label when not focused
            }
          },
          tabBarStyle: {
            backgroundColor: "#E2F6F7", // Light background color
            paddingBottom: 5,
            height: 60,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 2,
            elevation: 5,
          },
          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",
          },
        })}
      >
        <Tab.Screen name="Add Todo" component={AddTodoScreen} options={{ headerShown: false}} />
        <Tab.Screen name="Todo List" component={TodoScreen} options={{ headerShown: false }}/>
      </Tab.Navigator>
  );
}
