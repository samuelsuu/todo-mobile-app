import React, { useState, useEffect } from "react";
// Importing React, along with useState for state management and useEffect for lifecycle methods.

import {StyleSheet, SafeAreaView } from "react-native";
// Importing necessary components from React Native to create views and apply styles.

import AsyncStorage from "@react-native-async-storage/async-storage";
// Importing AsyncStorage to save and retrieve data (todos) locally on the device.

import TodoInput from "../components/TodoInput";
// Importing the TodoInput component for adding/updating todos.

import TodoList from "../components/TodoList";
// Importing the TodoList component for displaying the list of todos.

import { scheduleTodoNotification } from "../notificationHelper";
// Importing the notification helper to schedule a notification when a todo is added.

import Logout from "../components/Logout";
import Created from "../components/Created";

export default function TodoScreen() {
  const [todos, setTodos] = useState([]);
  // `todos` stores the list of todos, initialized as an empty array. `setTodos` is used to update the todos.

  const [newTodo, setNewTodo] = useState("");
  // `newTodo` stores the text of the new todo being added or edited. `setNewTodo` is used to update it.

  const [selectedTodo, setSelectedTodo] = useState(null);
  // `selectedTodo` stores the todo currently being edited, if any. `setSelectedTodo` updates it.

  const [selectedTime, setSelectedTime] = useState(null);
  // `selectedTime` stores the time selected for a todo notification. `setSelectedTime` updates it.

  useEffect(() => {
    loadTodos();
    // On component mount, it loads the stored todos from AsyncStorage.
  }, []);

  const loadTodos = async () => {
    // Function to load todos from AsyncStorage.
    const storedTodos = await AsyncStorage.getItem("todos");
    // Retrieving the todos stored under the key "todos".

    if (storedTodos) setTodos(JSON.parse(storedTodos));
    // If there are stored todos, parse them from JSON format and set them to the `todos` state.
  };

  const saveTodos = async (todos) => {
    // Function to save todos to AsyncStorage.
    await AsyncStorage.setItem("todos", JSON.stringify(todos));
    // Converts the todos array to a string and saves it under the key "todos" in AsyncStorage.

    setTodos(todos);
    // Updates the state with the new list of todos.
  };

  const addTodo = async () => {
    // Function to add a new todo.
    if (newTodo.trim() === "") return;
    // If the new todo text is empty or just spaces, don't add it.

    const todo = {
      id: Date.now().toString(),
      // Generates a unique ID using the current timestamp.

      text: newTodo,
      // The text of the new todo.

      time: selectedTime,
      // The selected time for the todo (for scheduling notifications).
    };

    const updatedTodos = [...todos, todo];
    // Creates a new array with the existing todos and adds the new todo to the end.

    await saveTodos(updatedTodos);
    // Saves the updated todos array to AsyncStorage.

    setNewTodo("");
    // Clears the `newTodo` input after adding the todo.

    setSelectedTime(null);
    // Resets the `selectedTime` after adding the todo.

    scheduleTodoNotification(todo.text, todo.time);
    // Schedules a notification for the newly added todo at the specified time.
  };

  const editTodo = (todo) => {
    // Function to edit an existing todo.
    setSelectedTodo(todo);
    // Sets the selected todo for editing.

    setNewTodo(todo.text);
    // Populates the input field with the text of the todo being edited.
  };

  const updateTodo = async () => {
    // Function to update a todo after editing.
    if (selectedTodo) {
      const updatedTodos = todos.map((todo) =>
        todo.id === selectedTodo.id ? { ...todo, text: newTodo } : todo
      );
      // Maps over the todos array and updates the text of the matching todo.

      await saveTodos(updatedTodos);
      // Saves the updated list of todos to AsyncStorage.

      setSelectedTodo(null);
      // Clears the selected todo after updating.

      setNewTodo("");
      // Clears the `newTodo` input after updating.
    }
  };

  const deleteTodo = async (id) => {
    // Function to delete a todo.
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    // Filters out the todo with the matching `id` from the todos array.

    await saveTodos(updatedTodos);
    // Saves the updated list of todos (after deletion) to AsyncStorage.
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* The main container for the TodoScreen, which holds the input and list components. */}

      <TodoInput
        // Rendering the TodoInput component with necessary props.
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        addTodo={addTodo}
        updateTodo={updateTodo}
        selectedTodo={selectedTodo}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />
      <TodoList
        // Rendering the TodoList component to display the list of todos.
        todos={todos}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      />

      <Created />
      <Logout />

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Makes the container take up the entire screen height.

    paddingTop: 50,
    // Adds padding to the top to give space between the top edge and the content.

    paddingHorizontal: 20,
    // Adds padding on the left and right sides for some horizontal space.

    paddingTop: 40,
    backgroundColor: "white",
    paddingBottom: 20,
  },
});
