import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { account } from "./src/services/appwrite";

// Screens
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/Auth/LoginScreen";
import SignupScreen from "./src/screens/Auth/SignupScreen";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try{
        const currentUser = await account.get();
        setUser(currentUser);
      }catch(error) {
        //Only log unexpected errors, ignore scope errors
        if(error.code !== 401) {
          console.warn("Appwrite error:", error);
        }
        setUser(null);
      }
    };
    getUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // If logged in, show home
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          // If not logged in, show login/signup
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
