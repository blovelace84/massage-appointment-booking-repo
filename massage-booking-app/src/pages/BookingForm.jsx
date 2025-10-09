import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../services/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // ✅ use context

export default function BookingForm() {
  const { therapistId } = useParams();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { user } = useAuth(); // ✅ user comes from global context
  const navigate = useNavigate();

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to book an appointment");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        clientId: user.uid,
        clientEmail: user.email,
        therapistId: therapistId,
        date: `${date} ${time}`,
        status: "pending",
      });

      navigate("/booking-confirmed");
      navigate("/client");
    } catch (err) {
      console.error("Error booking appointment:", err);
      alert("Booking failed. Try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book Appointment</h2>
      {!user ? (
        <p>Loading user...</p>
      ) : (
        <form onSubmit={handleBooking}>
          <label>
            Date:{" "}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Time:{" "}
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Confirm Booking</button>
        </form>
      )}
      <button onClick={() => navigate("/client")}>Cancel</button>
    </div>
  );
}
