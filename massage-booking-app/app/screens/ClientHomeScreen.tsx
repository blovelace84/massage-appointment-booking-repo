import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../index";

type ClientHomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: ClientHomeScreenNavigationProp;
};

type Appointment = {
  id: string;
  date: string;
  time: string;
  service: string;
};

export default function ClientHomeScreen({ navigation }: Props) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // 🔹 Later: Fetch from Appwrite
    setAppointments([
      { id: "1", date: "2025-09-15", time: "10:00 AM", service: "Swedish Massage" },
      { id: "2", date: "2025-09-20", time: "2:00 PM", service: "Deep Tissue Massage" },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back 👋</Text>

      <Button
        title="Book a New Massage"
        onPress={() => navigation.navigate("Booking" as never)} // We'll add BookingScreen later
      />

      <Text style={styles.subtitle}>Upcoming Appointments</Text>
      {appointments.length === 0 ? (
        <Text>No upcoming appointments</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>{item.service}</Text>
              <Text style={styles.cardText}>
                {item.date} at {item.time}
              </Text>
            </View>
          )}
        />
      )}

      <Button title="Profile" onPress={() => navigation.navigate("Profile" as never)} />
      <Button title="Logout" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  subtitle: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  card: {
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: { fontSize: 16 },
});
