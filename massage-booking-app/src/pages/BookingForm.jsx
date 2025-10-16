import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebase.config";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";

export default function BookingForm() {
  const { therapistId } = useParams();
  const [therapist, setTherapist] = useState(null);
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTherapist = async () => {
      const ref = doc(db, "therapists", therapistId);
      const snap = await getDoc(ref);
      if (snap.exists()) setTherapist(snap.data());
    };
    fetchTherapist();
  }, [therapistId]);

  const handleBooking = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "bookings"), {
      clientId: auth.currentUser.uid,
      clientEmail: auth.currentUser.email,
      therapistId,
      therapistName: therapist?.name,
      date,
    });
    navigate("/booking-confirmed");
  };

  if (!therapist) return <p>Loading therapist...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book with {therapist.name}</h2>
      <form onSubmit={handleBooking}>
        <label>
          Date:
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Book Appointment</button>
      </form>
      <button onClick={() => navigate("/client")}>Cancel</button>
    </div>
  );
}
