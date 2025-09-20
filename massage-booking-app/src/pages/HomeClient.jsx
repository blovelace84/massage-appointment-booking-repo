// src/pages/HomeClient.jsx
import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase.config";
import { signOut } from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function HomeClient() {
  const [therapists, setTherapists] = useState([]);
  const navigate = useNavigate();
  const user = auth.currentUser;

  // Fetch therapists from Firestore
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const snapshot = await getDocs(collection(db, "therapists"));
        const data = snapshot.docs.map((docSnap) => ({
          id: docSnap.id, // therapist UID if stored properly
          ...docSnap.data(),
        }));
        setTherapists(data);
      } catch (err) {
        console.error("Error fetching therapists:", err);
      }
    };
    fetchTherapists();
  }, []);

  // Handle booking
  const handleBooking = async (therapist) => {
    try {
      if (!user) {
        alert("You must be logged in to book an appointment");
        return;
      }

      await addDoc(collection(db, "bookings"), {
        clientId: user.uid,
        clientEmail: user.email,
        therapistId: therapist.id, // ✅ now therapist.uid from therapists collection
        therapistName: therapist.name,
        date: new Date().toISOString(),
        status: "pending",
      });

      alert(`Booking request sent to ${therapist.name} ✅`);
    } catch (err) {
      console.error("Error booking appointment:", err);
      alert("Booking failed. Try again.");
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user?.email || "Client"} 🎉</h1>
      <p>Available therapists:</p>

      {therapists.length > 0 ? (
        <ul>
          {therapists.map((t) => (
            <li key={t.id}>
              <strong>{t.name}</strong> — {t.specialty}{" "}
              <button onClick={() => handleBooking(t)}>Book Appointment</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No therapists available yet.</p>
      )}

      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
