import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { auth, db } from "../services/firebase.config";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

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

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Cancel booking
  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    await updateDoc(doc(db, "bookings", bookingId), {
      status: "cancelled",
    });
  };

  // Reschedule booking
  const rescheduleBooking = async (bookingId) => {
    const newDate = prompt("Enter new date (YYYY-MM-DD):");
    const newTime = prompt("Enter new time (HH:mm):");
    if (!newDate || !newTime) return;

    await updateDoc(doc(db, "bookings", bookingId), {
      date: `${newDate} ${newTime}`,
      status: "rescheduled",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {user?.email}</h2>
      <button onClick={() => signOut(auth)}>Logout</button>
      <button onClick={() => navigate(`therapist/${t.id}`)}>
        View Profile
      </button>
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
              <br />
              {b.status === "pending" && (
                <>
                  <button onClick={() => cancelBooking(b.id)}>Cancel</button>
                  <button onClick={() => rescheduleBooking(b.id)}>
                    Reschedule
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
