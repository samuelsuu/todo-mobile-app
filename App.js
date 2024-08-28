import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { scheduleTodoNotification } from './notificationHelper';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const storedTodos = await AsyncStorage.getItem('todos');
    if (storedTodos) setTodos(JSON.parse(storedTodos));
  };

  const saveTodos = async (todos) => {
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
    setTodos(todos);
  };

  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    const todo = { id: Date.now().toString(), text: newTodo, time: selectedTime };
    const updatedTodos = [...todos, todo];
    await saveTodos(updatedTodos);
    setNewTodo('');
    setSelectedTime(null);
    scheduleTodoNotification(todo.text, todo.time);
  };

  const editTodo = (todo) => {
    setSelectedTodo(todo);
    setNewTodo(todo.text);
  };

  const updateTodo = async () => {
    if (selectedTodo) {
      const updatedTodos = todos.map((todo) =>
        todo.id === selectedTodo.id ? { ...todo, text: newTodo } : todo
      );
      await saveTodos(updatedTodos);
      setSelectedTodo(null);
      setNewTodo('');
    }
  };

  const deleteTodo = async (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    await saveTodos(updatedTodos);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedTime(date.getTime());
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Add a new todo..."
        value={newTodo}
        onChangeText={setNewTodo}
        style={styles.input}
      />
      <Button title="Pick a time" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Button
        title={selectedTodo ? "Update Todo" : "Add Todo"}
        onPress={selectedTodo ? updateTodo : addTodo}
      />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.text}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => editTodo(item)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  buttons: {
    flexDirection: 'row',
  },
  editButton: {
    marginRight: 10,
    color: 'blue',
  },
  deleteButton: {
    color: 'red',
  },
});
