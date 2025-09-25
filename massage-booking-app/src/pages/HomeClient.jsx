import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase.config";
import { useNavigate } from "react-router-dom";

export default function HomeClient() {
  const { user } = useAuth();
  const [therapists, setTherapists] = useState([]);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // Load therapists
  useEffect(() => {
    const q = query(collection(db, "therapists"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTherapists(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });
    return () => unsubscribe();
  }, []);

  // Load client bookings
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "bookings"),
      where("clientId", "==", user.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBookings(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {user?.email}</h2>

      <h3>Available Therapists</h3>
      {therapists.map((t) => (
        <div key={t.id} style={{ marginBottom: "10px" }}>
          <p>
            {t.name} - {t.specialty}
          </p>
          <button onClick={() => navigate(`/book/${t.id}`)}>
            Book Appointment
          </button>
        </div>
      ))}

      <h3>My Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((b) => (
            <li key={b.id}>
              <strong>{b.date}</strong> with {b.therapistName || b.therapistId}—{" "}
              <em>{b.status}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
