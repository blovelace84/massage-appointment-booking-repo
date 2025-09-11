import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { account } from "../services/appwrite";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Create a session
      await account.createEmailSession(email, password);

      // Get user info
      const user = await account.get();

      // TEMP role check
      if (user.name.toLowerCase().includes("therapist")) {
        router.replace("/(therapist)/dashboard");
      } else {
        router.replace("/(client)/home");
      }
    } catch (err: any) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />

      <Text
        style={styles.link}
        onPress={() => router.push("/screens/SignupScreen")}
      >
        Don’t have an account? Sign up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  link: {
    marginTop: 15,
    color: "blue",
    textAlign: "center",
  },
});
