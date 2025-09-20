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

  // Fetch bookings where therapistId == current user's uid
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!user) return;
        const q = query(
          collection(db, "bookings"),
          where("therapistId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings: ", err);
      }
    };
    fetchBookings();
  }, [user]);

  //Handle booking status update
  const updateBookingStatus = async (bookingId, status) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), { status });
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? { ...booking, status } : booking
        )
      );
    } catch (err) {
      console.error("Error updating booking status: ", err);
    }
  };

  //logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Error signing out: ", err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome Therapist {user?.email}</h1>
      <p>Here are your current bookings:</p>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((b) => (
            <li key={b.id}>
              Client: {b.clientEmail} <br />
              Date: {b.date} <br />
              Status: {b.status} <br />
              <button onClick={() => updateBookingStatus(b.id, "accepted")}>
                Accept
              </button>{" "}
              <button onClick={() => updateBookingStatus(b.id, "declined")}>
                Decline
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
