import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { account, databases } from "../../services/appwrite";

const DATABASE_ID = "YOUR_DATABASE_ID";     // 🔹 Replace with your Database ID
const USERS_COLLECTION_ID = "users";        // 🔹 Replace with your users collection ID

const SignupScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      // 1️⃣ Create the user in Appwrite Auth
      const newUser = await account.create(
        "unique()", // unique ID
        email,
        password,
        name
      );

      // 2️⃣ (Optional) Also create a document in your `users` collection
      await databases.createDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        newUser.$id, // use Appwrite user ID
        {
          name,
          email,
          phone,
          role: "client",
        }
      );

      Alert.alert("Success", "Account created! You can now log in.");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Sign Up
      </Text>

      <Text>Name</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
        value={name}
        onChangeText={setName}
      />

      <Text>Email</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text>Phone</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text>Password</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Create Account" onPress={signup} />
    </View>
  );
};

export default SignupScreen;
