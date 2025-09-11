import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { account } from "../services/appwrite";

export default function SignupScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const Signup = async () => {
        try{
            await account.create("unique()", email, password, name);
            alert("Account created successfully!");
        } catch (error: any) {
            alert(error.message);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
});