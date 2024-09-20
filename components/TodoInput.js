import React, { useState } from 'react'; 
// Importing React and useState hook to manage state in functional components.

import { View, TextInput, Button, StyleSheet } from 'react-native';
// Importing necessary components from React Native for UI.

import DateTimePickerModal from 'react-native-modal-datetime-picker'; 
// Importing the DateTimePickerModal for date/time selection functionality.

export default function TodoInput({ newTodo, setNewTodo, addTodo, updateTodo, selectedTodo, selectedTime, setSelectedTime }) {
  // Defining the TodoInput component and destructuring props passed down from parent component.

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // Local state to manage the visibility of the DateTimePickerModal.

  // Function to show the DatePicker modal.
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Function to hide the DatePicker modal.
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Function that gets called when the user selects a date/time.
  // The selected time (in milliseconds) is stored in the `selectedTime` state.
  const handleConfirm = (date) => {
    setSelectedTime(date.getTime()); 
    hideDatePicker(); // Close the DatePicker after selection.
  };

  return (
    <View>
      {/* TextInput for entering a new todo. */}
      <TextInput
        placeholder="Add a new todo..." // Placeholder text in the input field.
        value={newTodo} // Binds the input value to the `newTodo` state.
        onChangeText={setNewTodo} // Updates the `newTodo` state when the user types.
        style={styles.input} // Apply styles defined in the StyleSheet.
      />

      {/* Button to trigger the DatePicker modal for selecting a time. */}
      <Button title="Pick a time" onPress={showDatePicker} color={"#1064AB"} />

      {/* DateTimePickerModal for selecting the date and time of the todo. */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible} // Controls modal visibility.
        mode="datetime" // Sets the mode to allow both date and time selection.
        onConfirm={handleConfirm} // Handles the date/time selection.
        onCancel={hideDatePicker} // Handles the cancellation of the modal.
      />

      {/* Button to either add a new todo or update an existing one, depending on whether a todo is being edited. */}
      <Button
        title={selectedTodo ? "Update Todo" : "Add Todo"} 
        // If there's a selected todo, display "Update Todo"; otherwise, show "Add Todo".
        onPress={selectedTodo ? updateTodo : addTodo} 
        // If editing a todo, call `updateTodo`; otherwise, call `addTodo`.

        color={"#2998EC"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray', // Border color of the TextInput.
    borderWidth: 1, // Border thickness.
    padding: 10, // Padding inside the TextInput.
    marginBottom: 10, // Space below the input field.
    borderRadius: 5, // Rounded corners for the input field.
  },
});
