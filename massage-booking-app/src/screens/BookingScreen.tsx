import React, { useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import { databases } from "../services/appwrite";

type Service = {
  id: string;
  name: string;
  duration: string;
  price: string;
};

const BookingScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    { id: "1", name: "Swedish Massage", duration: "60 min", price: "$50" },
    { id: "2", name: "Deep Tissue", duration: "90 min", price: "$80" },
  ];

  const bookAppointment = async () => {
    if (!selectedDate || !selectedService) {
      return Alert.alert("Error", "Please select both service and date");
    }

    try {
      await databases.createDocument(
        "[DATABASE-ID]", // Replace with your Database ID
        "appointments",  // Replace with your Collection ID
        "unique()",
        {
          serviceId: selectedService.id,
          date: selectedDate,
          status: "booked",
        }
      );
      Alert.alert("Success", "Appointment booked!");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to book appointment");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Select a Service:</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 10,
              marginVertical: 5,
              backgroundColor: selectedService?.id === item.id ? "#ddd" : "#fff",
            }}
            onPress={() => setSelectedService(item)}
          >
            <Text>{item.name} - {item.duration} - {item.price}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={{ marginTop: 20 }}>Pick a Date:</Text>
      <Calendar onDayPress={(day) => setSelectedDate(day.dateString)} />

      <Button title="Confirm Booking" onPress={bookAppointment} />
    </View>
  );
};

export default BookingScreen;
