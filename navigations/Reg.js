import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../auth/Login";
import Registration from "../auth/Registration";


const Stack = createNativeStackNavigator();
function Reg() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
  
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
  
  export default Reg
