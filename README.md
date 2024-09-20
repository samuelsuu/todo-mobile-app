<!DOCTYPE html>
<html lang="en">

<body>

  <h1>React Native Todo App</h1>
  <p>A <strong>React Native Todo App</strong> built using <strong>Expo</strong>, with <strong>Local Storage</strong> for login and registration. The app features a full <strong>CRUD system</strong> for managing tasks, notifications, and navigation using <strong>Stack Navigator</strong> and <strong>Bottom Tab Navigator</strong>. Additionally, the app includes a <strong>Splash Screen</strong>.</p>

  <h2>Features</h2>
  <ul>
    <li><strong>User Authentication</strong>: Login and registration with local storage to persist user sessions.</li>
    <li><strong>Task Management</strong>: Create, read, update, and delete (CRUD) tasks in the Todo list.</li>
    <li><strong>Local Storage</strong>: Stores user credentials and todo items using AsyncStorage.</li>
    <li><strong>Push Notifications</strong>: Receive reminders and notifications for tasks.</li>
    <li><strong>Navigation</strong>: Implements Stack Navigator for authentication and Bottom Tab Navigator for task screens.</li>
    <li><strong>Splash Screen</strong>: Displays a splash screen on startup.</li>
  </ul>

  <h2>Installation</h2>
  <ol>
    <li>Clone the repository:
      <pre><code>git clone https://github.com/samuelsuu/my-todo.git</code></pre>
    </li>
    <li>Navigate to the project directory:
      <pre><code>cd my-todo</code></pre>
    </li>
    <li>Install the dependencies:
      <pre><code>npm install</code></pre>
    </li>
    <li>Start the Expo app:
      <pre><code>npx expo start</code></pre>
    </li>
  </ol>

  <h2>Dependencies</h2>
  <ul>
    <li>React Native</li>
    <li>Expo</li>
    <li>React Navigation (Stack & Bottom Tab Navigators)</li>
    <li>AsyncStorage (for local storage)</li>
    <li>Expo Notifications (for push notifications)</li>
  </ul>

  <h2>Folder Structure</h2>
  <pre><code>
  ├── assets/            # Images and assets (includes splash screen image)
  ├── assets/ 
  |  ├── Login.js/       # Login screen
  |  ├── Registration.js/  # Registration screen
  ├── components/        # Reusable components
  │   ├── Logout.js
  │   ├── SplashScreen.js
  │   ├── TodoInput  # todo input
  │   ├── TodoItem  # todo item
  │   ├── TodoList  # the list of todos    
  ├── navigation/
  │   ├── Reg.js  # Stack for Login and Register
  │   ├── TodoNav.js    # Bottom tab for tasks and settings
  ├── screen/
  |  ├── AddTodoScreen.js/
  |  ├── TodoScreen.js/
  ├── App.js             # Main entry point for the app
  ├── app.json           # Expo configuration
  └── README.html        # Documentation (this file)
  </code></pre>

  <h2>Screens</h2>
  <ul>
    <li><strong>Splash Screen</strong>: Shown on app startup.</li>
    <li><strong>Login/Registration</strong>: User authentication using local storage.</li>
    <li><strong>Todo List</strong>: Manage tasks with full CRUD functionality.</li>
    <li><strong>Notifications</strong>: Get notified of tasks with reminders.</li>
  </ul>

  <h2>Usage</h2>
  <ol>
    <li><strong>Login/Register</strong>: First, create an account or log in with existing credentials.</li>
    <li><strong>Todo List</strong>: After logging in, manage your tasks using the CRUD system.</li>
    <li><strong>Notifications</strong>: Get notified of tasks with reminders.</li>
  </ol>

  <h2>Notifications Setup</h2>
  <p>To enable notifications, follow these steps:</p>
  <ol>
    <li>Add a permission request for notifications in <code>App.js</code>:
      <pre><code>
import * as SplashScreen from "expo-splash-screen";


// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

 useEffect(() => {
    const hideSplashScreen = async () => {
      // Simulate some loading task or app initialization
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Hide the splash screen after the app is ready
      await SplashScreen.hideAsync();
    };

    hideSplashScreen();
  }, []);
      </code></pre>
    </li>
    <li>Schedule notifications for specific tasks.</li>
  </ol>

  <h2>Navigation</h2>
  <p>The app uses:</p>
  <ul>
    <li><strong>Stack Navigator</strong>: Used for login and registration screens.</li>
    <li><strong>Bottom Tab Navigator</strong>: Used for navigating between the todo list and settings.</li>
  </ul>

  <h2>License</h2>
  <p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>

</html>
