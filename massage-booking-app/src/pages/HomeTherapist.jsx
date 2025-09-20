// src/pages/HomeTherapist.jsx
import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase.config";
import { signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function HomeTherapist() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const user = auth.currentUser;

  // Fetch bookings assigned to this therapist
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!user) return;

        // Query bookings where therapistId = current therapist UID
        const q = query(
          collection(db, "bookings"),
          where("therapistId", "==", user.uid)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, [user]);

  // Update booking status
  const updateBookingStatus = async (bookingId, status) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), { status });
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
      );
    } catch (err) {
      console.error("Error updating booking:", err);
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
      <h1>Welcome Therapist {user?.email}</h1>
      <p>Your bookings:</p>

      {bookings.length > 0 ? (
        <ul>
          {bookings.map((b) => (
            <li key={b.id} style={{ marginBottom: "15px" }}>
              <strong>Client:</strong> {b.clientEmail} <br />
              <strong>Date:</strong> {b.date} <br />
              <strong>Status:</strong> {b.status} <br />
              {b.status === "pending" && (
                <>
                  <button onClick={() => updateBookingStatus(b.id, "accepted")}>
                    Accept
                  </button>{" "}
                  <button onClick={() => updateBookingStatus(b.id, "declined")}>
                    Decline
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings assigned to you yet.</p>
      )}

      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
