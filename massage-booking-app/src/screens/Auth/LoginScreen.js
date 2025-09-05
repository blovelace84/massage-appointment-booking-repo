import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { account } from "../../services/appwrite";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await account.createEmailPasswordSession(email, password);
      navigation.replace("Home"); // navigate to Home after login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text onPress={() => navigation.navigate("Signup")} style={styles.link}>
        Don’t have an account? Signup
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, marginBottom: 12, padding: 10, borderRadius: 5 },
  error: { color: "red", marginBottom: 10 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  link: { color: "blue", marginTop: 15, textAlign: "center" },
});
