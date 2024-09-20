import React from 'react'; 
// Importing React for functional component creation.

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; 
// Importing necessary components from React Native.

export default function TodoItem({ todo, editTodo, deleteTodo }) {
  // Defining the TodoItem component, destructuring props: `todo`, `editTodo`, and `deleteTodo`.

  return (
    <View style={styles.todoItem}>
      {/* Displaying the text of the todo item. */}
      <Text style={{color: "#1064AB", fontWeight: "700", fontSize: 16,}}>{todo.text}</Text>

      {/* Container for the edit and delete buttons. */}
      <View style={styles.buttons}>
        
        {/* TouchableOpacity for the "Edit" button; calls `editTodo` function with the current todo as an argument when pressed. */}
        <TouchableOpacity onPress={() => editTodo(todo)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>

        {/* TouchableOpacity for the "Delete" button; calls `deleteTodo` function with the todo ID as an argument when pressed. */}
        <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Styles for the todo item container.
  todoItem: {
    flexDirection: 'row', // Aligns items in a row (horizontally).
    justifyContent: 'space-between', // Spaces out the content (todo text and buttons) evenly.
    padding: 10, // Adds padding inside the container.
    borderBottomColor: 'gray', // Adds a gray border color at the bottom.
    borderBottomWidth: 1, // Thickness of the bottom border.
  },
  // Styles for the button container.
  buttons: {
    flexDirection: 'row', // Aligns the buttons in a row (horizontally).
  },
  // Style for the "Edit" button text.
  editButton: {
    marginRight: 10, // Adds space between the "Edit" and "Delete" buttons.
    color: '#1064AB', // Sets the text color of the "Edit" button to blue.
    fontWeight: "700"
  },
  // Style for the "Delete" button text.
  deleteButton: {
    color: '#D44D5C', // Sets the text color of the "Delete" button to red.
    fontWeight: "700"
  },
});
