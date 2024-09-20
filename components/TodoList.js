import React from 'react'; 
// Importing React for creating the functional component.

import { FlatList, StyleSheet } from 'react-native'; 
// Importing FlatList (for rendering the list of todos) and StyleSheet from React Native.

import TodoItem from './TodoItem'; 
// Importing the TodoItem component to display each todo item.

export default function TodoList({ todos, editTodo, deleteTodo }) {
  // The `TodoList` component takes `todos` (array of todo objects), `editTodo`, and `deleteTodo` functions as props.

  return (
    <FlatList
      data={todos} 
      // `data` is the array of todo items that will be rendered.

      keyExtractor={(item) => item.id} 
      // `keyExtractor` provides a unique key for each item using the `id` property of the todo.

      renderItem={({ item }) => (
        // `renderItem` is a function that takes each todo item (`item`) and renders the TodoItem component.

        <TodoItem 
          todo={item} 
          // Pass the current todo item to the TodoItem component as a prop.

          editTodo={editTodo} 
          // Pass the `editTodo` function to TodoItem, allowing edits.

          deleteTodo={deleteTodo} 
          // Pass the `deleteTodo` function to TodoItem, allowing deletions.
        />
      )}

      style={styles.list} 
      // Applying styles to the FlatList (defined below).
    />
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 10, 
    // Adds space at the top of the list for better visibility.
  },
});
