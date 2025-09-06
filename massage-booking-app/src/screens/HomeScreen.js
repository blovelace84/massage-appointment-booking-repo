import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { account } from "../services/appwrite";

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
    //   navigation.replace("Login"); // back to login
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏡 Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});
