import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebase.config";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function BookingForm() {
  const { therapistId } = useParams();
  const [therapist, setTherapist] = useState(null);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Track user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch therapist info
  useEffect(() => {
    const fetchTherapist = async () => {
      const ref = doc(db, "therapists", therapistId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setTherapist(snap.data());
      }
    };
    fetchTherapist();
  }, [therapistId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to book an appointment");
      return;
    }

    if (!date) {
      alert("Please select a date");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        clientId: user.uid,
        clientEmail: user.email,
        therapistId,
        therapistName: therapist?.name,
        date,
        status,
      });

      navigate("/booking-confirmed");
    } catch (err) {
      console.error("Error booking appointment:", err);
      alert("Booking failed. Please try again.");
    }
  };

  if (!therapist) return <p>Loading therapist info...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book an Appointment with {therapist.name}</h2>
      <p>
        <strong>Specialty:</strong> {therapist.specialty}
      </p>
      <p>
        <strong>Bio:</strong> {therapist.bio}
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Date & Time:
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <br />
        <button type="submit">Confirm Booking</button>
      </form>

      <button onClick={() => navigate("/client")}>Cancel</button>
    </div>
  );
}
