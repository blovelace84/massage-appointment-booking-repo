//imports for Homescreen
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { account } from "../services/appwrite";

export default function HomeScreen ({ navigation }) {
    const handleLogout = async () => {
        try{
            await account.deleteSession("current"); //logout current session
            navigation.navigate("Login"); //navigate to login screen
        }catch (error) {
            console.error(error);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Massage App!</Text>
            <Button title="logout" onPress={handleLogout} />
        </View>
    );

    const styles = StyleSheet.create({
        container: { flex: 1, justifyContent: "center", alignItems: "center" },
        title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    });
}